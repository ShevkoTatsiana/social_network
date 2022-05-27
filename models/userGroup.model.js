import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const userGroupSchema = new Schema({
  userId: { 
    type: String, 
    required: true
   },
  groupId: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true,
});

export const UserGroupModel = mongoose.model('UserGroup', userGroupSchema);
