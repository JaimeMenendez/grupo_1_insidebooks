const express = require("express");
const path = require("path");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;
app.listen(port, ()=>
    console.log("Servidor Corriendo en el puerto",port));

app.get("/", (req,res)=>{
    let htmlPath = path.resolve(__dirname, "./views/home.html");
    res.sendFile(htmlPath);
});

app.get("/home", (req,res)=>{
    let htmlPath = path.resolve(__dirname, "./views/home.html");
    res.sendFile(htmlPath);
});

app.get("/PoliticaDePrivacidad", (req,res)=> {
    res.sendFile(__dirname + "/views/PoliticaDePrivacidad.html");
})

app.get("/TerminosyCondiciones", (req,res)=> {
    res.sendFile(__dirname + "/views/TerminosyCondiciones.html");
})

app.get("/carrito", (req,res)=> {
    res.sendFile(__dirname + "/views/carrito.html");
})

app.get("/description", (req,res)=> {
    res.sendFile(__dirname + "/views/description.html");
})

app.get("/login", (req,res)=> {
    res.sendFile(__dirname + "/views/login.html");
})

app.get("/register", (req,res)=> {
    res.sendFile(__dirname + "/views/register.html");
})

app.get("/searchBook", (req,res)=> {
    res.sendFile(__dirname + "/views/searchBook.html");
})
