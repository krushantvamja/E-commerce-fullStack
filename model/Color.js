import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
   

    
},
{timestamps: true}
);

const Color = mongoose.model('color', ColorSchema);
export default Color;
