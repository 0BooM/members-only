const db = require("../db/messagesQueries");

exports.getMessages = async (req, res) => {
    try {
        const messages = await db.getMessages();
        res.render("index", {messages});
    } catch (error) {
        res.status(500).send("Error fetching messages");
    }
}