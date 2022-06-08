const express = require('express');
const router = express.Router();
const tasks = require('./data.json');
const fs = require('fs');

router.get('/filterBy=&order=desc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.send(400).send('bad request: page not provided')
    }
    const posts = tasks.posts.length > 1 && (tasks.posts[0].createdAt > tasks.posts[1].createdAt) ?
        tasks.posts :
        tasks.posts.reverse()
    const page = req.params.page
    const startIndex = 5 * (page - 1);
    res.send({
        count: tasks.count,
        tasks: posts.slice(startIndex, startIndex + 5)})
    res.status(200);
    
});

router.get('/filterBy=done&order=desc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.send(400).send('bad request: page not provided')
    }
    const posts = tasks.posts.length > 1 && (req.url.includes('desc')) ?
        tasks.posts :
        tasks.posts.reverse();
    posts.filter(task => task.done);
    const page = req.params.page
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send({
        count: tasks.count,
        tasks: posts.slice(startIndex, startIndex + 5)})
    
});

router.get('/filterBy=undone&order=desc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.send(400).send('bad request: page not provided')
    }
    const posts = tasks.posts.length > 1 && (req.url.includes('desc')) ?
        tasks.posts :
        tasks.posts.reverse();
    posts.filter(task => !task.done);
    const page = req.params.page
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send({
        count: tasks.count,
        tasks: posts.slice(startIndex, startIndex + 5)})
    
});

router.get('/filterBy=&order=asc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.send(400).send('bad request: page not provided')
    }
    const posts = tasks.posts.length > 1 && (req.url.includes('desc')) ?
        tasks.posts :
        tasks.posts.reverse();
    const page = req.params.page;
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send({
        count: tasks.count,
        tasks: posts.slice(startIndex, startIndex + 5)})
    
});

router.get('/filterBy=done&order=asc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.send(400).send('bad request: page not provided')
    }
    const posts = tasks.posts.length > 1 && (req.url.includes('asc')) ?
        tasks.posts :
        tasks.posts.reverse();
    posts.filter(task => task.done);
    const page = req.params.page;
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send({
        count: tasks.count,
        tasks: posts.slice(startIndex, startIndex + 5)})
    
});

router.get('/filterBy=undone&order=asc&page=:page', (req, res) => {
    if (!req.params.page) {
        res.send(400).send('bad request: page not provided')
    }
    const posts = tasks.posts.length > 1 && (req.url.includes('asc')) ?
        tasks.posts :
        tasks.posts.reverse();
    posts.filter(task => task.done);
    const page = req.params.page;
    const startIndex = 5 * (page - 1);
    res.status(200);
    res.send({
        count: tasks.count,
        tasks: posts.slice(startIndex, startIndex + 5)})
    
});

router.get((req, res) => {
    res.status(404).send('<h1>Not Found</h1>')
})

router.post('/post/', (req, res) => {
    try {
        tasks.posts.push(req.body)
        const newTasks = JSON.stringify({
            "count": tasks.count + 1,
            "posts": tasks.posts
        }, null, 2)
        fs.writeFileSync('./routes/data.json', newTasks, (err) => {
            if (err) {
                console.log(err);
            }
        })
        res.status(200).send('task added');

    } catch (e) {
        console.log(e);
    }
})

router.delete('delete/:uuid', (req, res) => {
    const newTasks = tasks.posts.filter(task => task.uuid !== req.params.uuid);
    fs.writeFileSync('./routes/data.json', newTasks, (err) => {
        console.log(err)
    })
    res.status(200).send('task deleted')
})

// router
//     .route('/:uuid')
//     .get((req, res) => {
//         res.send(`${tasks.posts.find((task => 
//             task["uuid"] === +req.params.uuid))}`);
        
//     })
//     .patch((req, res) => {
//         res.send(`update task wid uuid ${req.params.uuid} =>
//          `)
//     })
//     .delete((req, res) => {
//         res.send(`delete task wid uuid ${req.params.uuid}`)
//     })

// router.post('/', (req, res) => {
//     res.send('create task')
// })

module.exports = router