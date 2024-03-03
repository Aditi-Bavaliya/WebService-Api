const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

const PORT = 3000;
app.use(express.static('public'));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index');
});


mongoose.connect('mongodb://localhost:27017/mydatabase');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNo: String,
  email: String,
  street: String,
  city: String,
  state: String,
  country: String,
  loginId: String,
  password: String,
  creationTime: Date,
  lastUpdatedOn: Date,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(cors());
app.post('/api/saveUser', async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.creationTime = new Date();
    newUser.lastUpdatedOn = new Date();
    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/getUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
