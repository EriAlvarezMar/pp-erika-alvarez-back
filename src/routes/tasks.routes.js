import { Router } from 'express'
const router = Router();

import {connect} from '../database'
import {ObjectID} from 'mongodb'


router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('user').find({}).toArray();
    console.log(result);
    res.send(result);
})

router.post('/', async (req, res) =>{
    const db = await connect();
    
    const user = {
        name: req.body.name,
        phone: req.body.phone,
        age: req.body.age,
        gender: req.body.gender,
        date: Date("<YYYY-mm-dd>")
    };
    const result = await db.collection('user').insert(user);
    res.json(result.ops[0]);
});

router.get('/:name', async (req, res) =>{
    const { name } = req.params;
    const db = await connect();
    const result = await db.collection('user').findOne({name: String(name)});
    res.json(result);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('user').remove({_id: ObjectID(id)});
    res.json({
        message: 'User deleted',
        result
    })
});

router.put('/:id', async (req, res)=>{
    const { id } = req.params;
    const updateUser = {
        name: req.body.name,
        phone: req.body.phone,
        age: req.body.age,
        gender: req.body.gender,
        date: Date("<YYYY-mm-dd>")
    };
    const db = await connect();
     await db.collection('user').updateOne({_id: ObjectID(id)}, { $set: updateUser});
    res.json({
        message: 'User Updated'
    })
})
export default router;