// BUILD YOUR SERVER HERE
const model = require('./users/model');
const express = require('express');
const PORT    = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
    model.find()
        .then(success => {
            res.status(200).json({
                data: success
            });
        })
        .catch(() => {
            res.status(503).json({
                message: 'The users information could not be retrieved'
            });
        });
});

app.get('/api/users/:id', (req, res) => {
    model.findById(req.params.id)
        .then(succcess => {
            if(!success) {
                res.status(404).json({
                    message: 'The usr with the specified ID does not exist'
                });
            }

            res.status(200).json({
                data: success
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'The user information could not be retrieved'
            });
        });
});

app.put('/api/users/:id', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the user'
        });
    }

    model.update(req.params.id, req.body)
        .then(success => {
            if(!success) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                });
            }

            res.status(200).json({
                data: success
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'The user information could not be modified'
            });
        });
});

app.post('/api/users/', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the user'
        });
    }
    
    model.insert(req.body)
        .then(success => {
            res.status(201).json({
                data: req.body
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'There was an error while saving the user to the database'
            });
        });
});

app.delete('/api/users/:id', (req, res) => {
    model.remove(req.params.id)
        .then(success => {
            if(!success) {
                res.status(400).json({
                    message: 'The user with the specified ID does not exist'
                });
            }

            res.status(200).json({
                data: success
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'The user could not be removed'
            });
        });
});


module.exports = app; // EXPORT YOUR SERVER instead of {}
