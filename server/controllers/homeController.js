const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHomePage = async (req, res) => {
    const promises = [];
    const viajes = await Viaje.findAll({
        limit: 3,
    });
    const testimoniales = await Testimonial.findAll({
        limit: 3,
    });
    res.render('index', {
        pagina: 'Proximos viajes',
        clase: 'home',
        viajes,
        testimoniales,
    });
};
