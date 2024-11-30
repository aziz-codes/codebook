import express from 'express';
import Expertise from '../schemas/Expertise.js';

const router = express.Router();


router.post('/expertise/:id',async(req,res)=>{
    try{
       const {id} = req.params;
       const {  expertise } = req.body;

       if (!id || !Array.isArray(expertise)) {
         return res.status(400).json({ error: "Invalid input data" });
       }
       const existingExpertise = await Expertise.findOne({ userId: id });

       if (existingExpertise) {
         return res
           .status(409) // Conflict status
           .json({ error: "Expertise already exists for this user." });
       }
   
       // Create a new expertise document
       const newExpertise = await Expertise.create({
         userId: id,
         expertise,
       });
   
       return res.status(201).json({ success: true, data: newExpertise });
    }
    catch(err){
        res.statusCode(200).send({message: err.message});
        console.log(err);
    }
})

export default router;