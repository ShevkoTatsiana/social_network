import {GroupModel} from '../models/group.model.js';

class GroupService {
    getAll() {
      console.log(GroupModel);
      return GroupModel.find();
    }

    getGroup(groupId) {
      return GroupModel.findById(groupId);
    }

    async createGroup(groupData) {
      const isGroupDataUnique = await GroupModel.findOne({name: groupData.name});
      console.log(isGroupDataUnique, 'ser');
      if (!isGroupDataUnique) {
        const newGroup = new GroupModel(groupData);
        console.log(newGroup, 'ser');
        return newGroup.save();
      } else {
        throw new Error('Group already exists!');
      }
    }

    deleteGroup(groupId) {
      return GroupModel.findByIdAndDelete(groupId);
    }

    async editGroup(groupId, groupData) {
      const isGroupDataUnique = await GroupModel.findOne({name: groupData.name});
      if (!isGroupDataUnique) {
        return GroupModel.findByIdAndUpdate(groupId, groupData);
      } else {
        throw new Error('Group already exists!');
      }      
    }
  }
  
  export const groupService = new GroupService();
