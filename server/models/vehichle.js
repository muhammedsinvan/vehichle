import mongoose from 'mongoose';

const addVehichleSchema = mongoose.Schema({
    name:({type:String,required:true}),
    description:({type:String,required:true}),
    manufactur:({type:String,required:true}),
    model:({type:String,required:true}),
    price:({type:String,required:true}),
    qty:({type:String,required:true}),
    image1:({type:String,required:true}),
    image2:({type:String,required:true}),
    image3:({type:String,required:true}),
    image4:({type:String,required:true})
})

const vehichle = mongoose.model('Vehichle', addVehichleSchema)

export default vehichle;