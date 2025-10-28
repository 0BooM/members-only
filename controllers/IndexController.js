const db = require("../db/messagesQueries");
const userDB = require("../db/userQueries");
exports.getMessages = async (req, res) => {
    try {
        const messages = await db.getMessages();
        res.render("index", {messages});
    } catch (error) {
        res.status(500).send("Error fetching messages");
    }
}

exports.becomeMember = async (req, res) => {
    try{
        const id = req.params.id;
        await userDB.updateMembership(id);
        res.redirect("/");
    } catch (error){
        res.status(500).send("Error becoming a member");
    }
}