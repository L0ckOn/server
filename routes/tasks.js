const express = require('express');
const router = express.Router();
const tasks = require('./data.json');
const fs = require('fs');

router.get('/filterBy=&order=desc&page=:page', (req, res) => {
    const page = req.params.page
    const startIndex = 5 * (page - 1);
    res.send(tasks.posts.slice(startIndex, startIndex + 5))
    // res.send(tasks.posts[])
    // res.status(200);
    // res.send('hello')
    
});

router.get('/filterBy=done&order=desc&page=:page', (req, res) => {
    const posts = tasks.posts.filter(task => task.done)
    const page = req.params.page
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send(posts.slice(startIndex, startIndex + 5))
    
});

router.get('/filterBy=undone&order=desc&page=:page', (req, res) => {
    const posts = tasks.posts.filter(task => !task.done)
    const page = req.params.page
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send(posts.slice(startIndex, startIndex + 5))
    
});

router.get('/filterBy=&order=asc&page=:page', (req, res) => {
    const posts = tasks.posts.reverse()
    const page = req.url[req.url.length - 1];
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send(posts.slice(startIndex, startIndex + 5))
    
});

router.get('/filterBy=done&order=asc&page=:page', (req, res) => {
    const posts = tasks.posts.reverse().filter(task => task.done);
    const page = req.url[req.url.length - 1];
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send(posts.slice(startIndex, startIndex + 5))
    
});

router.get('/filterBy=&order=asc&page=:page', (req, res) => {
    const posts = tasks.posts.reverse().filter(!task.done);
    const page = req.url[req.url.length - 1];
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send(posts.slice(startIndex, startIndex + 5))
    
});

router.post('/', (req, res) => {
    console.log(req)
})

router
    .route('/:uuid')
    .get((req, res) => {
        res.send(`${tasks.posts.find((task => 
            task["uuid"] === +req.params.uuid))}`);
        
    })
    .patch((req, res) => {
        res.send(`update task wid uuid ${req.params.uuid} =>
         `)
    })
    .delete((req, res) => {
        res.send(`delete task wid uuid ${req.params.uuid}`)
    })

router.post('/', (req, res) => {
    res.send('create task')
})

module.exports = router