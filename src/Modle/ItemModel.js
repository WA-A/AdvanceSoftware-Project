import { Schema, model ,Types} from 'mongoose';

const ItemSchema = new Schema({
    NameItem:{
        type:String,
       required:true,  
    },
    Description: {
        type: String,
        required: true,
     },
     Category: {
        type: String,
        required: true,
        enum: ['Tools', 'Sports Equipment', 'Electronics', 'Furniture', 'Vehicles', 'Others'],  
        default: 'Others'
    },
    DailyPrice: {
        type: Number,
        required: true,
    },
    Status: {
        type: String,
        enum: ['Available', 'Rented'],
        default: 'Available'
    },
    DateAdded: {
        type: Date,
        default: Date.now
    },
     Image:{
      type:Object,
      required:true,
     },
     Owner: {
        type: ObjectId, // Relation with User Model
        ref: 'User', 
        required: true
    },
     createdBy:{type:Types.ObjectId,ref:'User'},
     updatedBy:{type:Types.ObjectId,ref:'User'},
    },
    {
     timestamps:true,
    });


const ItemModel = model('Item',ItemSchema); 
export default ItemModel;