const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../model/Gig');
const sequelize = require('sequelize');
const Op = sequelize.Op
// Get gig list
router.get('/', (req, res) => 
Gig.findAll()

    .then(gigs => {
    res.render('gigs', {
        gigs
    });
    })

    .catch(err => console.log(err)));

    //Display add gig form
    router.get('/add', (req, res) => res.render('add'));

    // Add a gig
    router.post('/add', (req,res) => {
            
        let { title, technologies, budget, description, contact_email } = req.body;
        let errors = [];
        // validate fields
        if(!title) {
            errors.push({text: 'Please add a title'});
        }
        if(!technologies) {
            errors.push({text: 'Please add some technologies'});
        }
        if(!description) {
            errors.push({text: 'Please add a description'});
        }
        if(!contact_email) {
            errors.push({text: 'Please add a contact email'});
        }

        // check for errors
        if(errors.length > 0) {
            res.render('add', {
                errors,
                title,
                technologies,
                budget,
                description,
                contact_email
            });
        }else{
            if(!budget) {
                budget = 'unknown';
            }else{
                budget = `$${budget}`;
            }

            technologies = technologies.toLowerCae().replace(/, /g, ',');
            
             // Insert into table
        Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        })
        
        
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err));
    }
    })
    //search for gigs;
router.get('/search', (req, res) => {
    let { term } = req.query;
    
    //Make lowercase
    term = term.toLowerCase();
    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } }})
})
module.exports = router;