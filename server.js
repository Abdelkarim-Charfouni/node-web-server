const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',function(){
        return new Date().getFullYear();
});

hbs.registerHelper('screamIt',function(text){
    return text.toUpperCase();
});

// app.use((req, res, next)=> {
//     res.render('maintain.hbs',{
//         titlePage : 'Maintain page'
//     });
// }); 

app.use((req, res, next) => {
    var now = new Date().toString();
    fs.appendFileSync('logger.txt',`${now} : ${req.method} ${req.url}\n`);
    next();       
});

app.get('/',function(req, res){
   
        res.render('home.hbs',{
            titlePage : 'Home page'          
        });
});

app.get('/about',function(req, res){
        res.render('About.hbs',{
            titlePage: 'About page'
        });
});

app.get('/bad',function(req, res){
        res.send({
            errorMessage : 'Somthing went wrong ! '
        });
});



app.listen(3000, function(){
    console.log('server is up on 3000');
});