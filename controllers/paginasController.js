import { Viaje } from '../models/Viaje.js'
import { Testimonial } from '../models/Testimonial.js'

const paginaInicio = async (req, res) => {

    //Consultar 3 viajes del modelo de viaje
    const promiseDb = [];
    promiseDb.push(Viaje.findAll({ limit: 3 }))
    promiseDb.push(Testimonial.findAll({ limit: 3 }))

    try {
        const resultado = await Promise.all(promiseDb)
        
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales : resultado[1]

        })
    } catch (error) {

    }


}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}
const paginaViajes = async (req, res) => {
    //consultar base de datos

    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    })
}

//muestra un viaje por su slug

const paginaDetalleViaje = async (req, res) => {
    //consultar base de datos

    try {
        const { slug } = req.params

        const viaje = await Viaje.findOne({ where: { slug } });

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })

    } catch (error) {

    }

}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })

    } catch (error) {

    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}