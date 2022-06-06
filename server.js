const express = require('express');
const tasksRouter = require('./routes/tasks');
const cors = require('cors')

const app = express();
const PORT = 5000;

app.use(
    cors({
        origin: '*'
    })
)

app.get('/', (req, res) => {
    console.log(1)
});

app.listen(PORT, () => {
    console.log('listening')
});

app.use('/tasks', tasksRouter);