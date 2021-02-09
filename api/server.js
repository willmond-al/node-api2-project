// implement your server here
// require your posts router and connect it here
const express = require('express')

const server = express()

const Posts = require('./posts/posts-model')

server.get('/api/posts', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'error retrieving posts'
        })
    })
})

server.get('/api/posts/:id', (req, res) => {
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
            message: `error retrieving post with id ${req.params.id}`
        })
    })
})

server.post('/api/posts', (req, res) => {
    Posts.add(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'error adding post'
        })
    })
})

server.put('/api/posts/:id', (req, res) => {
    Posts.update(req.params.id, req.body)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: `post id ${req.parama.id} not found`
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



module.exports = server