// Подключаем модули
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Создаем приложение
const app = express();

// Создаем подключение к базе данных MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '089b123a71AB',
  database: 'db'
});

// Подключаемся к базе данных
connection.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Используем middleware для обработки JSON и CORS
app.use(express.json());
app.use(cors());

app.get('/items', (req, res) => {
  connection.query('SELECT * FROM items', (err, results, fields) => {
    if (err) {
      res.status(500).send(err); 
    } else {
      res.status(200).send(results); 
    } 
  });
});

// Получение предмета по id
app.get('/items/:id', (req, res) => {
  // Получаем id из параметра URL
  const id = req.params.id;
  // Формируем SQL-запрос для выборки данных из таблицы items по id
  const sql = `SELECT * FROM items WHERE id = ?`;
  // Выполняем SQL-запрос с передачей id
  connection.query(sql, [id], (err, results, fields) => {
    if (err) {
      // Если ошибка, отправляем статус 500 и сообщение об ошибке
      res.status(500).send(err);
    } else {
      // Если успешно, отправляем статус 200 и результат запроса
      res.status(200).send(results[0]); // results - это массив, нам нужен первый элемент
    }
  });
});

// Удаление предмета по id
app.get('/items/delete/:id', (req, res) => {
  // Получаем id из параметра URL
  const id = req.params.id;
  // Формируем SQL-запрос для удаления данных из таблицы items по id
  const sql = `DELETE FROM items WHERE id = ?`;
  // Выполняем SQL-запрос с передачей id
  connection.query(sql, [id], (err, results, fields) => {
  if (err) {
  // Если ошибка, отправляем статус 500 и сообщение об ошибке
  res.status(500).send(err); 
  } else {
  // Если успешно, отправляем статус 200 и результат запроса
  res.status(200).send(results); 
  } 
  });
 });
 

// Добавление нового предмета
app.post('/items/post', (req, res) => {
  // Получаем данные для нового предмета из тела запроса
  const { title, img, description, category, price } = req.body;
  // Формируем SQL-запрос для вставки данных в таблицу items
  const sql = `INSERT INTO items (title, img, description, category, price) VALUES (?, ?, ?, ?, ?)`;
  // Выполняем SQL-запрос с передачей данных
  connection.query(sql, [title, img, description, category, price], (err, results, fields) => {
    if (err) {
      // Если ошибка, отправляем статус 500 и сообщение об ошибке
      res.status(500).send(err);
    } else {
      // Если успешно, отправляем статус 201 и результат запроса
      res.status(201).send(results);
    }
  });
});


// Запускаем сервер на порту 9001
app.listen(9001, () => {
  console.log('Server is running on port 9001');
});
