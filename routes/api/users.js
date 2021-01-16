const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const Users = require('../../Users');

//  send json data or Api's && Get All users

router.get('/', (req, res) => {
    res.json(Users);
});

//  Get Single member

router.get('/:id', (req, res) => {
    const found = Users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        res.json(Users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `Member not found with the id of ${req.params.id}` });
    }
});

//  Create new user

router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        country: req.body.country,
        status: 'active'
    };
    if (!newUser.name || !newUser.country) {
        return res.status(400).json({ msg: "Please include data to add new user" });
    }
    Users.push(newUser);
    res.json(Users);
    // res.redirect('/');
});

//  update user

router.get('/:id', (req, res) => {
    const found = Users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        const updatUser = req.body;
        Users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updatUser.name ? updatUser.name : user.name
                user.country = updatUser.country ? updatUser.country : user.country

                res.json({ msg: "User updated", user });
            }
        });
    } else {
        res.status(400).json({ msg: `Member not found with the id of ${req.params.id}` });
    }
});

module.exports = router;