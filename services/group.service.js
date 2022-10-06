import {GroupModel} from '../models/group.model.js';

class GroupService {
    getAll(groupIds) {
      const stringIds = groupIds.split(',');
      return GroupModel.find({_id: {$in: stringIds}});
    }

    getGroup(name) {
      return GroupModel.find({name: name});
    }

    async createGroup(groupData) {
      const isGroupDataUnique = await GroupModel.findOne({name: groupData.name});
      if (!isGroupDataUnique) {
        const newGroup = new GroupModel(groupData);
        return newGroup.save();
      } else {
        throw new Error('Group already exists!');
      }
    }

    async deleteGroup(groupId) {
      const a = await GroupModel.find();
      return GroupModel.findByIdAndDelete(groupId);
    }

    async editGroup(groupId, groupData) {
      const groupWithSameName = await GroupModel.findOne({name: groupData.name});
      const groupWithSameNameId = groupWithSameName?._id.valueOf();
      const isGroupDataUnique = !!groupWithSameName && groupWithSameNameId !== groupId;
      if (!isGroupDataUnique) {
        return GroupModel.findByIdAndUpdate(groupId, groupData);
      } else {
        throw new Error('Group already exists!');
      }      
    }
  }
  
  export const groupService = new GroupService();
