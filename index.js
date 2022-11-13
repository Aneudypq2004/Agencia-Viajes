import express from 'express';
import router from './routes/index.js';
import db from './config/db.js'

const app = express();

//definir el puerto
const port = process.env.PORT || 3000;

//conectar la base de datos

db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error))

//habilitar pug

app.set('view engine', 'pug');

// enviar year

app.use((req, res, next) => {

    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    return next();
})

//agregar body parser para leer el fomrulario

app.use(express.urlencoded({extended : true}))

app.use('/', router)


//definir la carpeta publica
app.use(express.static('public'))


app.listen(port, () => {
    console.log('El servirdor esta activado')

})

