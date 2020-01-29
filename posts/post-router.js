const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db("posts");
    // SELECT * FROM Posts;
    console.log(posts);
    res.json(posts);
  } catch (err) {
      res.status(500).json({message: "failed to get posts"})
  }
});

router.get("/:id", async(req, res) => {
    const {id} = req.params;
    try{
        // SELECT * FROM posts WHERE id = 16;
        const post = await db('posts').where('id', id);
        res.json(post)
    }catch(err){
        res.status(500).json({message: "failed to get post id"})
    }
});

router.post("/", async(req, res) => {
    const postData = req.body;
    try{
        const post = await db('posts').insert(postData);
        res.status(201).json(post)
    }catch(err){
        res.status(500).json({message: 'failed to insert post'})
    }
});

router.put("/:id", async(req, res) => {
    const {id} = req.params;
    try{
        const post = await db('posts').where('id', id).update(req.body);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json({message: 'cannot update post'});
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const post = await db('posts').where('id', id).delete(id);
        res.status(204).json(post)
    }catch(err){
        res.status(404).json({message: 'cannot find id to delete'})
    }
});

module.exports = router;
