const express = require('express');
const app = express();
const {JSDOM} = require("jsdom");
const {window} = new JSDOM("");
const $ = require("jquery")(window)
require('dotenv/config')

app.get("/api/task/:projectId",(req,res,next)=>{
  const projectId = req.params.projectId;
  $.ajax({
    url: "https://api.todoist.com/rest/v1/tasks",
    headers: {
      "Authorization": `Bearer ${process.env.TODOIST}`
    },
    data: {
      project_id: projectId
    },
    success: (data) => res.status(200).json(data),
    error: (err)=> next(err)
  })
})

app.get("/api/recommendation/:query",(req,res,next)=>{
  const queryKey = req.params.query;  // getRecommendation(queryKey) {
    $.ajax(
      {
        url: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar",
        method: "GET",
        data: {
          "q": queryKey,
          "k": process.env.TASTEDIVE
        },
        success: console.log,
        error: console.error
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
