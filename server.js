import connect_to_mongodb from './connect_to_mongodb.js';
import { Violation1Model, Violation2Model, Violation3Model } from './violation-model.js';
import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import { Server } from 'socket.io';

const PORT_NUMBER = process.env.PORT || 5001;
connect_to_mongodb().then((value) => console.log('connected to mongodb'), (err) => console.log(err));

const app = express();
async function get_all_violations(ViolationModel) {
    return await ViolationModel.find();
}
app.use(cors());
app.get('/add-violation', (req, res) => {
    const violation_entry = new Violation1Model(
        {
            violation_video_url: "https://violation-video-bucket.s3.eu-central-1.amazonaws.com/violation2/los_angeles.mp4"
        });
    violation_entry.save((err) => {
        if (err) console.log(err);
        res.send('record is added to collection.');
    })
});

app.get('/all-violations1', (req, res) => {
    get_all_violations(Violation1Model).then((violations) => res.json(violations), (err) => console.log(err));
});

app.get('/all-violations2', (req, res) => {
    get_all_violations(Violation2Model).then((violations) => res.json(violations), (err) => console.log(err));
});

app.get('/all-violations3', (req, res) => {
    get_all_violations(Violation3Model).then((violations) => res.json(violations), (err) => console.log(err));
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const Violation1ChangeStream = Violation1Model.watch();
const Violation2ChangeStream = Violation2Model.watch();
const Violation3ChangeStream = Violation3Model.watch();


Violation1ChangeStream.on('change', (data) => {
    //console.log(data);
    //console.log(data.documentKey._id.toString())
    if (data.operationType === 'delete') {
        io.emit('delete',
            {
                collection: data.ns.coll,
                _id: data.documentKey._id.toString()
            });
    } else if (data.operationType === 'insert') {
        io.emit('insert',
            {
                collection: data.ns.coll,
                fullDocument: data.fullDocument,
            });
    }
})

Violation2ChangeStream.on('change', (data) => {
    console.log(data);
    if (data.operationType === 'delete') {
        io.emit('delete',
            {
                collection: data.ns.coll,
                _id: data.documentKey._id.toString()
            });
    } else if (data.operationType === 'insert') {
        io.emit('insert',
            {
                collection: data.ns.coll,
                fullDocument: data.fullDocument,
            });
    }
})

Violation3ChangeStream.on('change', (data) => {
    console.log(data);
    if (data.operationType === 'delete') {
        io.emit('delete',
            {
                collection: data.ns.coll,
                _id: data.documentKey._id.toString()
            });
    } else if (data.operationType === 'insert') {
        io.emit('insert',
            {
                collection: data.ns.coll,
                fullDocument: data.fullDocument,
            });
    }
})


io.on('connection', function (socket) {
    console.log('A user connected');
    console.log(socket.id);

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('user disconnected')
    });
});

httpServer.listen(PORT_NUMBER, () => {
    console.log(`Server started running at port ${PORT_NUMBER}`);
});



