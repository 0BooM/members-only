const db = require("../db/messagesQueries");
const userDB = require("../db/userQueries");
require('dotenv').config();

exports.getMessages = async (req, res) => {
    try {
        const messages = await db.getMessages();
        res.render("index", {messages});
    } catch (error) {
        res.status(500).send("Error fetching messages");
    }
}


exports.getBecomeMember = async (req, res) => {
    try {
        res.render("becomeMemberForm");
    } catch (error) {
        res.status(500).send("Error fetching member form");
    }
}
exports.postBecomeMember = async (req, res) => {
    try{
        const id = req.params.id;
        const { code } = req.body;
        if (code === process.env.MEMBER_CODE) {
            await userDB.updateMembership(id);
        }
        res.redirect("/");
    } catch (error){
        res.status(500).send("Error becoming a member");
    }
}

exports.getAdminForm = (req, res) => {
    res.render("adminForm");
}

exports.postAdminForm = async (req, res) => {
    try {
        const id = req.params.id;
        const { code } = req.body;
        if (code == process.env.ADMIN_CODE);
            await userDB.becomeAdmin(id);
        res.redirect("/")
    } catch (error) {
        res.status(500).send("Error becoming an admin");
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        const id = req.params.id
        await db.deleteMessage(id);
        res.redirect("/");
    } catch (error) {
        res.status(404).send("This message doesn't exist.");
    }
}