const express = require('express');
const app = express();
const axios = require('axios').default
require('dotenv/config')
const ClientError = require('./client-error');
const staticMiddleware = require("./static-middleware")

const todoistKey = `Bearer ${process.env.TODOIST}`

app.use(staticMiddleware)

app.get("/api/task",(req,res,next) => {
  const parameter = {
    params: {
      project_id: 2236484331
    },
    headers: {
      Authorization: todoistKey,
    }
  }
  axios.get("https://api.todoist.com/rest/v1/tasks",parameter)
  .then(data => res.status(200).json(data.data))
  .catch(err => next(err))
})


app.use(express.json())
app.post("/api/task", (req,res,next) => {
  const {content, projectId } = req.body

  const config = {
    method: "POST",
    url: "https://api.todoist.com/rest/v1/tasks",
    headers: {
      "Authorization": todoistKey,
      "Content-Type": "application/json"
    },
    data: JSON.stringify({
      "content": content,
      project_id: 2236484331
    })
  }

  axios(config)
  .then(data => res.status(201).json(data.data))
  .catch(err => next(err))
})

app.post('/api/task/close/:taskId',(req,res,next) => {
  const taskId = req.params.taskId;
  axios({
    url: `https://api.todoist.com/rest/v1/tasks/${taskId}/close`,
    method: "POST",
    headers: {
      "Authorization": todoistKey,
    }
  })
  .then(data => res.status(200).json(data.data))
  .catch(err => next(err))
})

app.post('/api/task/open/:taskId', (req, res, next) => {
  const taskId = req.params.taskId;
  axios({
    url: `https://api.todoist.com/rest/v1/tasks/${taskId}/reopen`,
    method: "POST",
    headers: {
      "Authorization": todoistKey,
    },
  })
  .then( data => res.status(201).json(data.data))
  .catch( err => next(err))
})

app.post('/api/task/update/:taskId',(req,res,next) => {
  const taskId = req.params.taskId;
  const {content} = req.body
  axios({
    url: `https://api.todoist.com/rest/v1/tasks/${taskId}`,
    method: "POST",
    headers: {
      Authorization: todoistKey,
      "Content-Type": "application/json",
    },
    data: {
      content: content
    }
  })
  .then(data => res.status(200).json(data.data))
  .catch(err => next(err))
})

app.delete('/api/task/:taskId', (req,res,next) => {
  const taskId = req.params.taskId
  axios({
    url: `https://api.todoist.com/rest/v1/tasks/${taskId}`,
    method: "DELETE",
    headers: {
      Authorization: todoistKey,
    }
  })
  .then(data => res.status(201).json(data.data))
  .catch(err => next(err))
})

app.get("/api/recommendation/:query",(req,res,next)=> {
  const queryKey = req.params.query;
    axios({
      url: "https://tastedive.com/api/similar",
      method: "GET",
      params: {
        "q": queryKey,
        type: "music",
        "k": process.env.TASTEDIVE,
        limit: 5
      }
    })
    .then(data => res.status(200).json(data.data))
    .catch(err => next(err))
})


app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
