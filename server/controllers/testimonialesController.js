const Testimonial = require('../models/Testimoniales');
exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll();
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales,
    });
};
exports.agregarTestimonial = (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    errores = [];
    if (!nombre) {
        errores.push({ mensaje: 'Agrega Tu nombre' });
    }
    if (!correo) {
        errores.push({ mensaje: 'Agrega Tu correo' });
    }
    if (!mensaje) {
        errores.push({ mensaje: 'Agrega Tu mensaje' });
    }
    if (errores.length) {
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
        });
    } else {
        Testimonial.create({
            nombre,
            correo,
            mensaje,
        })
            .then((testimonial) => {
                res.redirect('/testimoniales');
            })
            .catch((error) => console.log(error));
    }
};
