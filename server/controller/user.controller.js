const express = require('express');
const router = express.Router();

const UserModel = require('../model/user.model');
// import bcrypt
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');
const authParser = require('../middleware/middleware_auth.middleware');



router.post('/', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(404).send({message: "Must include username AND password"});
    }

    return UserModel.addUser(req.body)
        .then((user) => {
                // COMMENT: I am leaving the JWT logic in so you can see the difference
                // Why do we not need to encode the username in session?
                // Why do we not need to set the cookie anymore?
                //
                // const payload = {username};
                // const token = jwt.sign(payload, process.env.SUPER_SECRET, {
                //     expiresIn: '14d'
                // });
                req.session.username = username;
                return res//.cookie('token', token, {httpOnly: true})
                    .status(200).send({username});
            },
            error => res.status(500).send(error));
});

router.post('/authenticate', function (req, res) {
    const {username, password} = req.body;
    UserModel.getUserByUserName(username)
        .then((user) => {
            user.comparePassword(password, (error, match) => {
                if (match) {
                    // Comment: This is the same as above!
                    //
                    // const payload = {username};
                    // const token = jwt.sign(payload, process.env.SUPER_SECRET, {
                    //     expiresIn: '14d'
                    // });
                    req.session.username = username;
                    return res//.cookie('token', token, {httpOnly: true})
                        .status(200).send({username});
                }
                return res.status(400).send("The password does not match");
            });
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
})
// router.post('/', (req, res) => {
//     if(!req.body.username || !req.body.password) {
//         return res.status(404).send({message: "Must include username AND password"});
//     }
//
//     // req.body.password = bcrypt.hashSync(req.body.password, 10);
//
//     return UserModel.addUser(req.body)
//         .then((user) => {
//             // console.dir(user);
//                 const {username} = user;
//                 const payload = {username};
//                 // JWT is encrypting our payload (which is whatever data we want
//                 // to carry across sessions: in this case, just the username)
//                 // into the cookie based on our SECRET
//                 const token = jwt.sign(payload, process.env.SUPER_SECRET, {
//                     expiresIn: '14d' // optional cookie expiration date
//                 });
//                 // Here we are setting the cookie on our response obect.
//                 // Note that we are returning the username, but that isn't as necessary anymore
//                 // unless we want to reference that on the frontend
//                 return res.cookie('token', token, {httpOnly: true})
//                     .status(200).send({username});
//             // return res.status(200).send(user)
//             },
//             error => res.status(500).send(error));
// });

router.get('/loggedIn', authParser, async function (req, res) {
    username = req.session.username;
    return await UserModel.getUserByUserName(username)
    .then((response) => res.status(200).send(response),
    (error) =>  res.status(404).send(`Error finding User:${error}`));
    // return res.status(200).send({username});
})

router.get('/logout', async (req, res) => {
    // add code here!
    await req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.status(400).send("Something Went Wrong")
        } else {
            res.send(200).send("User Logged out successfully!", res, {});
        }
    })
})

//...

// Can you figure out why authenticate is POST now?
// router.post('/authenticate', function (req, res) {
//     const {username, password} = req.body;
//     UserModel.getUserByUserName(username)
//         .then((user) => {
//             user.comparePassword(password, (error, match) => {
//                 if (match) {
//                     const payload = {username};
//                     // JWT is encrypting our payload (which is whatever data we want
//                     // to carry across sessions: in this case, just the username)
//                     // into the cookie based on our SECRET
//                     const token = jwt.sign(payload, process.env.SUPER_SECRET, {
//                         expiresIn: '14d' // optional cookie expiration date
//                     });
//                     // Here we are setting the cookie on our response obect.
//                     // Note that we are returning the username, but that isn't as necessary anymore
//                     // unless we want to reference that on the frontend
//                     return res.cookie('token', token, {httpOnly: true})
//                         .status(200).send({username});
//                 }
//                 return res.status(400).send("The password does not match");
//             });
//         })
//         .catch((error) => console.error(`Something went wrong: ${error}`));
// });

router.get('/:username', async function (req, res) {
    return await UserModel.getUserByUserName(req.params.username)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding User:${error}`));
});

router.put('/:username', async function (req, res) {
    return await UserModel.updateUserByUsername(req.params.username, req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error updating User:${error}`))
});

router.get('/', (req, res) => UserModel.getAllUsers()
    .then(users => res.send(users)));


module.exports = router;