const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Note = require('../models/note');

router.use(bodyParser.json({ type: 'application/*+json' }))


router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.render('index', {
            notes
        });
    }catch(err) {
        res.send(err.message || 'Error while get notes');
    }
})

router.get('/add-note', async (req, res) => {
    res.render('addNote')
})

router.post('/', async (req, res) => {
    const notes = new Note({
        title: req.body.title,
        desc: req.body.desc
    })
    try {
        const newNotes = await notes.save();
        res.redirect('/notes')
    }catch(err) {
        res.send(err.message)
    }
})



router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        res.render('detail', {
            note
        })
    }catch(err){
        res.send(err.message);
    }
})





// router.delete('/delete', async(req, res) => {
//     Note.deleteOne(
//         {_id : req.body._id, title: req.body.title, desc: req.body.desc}
//         ).then(result => {
//     res.redirect('/notes')
//     })
// })

// router.get('/delete/:id', async (req, res) => {
//     const { id } = req.params
//     const note = await Note.findById(id);

//     if (!note) {
//         res.status(404);
//         res.send(`<h1>404</h1>`)
//     }
//     console.log(note);
//     Note.deleteOne({_id: id});
//     res.redirect('/notes')
// })

router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id, (err, result) => {
        if (err) {
            res.send({message: "Error Occured"}).json()
        }

        res.redirect('/notes')
    })
})


// Halaman ubah catatan
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findById(id);
        res.render('update', {
            note
        })
    } catch (err) {
        res.send(err.message);
    }
})



// Proses update / ubah catatan
router.post('/update/:id', async(req, res) => {
    const { id } = req.params;
    Note.updateOne(
        {
        _id : id,
        },        
        {
            $set: {
                title: req.body.title,
                desc: req.body.desc,
            }
        }
    ).then(result => res.redirect("/notes"));
     
})





module.exports = router;