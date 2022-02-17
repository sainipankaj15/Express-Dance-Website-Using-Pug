const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // import env module

dotenv.config(); // by writing this we can access .env file 
const port = process.env.PORT || 8000 ;  //these are 2 parts   one by me or one by server // this line should be under dotenv.config()


//EXPRESS STUFF
app.use('/static', express.static('static'));  // serving static file 
app.use(express.json()); // add this is also without reason
app.use(express.urlencoded()); //   JO Bhi request html se aa rahi h usme usko req.body mai add kar deta h as a object

//PUG STUFF
app.set('view engine', 'pug'); //set template engine as a pug
app.set('views', path.join(__dirname, 'views')); // set the views folder


// MONGOOSE STUFF

// connecting to mongoDB to save the data
// connecting to database which name is Dance-Website
async function main() {
    await mongoose.connect(process.env.URL,{ 
     

           // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true, 
    }).then(()=>{
        console.log("Yes Database is connected");
    }).catch((err)=>{
        console.log(err);
    });
}


main();
// schema defining
const contact = new mongoose.Schema({
    Name: String,
    Gender : String,
    Age : Number,
    more : String,
    address : String,

});
// here  we create a model(collection) and it's name is Contactform(baad wala Contactform h ) and it's type is contact
const Contactform = mongoose.model('Contactform', contact);



//ENDPOINTS
app.get("/", (req, res) => {

    res.status(200).render('index.pug');
});

app.get("/contact", (req, res) => {

    res.status(200).render('contact.pug');
});

//post request
app.post("/contact", (req, res) => {

    console.log(req.body);

    var newData = new Contactform(req.body); // bascally i created a new object by req.body 

    // and what is req.body ............. this is the body when someone will submit our from .... means when someone request post request jo ki form submit button dabane par aayagi(contact.pug mai form ka action dekh waha likha h )

    newData.save().then(()=>{
        res.send("This item has been sent");
    }).catch((err)=>{
        console.log(err);
        res.send("This is not sent,Try again");
    });


  
});




// SERVER START
app.listen(port, () => {

    console.log(`this is running on port ${port}`);
});