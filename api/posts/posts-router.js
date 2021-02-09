// implement your posts router here
const Posts = require('./posts-model')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ 
            message: "The posts information could not be retrieved" 
        })
    })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: `no post with id ${req.params.id}`
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `error retrieving posts`
        })
    })
})

// router.post('/', (req, res) => {
//     Posts.insert(req.body)
//     .then( post => {
//             res.status(201).json(post)
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json({
//             message: 'error adding post'
//         })
//     })
// })
router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then( post => {
        if (req.body.title && req.body.contents){
            res.status(201).json(post)
        } else {
            res.status(404).json({
                message: 'bad request, title and contents required'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'error adding post'
        })
    })
})

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ 
              message: `post with id ${req.params.id} has been deleted`
            });
        } else {
          res.status(404).json({ 
              message: 'post could not be found' 
            });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the post',
        });
      });
  });

router.put('/:id', (req, res) => {
    Posts.update(req.params.id, req.body)
    .then(post => {
        if (req.body.title && req.body.contents) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: `please provide title and contents`
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'error updating post'
        })
    })
})

router.get('/:id/comments', (req, res) => {
    Posts.findById(req.params.id)
    .then(comment => {
        res.status(200).json(comment)
        console.log(comment)
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({
            message: 'could not get comments'
        })
    })
})

module.exports = router