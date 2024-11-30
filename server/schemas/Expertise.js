import mongoose from 'mongoose';


const expertiseModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true,
      },
    expertise: {
        type: [String],
        required: true,
        validate: {
          validator: (value) => Array.isArray(value) && value.length > 0,
          message: "Expertise array must contain at least one item.",
        },
      },
})


const Expertise = mongoose.models.Expertise || mongoose.model("Expertise",expertiseModel);
export default Expertise;