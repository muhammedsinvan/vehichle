import admin from "../models/admin.js";
import vehichle from "../models/vehichle.js";
import cloudinary from "../utils/cloudinary.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingadmin = await admin.findOne({ email });
    if (existingadmin) {
      const hashedPassword = CryptoJS.AES.decrypt(
        existingadmin.password,
        process.env.PASS_KEY
      );
      const orginalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (orginalpassword === password) {
        const jsontoken = jwt.sign(
          { id: existingadmin._id },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );
        const { password, ...others } = existingadmin._doc;
        res.status(200).json({ ...others, jsontoken });
      } else {
        res.status(400).json("Incorrect password");
      }
    } else {
      res.status(400).json("Incorrect email");
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

//adding vehichle
const addvehichle = async (req, res) => {
  const {
    name,
    description,
    manufactur,
    model,
    price,
    qty,
    image1,
    image2,
    image3,
    image4,
  } = req.body;
  const response1 = await cloudinary.uploader.upload(image1);
  const response2 = await cloudinary.uploader.upload(image2);
  const response3 = await cloudinary.uploader.upload(image3);
  const response4 = await cloudinary.uploader.upload(image4);

  try {
    const newvehichle = new vehichle({
       name,
      description,
      manufactur,
      model,
      price,
      qty,
      image1: response1.secure_url,
      image2: response2.secure_url,
      image3: response3.secure_url,
      image4: response4.secure_url,
    });

    const vehichleadded = await newvehichle.save();
    res.json(vehichleadded);
  } catch (errror) {
    res.status(500);
    res.json(errror);
  }
};

//getting all vehichle
const getallvehichle = async (req, res) => {
  try {
    const allvehichle = await vehichle.find({}).sort({ _id: -1 });
    console.log(allvehichle);
    res.json(allvehichle);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

//deleting a vehichle
const deletevehichle = async (req, res) => {
  try {
    await vehichle.findByIdAndDelete(req.params.id);
    res.status(200).json("vehichle deleted successfully");
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const getonevehichle = async (req, res) => {
  try {
    const response = await vehichle.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const checkmail = async (req, res) => {
  const { email } = req.body;
  try {
    let response = await admin.findOne({ email });
    if (response) {
      const token = jwt.sign({ is: response._id }, "process.env.JWT_SEC", {
        expiresIn: "1d",
      });
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "muhammadsinvan@gmail.com",
          pass: "duknrmjvbdrrjowp",
        },
      });

      var mailOptions = {
        from: "muhammadsinvan@gmail.com",
        to: response.email,
        subject: "Reset your password",
        text: `http://localhost:3000/admin/forgotpassword/password/${response._id}/${token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json(info.response);
        }
      });
    } else {
      res.status(400).json("Email does not exist");
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const newpassword = async (req,res)=>{
    const {id,token} = req.params;
    const {data} = req.body;
    console.log(data)
    jwt.verify(token,"process.env.JWT_SEC",(err,decoded)=>{
      if(err){
        console.log('invalidtoken')
        res.status(400).json('Token invalid')
      }
    })
    try{

       const newpassword =""+CryptoJS.AES.encrypt(data.password,process.env.PASS_KEY);
       const updatepassword = await admin.findByIdAndUpdate({_id:id},{password:newpassword});
      res.json(updatepassword);
    }catch(error){
      console.log('error')
      res.status(500);
      res.json(error);
    }

}

const getfilter = async (req,res)=>{
  const {type} = req.params;
  try{
    if(type == 'nameaz'){
      const getfilterdata = await vehichle.find({}).sort({name:1})
      res.json(getfilterdata)
    }else if(type == 'nameza'){
      const getfilterdata = await vehichle.find({}).sort({name:-1})
      res.json(getfilterdata)
    }else if(type =='pricelow'){
      const getfilterdata = await vehichle.find({}).sort({price:1})
      res.json(getfilterdata)
    }else if(type == 'pricehigh'){
      const getfilterdata = await vehichle.find({}).sort({price:-1})
      res.json(getfilterdata)
    }
    
  }catch(error){
    res.status(500).json(error)
  }
}

const getsearch =async(req,res)=>{
  const {val} = req.params;
  try{
    let searchresult = await vehichle.find({"name":{$regex:'^'+val}})
    console.log(searchresult)
    res.json(searchresult)
  }catch(error){
    res.status(500).json(error)
  }
}

const updatevehichle = async (req,res)=>{
  console.log(req.params.id)
  const {
    name,
    description,
    manufactur,
    model,
    price,
    qty,
    image1,
    image2,
    image3,
    image4,
  }=req.body;

  const response1 = image1.startsWith('data') && await cloudinary.uploader.upload(image1);
  const response2 = image2.startsWith('data') && await cloudinary.uploader.upload(image2);
  const response3 = image3.startsWith('data') && await cloudinary.uploader.upload(image3);
  const response4 = image4.startsWith('data') && await cloudinary.uploader.upload(image4);
  try{
    const updatevehichle =({
     name,
     description,
     manufactur,
     model,
     price,
     qty,
     image1: response1 === false ? image1 : response1.secure_url,
     image2: response2 === false ? image2 : response2.secure_url,
     image3: response3 === false ? image3 : response3.secure_url,
     image4: response4 === false ? image4 : response4.secure_url
   });

   const updatedvehichle = await vehichle.findByIdAndUpdate({_id:req.params.id},updatevehichle)
    res.json(updatedvehichle);
  }catch (errror) {
    res.status(500);
    res.json(errror);
  }
}


export {
  addvehichle,
  getallvehichle,
  deletevehichle,
  getonevehichle,
  signin,
  checkmail,
  newpassword,
  getfilter,
  getsearch,
  updatevehichle
};
