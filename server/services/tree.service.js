import {TreeModel} from '../models/tree.model.js';

class TreeService {
    getTree(groupId) {
      return TreeModel.find({group_id: groupId});
    }

    async createTree(treeData) {     
      const newTree = new TreeModel(treeData);
      return newTree.save();
    }

    async editTree(id, treeData) {
      return TreeModel.findByIdAndUpdate(id, treeData);     
    }

    deleteTree(id) {
      return TreeModel.findByIdAndDelete(id);
    }
  }
  
  export const treeService = new TreeService();
