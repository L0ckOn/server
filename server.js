const express = require('express');
const tasksRouter = require('./routes/tasks');
const cors = require('cors')

const app = express();
const PORT = 4000;


app.use(
    cors({
        origin: '*',
    })
)

app.use(express.json());

app.get('/', (req, res) => {
    console.log(1)
    res.send('hello')
});

app.listen(PORT, () => {
    console.log('listening')
});

app.use('/tasks', tasksRouter);