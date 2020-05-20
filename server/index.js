const express = require('express');
const app = express();
const {JSDOM} = require("jsdom");
const {window} = new JSDOM("");
const $ = require("jquery")(window)
require('dotenv/config')
const ClientError = require('./client-error');
const staticMiddleware = require("./static-middleware")

const todoistKey = `Bearer ${process.env.TODOIST}`

app.use(staticMiddleware)

app.get("/api/task",(req,res,next)=>{
  const projectId = req.params.projectId;
  $.ajax({
    url: "https://api.todoist.com/rest/v1/tasks",
    headers: {
      "Authorization": `Bearer ${process.env.TODOIST}`
    },
    data: {
      project_id: 2236484331
    },
    success: (data) => res.status(200).json(data),
    error: (err)=> next(err)
  })
})

app.use(express.json())
app.post("/api/task", (req,res,next)=>{
  const {content, projectId } = req.body
  let dueDate = req.body.due
  if(!dueDate){
    dueDate = "today"
  }
  $.ajax(
  {
    url: "https://api.todoist.com/rest/v1/tasks",
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.TODOIST}`,
      "Content-Type": "application/json"
    },
    data: JSON.stringify({
      "content": content,
      "due_string": dueDate,
      project_id: parseInt(projectId)
    }),
    dataType: "json",
    success: (data)=> res.status(200).json(data),
    error: err=>next(err)
  })
})

app.post('/api/task/close/:taskId',(req,res,next)=>{
  const taskId = req.params.taskId;
  $.ajax({
    url: `https://api.todoist.com/rest/v1/tasks/${taskId}/close`,
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.TODOIST}`,
    },
    success: data=>res.status(201).json(data),
    error: err=>next(err)
  })
})

app.post('/api/task/open/:taskId', (req, res, next) => {
  const taskId = req.params.taskId;
  $.ajax({
    url: `https://api.todoist.com/rest/v1/tasks/${taskId}/reopen`,
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.TODOIST}`,
    },
    success: data => res.status(201).json(data),
    error: err => next(err)
  })
})

// app.delete('/api/task/:taskId', (req,res,next)=>{

// })

app.get("/api/recommendation/:query",(req,res,next)=>{
  const queryKey = req.params.query;  // getRecommendation(queryKey) {
    $.ajax(
      {
        url: "https://tastedive.com/api/similar",
        method: "GET",
        data: {
          "q": queryKey,
          "k": process.env.TASTEDIVE,
          limit: 5
        },
        success: (data)=> res.status(200).json(data),
        error: err=> next(err)
      }
    )
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
