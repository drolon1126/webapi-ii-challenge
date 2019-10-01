const express = require('express');

const Data = require('../data/db.js');

const router = express.Router();

/* POST */
router.post('/', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else {
    Data.insert(req.body)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch(() => {
        res.status(500).json({ errorMessage: 'There was an error while saving the post to the database.' })
      })
  }

});

router.post('/:id/comments', (req, res) => {
  Data.findPostComments(req.params.id)
    .then(comments => {
      if (comments.length > 0) {
        let comTmp = { ...req.body };
        comTmp.post_id = req.params.id;
        if (!comTmp.text) {
          res.status(400).json({ errorMessage: "Please provide text for the comment." });
        } else {
          Data.insertComment(comTmp)
            .then(comment => {
              res.status(201).json(comment);
            })
            .catch(() => {
              res.status(500).json({ error: "There was an error while saving the comment to the database." });
            });
        }
      }else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      } 
    })
    .catch(() => {
      res.status(500).json({ error: "The comments information could not be retrieved." });
    });
});

/* GET */

router.get('/', (req, res) => {
  Data.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

router.get('/:id', (req, res) => {
  Data.findById(req.params.id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

router.get('/:id/comments', (req, res) => {
  Data.findPostComments(req.params.id)
    .then(comments => {
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The comments information could not be retrieved." });
    });
});


module.exports = router;