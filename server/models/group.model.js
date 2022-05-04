import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: { 
    type: String, 
    required: false,
    unique: true,
    trim: true,
    minlength: 2
   },
  members: { 
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ], 
    required: true 
  },
  description: {
    type: String
  },
  profile_photo: {
    type: String,
    default: ""
  }
}, {
  timestamps: true,
});

export const GroupModel = mongoose.model('Group', groupSchema);
