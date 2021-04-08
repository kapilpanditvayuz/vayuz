const bodyParser        = require('body-parser'),
      mongoose          = require('mongoose'),
      express           = require('express'),
      app               = express();

//Connection string 
const url="mongodb+srv://kapil123:kapil123@cluster0.wjkqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || "mongodb://localhost:27017/Vayuz";

//Db connection
mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }) 
    .then(() => console.log('Connected to MongoDB successfully....'))
    .catch(err => console.error('Could not connect to MongoDB....'));

  app.set("view engine", "ejs");
  app.use(bodyParser.urlencoded({extended: true}));  



  // User Model Config
  
  const userSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      created: {type: Date, default: Date.now}
  });
  const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const User = {username:username, email:email, password:password}
    User.create(req.body.user,  function(err, newUser) {
        if(err) {
            console.log("new");
        }
        else {
            res.render("/dateofbirth");
        }
    });
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express server started at port  : ${port}`);
});