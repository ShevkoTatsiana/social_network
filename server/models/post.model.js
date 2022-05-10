import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  author_id: { 
    type: String, 
    requred: true
   },
  author_name: { 
  type: String, 
  requred: true
  },
  text: {
    type: String,
    requred: true
  },
  group_id: {
    type: String,
    requred: true
  }
}, {
  timestamps: true,
});

export const PostModel = mongoose.model('Post', postSchema);
