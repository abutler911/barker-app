const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('mongodb+srv://abutler911:sjfd6162@cluster0.dcs48.mongodb.net/whisper?retryWrites=true&w=majority')
const whispers = db.get('whispers');

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        message: 'This works!'
    });
});

app.get('/whispers', (req, res) => {
    whispers
        .find()
        .then(whispers => {
            res.json(whispers);
        });
});

function isValidWhisper(whisper) {
    return whisper.name && whisper.name.toString().trim() !== '' &&
    whisper.content && whisper.content.toString().trim() !== '';
}

app.post('/whisper', (req, res) => {
    if (isValidWhisper(req.body)) {
        const whisper = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created:new Date()
        };
        
        whispers
            .insert(whisper)
            .then(createdWhisper => {
                res.json(createdWhisper);
            });

    } else {
        res.status(422);
        res.json({
            message: 'Hey! Name and content are required'
        });
    }
    console.log(req.body)
});


app.listen(5000, () => {
    console.log('listening on https://localhost:5000')
});