const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

const Container = require('./container');
const fileName = new Container ("productos.txt");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'index.hbs',
    })
);

app.set('views', './views');
app.set('view engine', 'hbs');

//Vista de todos los productos
app.get('/productos', (req, res) => {
    const getProducts = async () => {
        const products = await fileName.getAll();
        res.render('main', {products})
    };
    getProducts();
});

//Para redirigir al formulario de carga de productos
app.get('/carga', (req, res) => {
    res.sendFile(__dirname + '/public/input.html');
})


//Para agregar un producto
app.post('/productos', (req, res) => {
    const newProduct = req.body;
    const getProducts = async () => {
        const newId = await fileName.save(newProduct);
        res.sendFile(__dirname + '/public/input.html');
    };
    getProducts();
});

app.listen(8080, () => {
    console.log("escuchando desafio 10");
});



