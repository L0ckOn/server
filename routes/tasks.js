const express = require('express');
const router = express.Router();
const fs = require('fs');



router.get('/filterBy=&order=desc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.status(400).send('bad request: page not provided')
    }
    const tasks = JSON.parse(fs.readFileSync('./data.json'))
    tasks.posts.sort((a, b) => b.createdAt - a.createdAt);
    const page = req.params.page
    const startIndex = 5 * (page - 1);
    res.send({
        count: tasks.posts.length,
        tasks: tasks.posts.slice(startIndex, startIndex + 5)})
    res.status(200);
    
});

router.get('/filterBy=done&order=desc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.send(400).send('bad request: page not provided')
    }
    const tasks = JSON.parse(fs.readFileSync('./data.json', (err) => {
        console.log(err);
    }))
    tasks.posts.sort((a, b) => b.createdAt - a.createdAt)
    const newTasks = tasks.posts.filter(task => task.done);
    const page = req.params.page
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send({
        count: newTasks.length,
        tasks: newTasks.slice(startIndex, startIndex + 5)})
    
});

router.get('/filterBy=undone&order=desc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.send(400).send('bad request: page not provided')
    }
    const tasks = JSON.parse(fs.readFileSync('./data.json', (err) => {
        console.log(err);
    }))
    tasks.posts.sort((a, b) => b.createdAt - a.createdAt)
    const newTasks = tasks.posts.filter(task => !task.done);
    const page = req.params.page
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send({
        count: newTasks.length,
        tasks: newTasks.slice(startIndex, startIndex + 5)})
    
});

router.get('/filterBy=&order=asc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.send(400).send('bad request: page not provided')
    }
    const tasks = JSON.parse(fs.readFileSync('./data.json', (err) => {
        console.log(err);
    }))
    tasks.posts.sort((a, b) => a.createdAt - b.createdAt) 
    page = req.params.page;
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send({
        count: tasks.posts.length,
        tasks: tasks.posts.slice(startIndex, startIndex + 5)})
    
});

router.get('/filterBy=done&order=asc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.send(400).send('bad request: page not provided')
    }
    const tasks = JSON.parse(fs.readFileSync('./data.json', (err) => {
        console.log(err);
    }))
    tasks.posts.sort((a, b) => a.createdAt - b.createdAt)
    const newTasks = tasks.posts.filter(task => task.done);
    const page = req.params.page;
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send({
        count: newTasks.length,
        tasks: newTasks.slice(startIndex, startIndex + 5)})
    
});

router.get('/filterBy=undone&order=asc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.send(400).send('bad request: page not provided')
    }
    const tasks = JSON.parse(fs.readFileSync('./data.json', (err) => {
        console.log(err);
    }))
    tasks.posts.sort((a, b) => a.createdAt - b.createdAt)
    const newTasks = tasks.posts.filter(task => !task.done);
    const page = req.params.page;
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send({
        count: newTasks.length,
        tasks: newTasks.slice(startIndex, startIndex + 5)})
    
});

router.get((req, res) => {
    res.status(404).send('<h1>Not Found</h1>')
})

router.post('/post/', (req, res) => {
    try {
        const tasks = JSON.parse(fs.readFileSync('./data.json'));
        tasks.posts.push(req.body)
        const newTasks = JSON.stringify({
            count: tasks.posts.length,
            posts: tasks.posts
        }, null, 2)
        fs.writeFileSync('./data.json', newTasks, (err) => {
            if (err) {
                console.log(err);
            }
        })
        res.status(204).send('task added');

    } catch (e) {
        console.log(e);
    }
})

router.delete('/:uuid', (req, res) => {
    if (!req.params.uuid) {
        res.status(404).send('bad request: id of the task not provided')
    }
    try {
        const tasks = JSON.parse(fs.readFileSync('./data.json'));
        const posts = tasks.posts.filter(task => task.uuid !== +req.params.uuid);
        const newData = JSON.stringify({
            count: posts.length,
            posts: posts
        }, null, 2)
        fs.writeFileSync('./data.json', newData, (err => {
            if (err) {
                console.log(err);
            }
        }))
        res.status(204).send('task deleted')
    } catch (err) {
        console.log(err)
    }
})

router.patch('/:uuid', (req, res) => {
    if (!req.params.uuid) {
        res.status(404).send('bad request: id of the task not provided');
    }
    try {
        console.log(1)
    } catch (err) {
        console.log(err);
    }
})

module.exports = router