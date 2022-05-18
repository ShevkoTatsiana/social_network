import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const treeSchema = new Schema({
  name: { 
    type: String, 
    requred: true
  },
  children: { 
  type: [String]
  },
  dates: {
    type: String
  },
  group_id: {
    type: String, 
    requred: true
  },
  info: {
    type: String
  },
  level: {
    type: Number
  },
  parents: { 
    type: [String]
  },
  partner: { 
    type: String
  },
  siblings: { 
    type: [String]
  },
  photo: {
    type: String,
    default: ""
  },
}, {
  timestamps: true,
});

export const TreeModel = mongoose.model('Tree', treeSchema);
