import {postService} from '../services/post.service.js';   

class PostController {
  async getAllByGroup(req, res) {
    res.send(await postService.getAll(req.params.groupId))
  }
 
  async createPost(req, res) {
    const postData = {
      author_id: req.params.id,
      author_name: req.body.author_name,
      text: req.body.text,
      group_id: req.body.group_id
    };

    try {
      const result = await postService.createPost(postData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t publish the post' });
    }       
  }
}

export const postController = new PostController();