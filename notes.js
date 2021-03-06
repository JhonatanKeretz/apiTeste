var express = require('express');
var router = express.Router();
const Note = require('../../models/note');
const withAuth = require('../middlewares/auth')


router.post('/', withAuth, async (req, res) => {
const { title, body } = req.body;

try {
    let note = new Note({ title: title, body: body, author: req.user._id });
    await note.save();
    res.status(200).json(note);
} catch (error) {
    res.status(500).json({ error: 'Problema para criar nota' });
}
})

router.get('/:id', withAuth, async(req, res) => {
try {
    const { id } = req.params;
    let note = await Note.findById(id);
    console.log(note)
    if(isOwner(req.user, note))
        res.json(note);
    else
        res.status(403).json({ error: 'Sem permissão para acessar'});
} catch (error) {
    res.status(500).json({ error: 'Problema com o get no note'});
}
})

const isOwner = (user, note) => {
if (JSON.stringify(user._id) == JSON.stringify(note.author._id))

    return true;
else
    return false;
}

module.exports = router;