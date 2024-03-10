const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
// app.use(express.static('public'));

// app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Set up the view engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
  // Render the index.html file
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/displayusers', (req, res) => {
  // Render the displayusers.html file
  res.sendFile(path.join(__dirname, 'public', 'displayusers.html'));
});

// app.get('/', (req, res) => {
//   const indexPath = path.join(__dirname, 'public', 'index.html');
//   res.sendFile(indexPath);
//   //res.render('index.html');
// });

app.get('/displayusers', (req, res) => {
  res.render('displayusers.html');
});


//mongodb+srv://<username>:<password>@displayuser.qi0i1bu.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://user:FQaTj8BVIIVnDC1b@displayuser.qi0i1bu.mongodb.net/MyDatabase?retryWrites=true&w=majority').then(()=>{
  console.log("Connected to atlas db");
})
.catch((e)=>{
  console.log(e);
});//mongodb://localhost:27017/mydatabase

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
    res.json({ success: true, message: 'User added successfully!'});
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
