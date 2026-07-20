const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the library management system!');
});

app.get('/students', (req, res) => {
  // Logic to fetch and return a list of students from the database
res.json({
    message: "Students API"
});
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});