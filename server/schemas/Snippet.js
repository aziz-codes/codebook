import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    programmingLanguage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [], // Array of strings for tags
    },
    resource: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)?([\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`,
        },
        required: [true, 'Resource URL is required'],
    },
    code: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
    },
}, { timestamps: true }); // Add createdAt and updatedAt timestamps
const Snippet = mongoose.models.Snippet || mongoose.model('Snippet', snippetSchema);
export default Snippet;

