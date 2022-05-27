import {UserGroupModel} from '../models/userGroup.model.js';

class UserGroupService {
    getAllUsersInGroup(groupId) {
        const data = UserGroupModel.find({ groupId: groupId }).then((resp) => {
            return resp.map((doc)=> doc.userId);
        })
        return data;  
    }

    getAllUserGroup(userId) {
        const data = UserGroupModel.find({ userId: userId }).then((resp) => {
            return resp.map((doc)=> doc.groupId);
        })
        return data;  
    }

    createUserGroup(data) {
        const newUserGroup = new UserGroupModel(data);
        return newUserGroup.save();
    }

    deleteUserGroup(id, groupId) {
        return UserGroupModel.findOneAndDelete({userId: id, groupId: groupId});
    }

    // async editGroup(groupId, groupData) {
    //   const isGroupDataUnique = await GroupModel.findOne({name: groupData.name});
    //   if (!isGroupDataUnique) {
    //     return GroupModel.findByIdAndUpdate(groupId, groupData);
    //   } else {
    //     throw new Error('Group already exists!');
    //   }      
    // }
  }
  
  export const userGroupService = new UserGroupService();
