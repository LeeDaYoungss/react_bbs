const express = require('express');
const app = express();
const port = 8000;
const mysql = require('mysql');
const cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:3000' //'*' 는 모두 허용
}

app.use(cors(corsOptions));

// get방식, post방식으로 바꾸기 가능해짐
app.use(express.json());
app.use(express.urlencoded({extended: false}));

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database:'react_bbs'
});

db.connect();

app.get('/list', (req, res) => {
  const Sql = "SELECT id, title, user_id, DATE_FORMAT(update_date, '%Y-%m-%d') AS update_date FROM board";
  db.query(Sql, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
})


// get방식으로 받는것은 query, post방식으로 받는것은 body
app.get('/detail', (req, res) => {
  const id = req.query.id;

  const Sql = "SELECT title, content FROM board WHERE id=?";
  db.query(Sql, [id], function(err, result) {
    if (err) throw err;
    res.send(result);
  });
})

// req -> 전송한 데이터 (=request)
app.post('/insert', (req, res) => {
  /*
  let title = req.body.title;
  let content = req.body.content;
  */
  const{title, content} = req.body;

  let Sql = "INSERT INTO board (title, content, user_id) VALUES (?,?,'admin')";
  db.query(Sql,[title, content], function(err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.post('/update', (req, res) => {
  const{id, title, content} = req.body;

  let Sql = "UPDATE board SET title=?, content=? WHERE id=?";
  db.query(Sql,[title, content, id],
    function(err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})