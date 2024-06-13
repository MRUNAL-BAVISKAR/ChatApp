const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main().then(()=>{
    console.log("Connection Succesful")
})
.catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ChatApp');
}

let allChats = [
    {
        from: "Rohit Sharma",
        to: "Virat Kohli",
        msg: "Hey Virat, great innings yesterday!",
        created_at: new Date(),
    },
    {
        from: "Virat Kohli",
        to: "Ravi Jadeja",
        msg: "Thanks, Ravi! Your fielding was top-notch.",
        created_at: new Date(),
    },
    {
        from: "Ravi Jadeja",
        to: "Sanju Samson",
        msg: "Hi Sanju, are you ready for the next match?",
        created_at: new Date(),
    },
    {
        from: "Sanju Samson",
        to: "Jasprit Bumrah",
        msg: "Hey Jasprit, any tips for bowling at the death?",
        created_at: new Date(),
    },
    {
        from: "Jasprit Bumrah",
        to: "AB de Villiers",
        msg: "Hi AB, your batting is always a challenge to bowl to!",
        created_at: new Date(),
    },
    {
        from: "AB de Villiers",
        to: "MS Dhoni",
        msg: "Hey MS, loved your captaincy in the last match.",
        created_at: new Date(),
    },
    {
        from: "MS Dhoni",
        to: "Rohit Sharma",
        msg: "Thanks, Rohit! Looking forward to your century in the next game.",
        created_at: new Date(),
    },
    {
        from: "Rohit Sharma",
        to: "Virat Kohli",
        msg: "Virat, any plans for team strategy against Australia?",
        created_at: new Date(),
    },
    {
        from: "Virat Kohli",
        to: "Ravi Jadeja",
        msg: "Ravi, we need to focus on our spin attack for the next series.",
        created_at: new Date(),
    },
    {
        from: "Ravi Jadeja",
        to: "Sanju Samson",
        msg: "Sanju, your wicketkeeping has improved a lot!",
        created_at: new Date(),
    },
];


Chat.insertMany(allChats);