const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload =require("../utils/multer");
const User = require("../model/user");
const axios = require('axios');




router.post("/", upload.single("image"), async(req, res) =>{
    try{

        const response = await axios.get("https://fake-json-api.mock.beeceptor.com/users");
        const users = response.data;

        // 将数据批量保存到 MongoDB
        await User.insertMany(users);
        res.status(201).json({ message: "Users imported successfully!" });
        
        const result = await cloudinary.uploader.upload(req.file.path);
        let user = new User({
            name: req.body.name,
            avatar: result.secure_url,
            company: req.body.company,
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            zip: req.body.zip,
            state: req.body.state,
            country: req.body.country,
            phone: req.body.phone,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,  
        });
        await user.save();
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

router.get("/", async(req, res) => {
    try{
        let user = await User.find();
        res.json(user); 
    }
    catch(err){
        console.log(err);
    }
});

router.delete("/:id", async(req, res) => {
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        await cloudinary.uploader.destroy(user.cloudinary_id);
        await user.deleteOne();
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});
router.get('/fake-api-users', async (req, res) => {
    try {
      const response = await axios.get('https://fake-json-api.mock.beeceptor.com/users');
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error fetching from fake API');
    }
  });

router.put("/:id", upload.single("image"),async(req, res) => {
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success: false, message:"User not found"});
        }
        await cloudinary.uploader.destroy(user.cloudinary_id);
        let result;
        if(req.file){
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const data = {
            name: req.body.name || user.name,
            avatar: result?.secure_url || user.avatar,
            company: req.body.company || user.company,
            username: req.body.username || user.username,
            email: req.body.email || user.email,
            address: req.body.address || user.address,
            zip: req.body.zip || user.zip,
            state: req.body.state || user.state,
            country: req.body.country || user.country,
            phone: req.body.phone || user.phone,
            avatar: result?.secure_url || user.avatar,
            cloudinary_id: result?.public_id || user.cloudinary_id, 
        };
        user = await User.findByIdAndUpdate(req.params.id, data, {new: true});
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

router.get("/:id", async(req, res) => {
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;