import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const treeSchema = new Schema({
  group_id: {
        type: String, 
        requred: true
      },
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
});

// const treeSchema = new Schema({
//   group_id: {
//     type: String, 
//     requred: true
//   },
//   members: {
//     type: [treeMemberSchema]
//   }
// }, {
//   timestamps: true,
// })

export const TreeModel = mongoose.model('Tree', treeSchema);
