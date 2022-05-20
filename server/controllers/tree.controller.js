import {treeService} from '../services/tree.service.js';   

class TreeController {

  async getTree(req, res) {
    const groupId = req.params.groupId;
    res.send(await treeService.getTree(groupId));
  }
 
  async createTree(req, res) {
    const treeData = {
      children: req.body.children,
      dates: req.body.dates,
      photo: req.file?.filename,
      info: req.body.info,
      level: req.body.level,
      name: req.body.name,
      group_id: req.body.group_id,
      parents: req.body.parents,
      partner: req.body.partner,
      siblings: req.body.siblings
    };

    try {
      const result = await treeService.createTree(treeData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t publish a tree' });
    }       
  }

  async editTree(req, res) {
    const treeData = {
      children: req.body.children,
      dates: req.body.dates,
      photo: req.file?.filename,
      info: req.body.info,
      level: req.body.level,
      name: req.body.name,
      group_id: req.body.group_id,
      parents: req.body.parents,
      partner: req.body.partner,
      siblings: req.body.siblings
    };
    // const treeData = {
    //   group_id: req.body.group_id,
    //   members: req.body.members
    // }
    try {
      const result = await treeService.editTree(req.params.id, treeData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t edit a tree' });
    }       
  }
  
  async deleteTree(req, res) {
    res.send(await treeService.deleteTree(req.params.id));
  }
}

export const treeController = new TreeController();