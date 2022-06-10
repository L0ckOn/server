# server
server repository for ToDo project

As for now, the data is being sotred in json file wich looks like this:

{<br/>
  "count": 2,<br/>
  "posts": [<br/>
    {<br/>
      "uuid": 1654856403969,<br/>
      "name": "1dfvdfv",<br/>
      "done": true,<br/>
      "createdAt": 1654856403969<br/>
    },<br/>
    {<br/>
      "uuid": 1654856434136,<br/>
      "name": "2\\gfbdbdbsdfsfsefrtghrehrthrht",<br/>
      "done": true,<br/>
      "createdAt": 1654856434136<br/>
    }<br/>
  ]<br/>
}<br/>
----------------------------------------------------------------------
where count property stands for amount of the tasks and posts contains
array of posts, represented by objects with four attributes:
  1. uuid - id of the post - int
  2. name - name of the task - string
  3. done - state of task: completed/not completed - boolean
  4. createdAt - date when task was created - date
----------------------------------------------------------------------
POST - https://alpaca-express-server.herokuapp.com/tasks/uuid
----------------------------------------------------------------------
GET - https://alpaca-express-server.herokuapp.com/tasks/filterBy=&['', done, undone]=[desc, asc]&page=page
filterBy=$ specifies how to sort the tasks by state of completion;
desc and asc stands for descending and ascending sorting by date respectively
----------------------------------------------------------------------
DELETE - https://alpaca-express-server.herokuapp.com/tasks/uuid
will delete the task with passed uuid
----------------------------------------------------------------------
PATCH - https://alpaca-express-server.herokuapp.com/tasks/uuid
in function you will need to pass an object with one attribute:
"done" or "name", depending on the attribute you are passing
task with passed uuid will be changed differently
----------------------------------------------------------------------
