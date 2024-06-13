const express = require('express');
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


// Code ---> Mongoose Connection with server 
main().then(()=>{
    console.log("Connection Succesful")
})
.catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ChatApp');
}

//date is set in utc 
//created_at: 2024-06-12T08:41:16.415Z, The meaning of z is date is set in UTC
// Connection Succesful
// {
//   from: 'neha',
//   to: 'priya',
//   created_at: 2024-06-12T08:41:16.415Z,
//   _id: new ObjectId('66695f2c29f9b99ad391f72c'),
//   __v: 0
// }

//Index Route 
app.get("/chats", async (req, res)=>{
let chats = await Chat.find();
res.render("index.ejs", {chats});
});

//New Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//Create Route 
app.post("/chats", (req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });

    newChat.save().then((res)=>{
        console.log("Chat was Saved");
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

//Edit Route 

app.get("/chats/:id/edit",async (req,res)=>{
    let{id} = req.params;
   let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//Update Route 
// app.put("/chats/:id",async (req,res)=>{
//     let {id} = req.params;
//     let {msg: newMsg} = req.body;
//     let updatedChat = await Chat.findByIdAndUpdate(id,{msg: newMsg},
//         {runValidators: true, new:true}
//     );
//     console.log(updatedChat);
//     res.redirect("/chats");
//});
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;

    // Trim the id to remove any leading or trailing spaces
    id = id.trim();

    try {
        let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, {
            runValidators: true,
            new: true
        });
        console.log(updatedChat);
        res.redirect("/chats");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while updating the chat");
    }
});


//Delete Route
app.delete("/chats/:id", async(req,res)=>{
    let{id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get('/', (req, res) => {
  res.send('hello world')
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });