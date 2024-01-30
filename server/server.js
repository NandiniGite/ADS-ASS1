const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: '21510066',
  password: 'Nandini@123',
  database: 'my_login_app',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Perform a database query to check credentials
    db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (error, results) => {
        if (error) {
          console.error('Error during authentication:', error);
          res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
          if (results.length > 0) {
            // User authenticated successfully
            res.json({ success: true });
          } else {
            // Invalid credentials
            res.status(401).json({ success: false, message: 'Invalid credentials' });
          }
        }
      }
    );
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
