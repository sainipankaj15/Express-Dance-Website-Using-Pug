const express = require('express');
const path = require('path');
const port = 8000;
const app = express();



//EXPRESS STUFF
app.use('/static', express.static('static'));  // serving static file 


//PUG STUFF
app.set('view engine', 'pug'); //set template engine as a pug
app.set('views', path.join(__dirname, 'views')); // set the views folder


//ENDPOINTS
app.get("/", (req, res) => {

    res.status(200).render('index.pug');
});

app.get("/contact", (req, res) => {

    res.status(200).render('contact.pug');
});




// SERVER START
app.listen(port, () => {

    console.log(`this is running on port ${port}`);
});