const express = require('express');
const app = express();

const Container = require('./container');
const fileName = new Container ("productos.txt");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

//Vista de todos los productos
app.get('/productos', (req, res) => {
    const getProducts = async () => {
        const products = await fileName.getAll();
        res.render('data', {products})
    };
    getProducts();
});

//Para redirigir al formulario de carga de productos
app.get('/', (req, res) => {
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
    console.log("escuchando desafio 10 pug");
});



