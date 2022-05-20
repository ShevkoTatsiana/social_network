import {PostModel} from '../models/post.model.js';

class PostService {
    getAll(groupId) {
      return PostModel.find({group_id: groupId});
    }

    async createPost(postData) {
      const newPost = new PostModel(postData);
      return newPost.save();
    }
  }
  
  export const postService = new PostService();
