import mongoose from 'mongoose';
import ViolationSchema from './violation_schema.js';

export const Violation1Model = mongoose.model('violation1', ViolationSchema, 'violation1');
export const Violation2Model = mongoose.model('violation2', ViolationSchema, 'violation2');
export const Violation3Model = mongoose.model('violation3', ViolationSchema, 'violation3');
