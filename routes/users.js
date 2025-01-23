const express = require('express');
const router = express.Router();
const users = require('../data/users.js');
const validateUser = require('../middleware/vaidation.js');

router.get('/api/v1/admin/users', (req, res) => {
    res.status(200).json(users);
});

router.get('/api/v1/admin/users/:userID', (req, res, next) => {
    try {
        const { userID } = req.params;
        const userIdNum = parseInt(userID);

        if (isNaN(userIdNum)) {
            const error = new Error('Invalid user ID');
            error.status = 400;
            throw error;
        }

        const user = users.find(user => user.id === userIdNum);

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.post('/api/v1/admin/users',validateUser ,(req, res) => {
    const { body } = req;

    const newID = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const newUser = { id: newID, ...body };
    users.push(newUser);

    console.log('New user added:', newUser);
    res.status(201).json(newUser);
});

router.put('/api/v1/admin/users/:userID',validateUser, (req, res, next) => {
    try {
        
        const {
            body,
            params: { userID }
        } = req;

        const userIdNum = parseInt(userID);
        console.log(userIdNum);
        console.log(body);
        if (isNaN(userIdNum)) {
            const error = new Error('Invalid user ID');
            error.status = 400;
            throw error;
        }

        const userIndex = users.findIndex(user => user.id === userIdNum);

        if (userIndex === -1) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        users[userIndex] = { id: userIdNum, ...body };
        console.log('User updated:', users[userIndex]);
        res.status(200).json(users[userIndex]);
    } catch (error) {
        next(error);
    }
});

// Delete a user
router.delete('/api/v1/admin/users/:userID', (req, res, next) => {
    try {
        const { userID } = req.params;
        const userIdNum = parseInt(userID);
        console.log(userIdNum);
        if (isNaN(userIdNum)) {
            const error = new Error('Invalid user ID');
            error.status = 400;
            throw error;
        }

        const userIndex = users.findIndex(user => user.id === userIdNum);

        if (userIndex === -1) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        const deletedUser = users.splice(userIndex, 1);
        console.log('User deleted:', deletedUser);
        res.status(200).json(deletedUser);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
