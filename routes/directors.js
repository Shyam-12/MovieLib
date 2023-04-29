const express = require('express');
const router = express.Router();
const Director = require('../models/director');

// all director route
router.get('/', async (req, res)=> {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== "") {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const directors = await Director.find(searchOptions);
        res.render('directors/index', { 
            directors: directors, 
            searchOptions: req.query.name 
        });
    } catch {
        res.redirect('/');
    }
})

// new director route
router.get('/new', (req, res) => {
    res.render('directors/new', { director: new Director()});
})

// create director route
router.post('/', async (req, res) => {
    const director = new Director({
        name: req.body.name
    })

    try {
        const newDirector = await director.save();
        // res.redirect(`directors/${newDirector.id}`)
        res.redirect('directors');
    } catch {
        res.render('directors/new', {
            director: director,
            errorMessage: 'Error creating Director'
        })
    }

    // director.save()
    //     .then((newDirector) => {
    //         // res.redirect(`directors/${newDirector.id}`)
    //         res.redirect(`directors`)
    //     })
    //     .catch((err) => {
    //         res.render('directors/new', {
    //             director: director,
    //             errorMessage: 'Error creating Director'
    //         })
    //     });
})

module.exports = router;