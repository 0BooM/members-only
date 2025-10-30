const db = require("../db/messagesQueries");

exports.getCreateMessageForm = (req, res) => {
    try {
        res.render("createMessageForm");
    } catch (error) {
        res.status(500).send("Error fetching message  creation form");
    }
}

exports.postCreateMessageForm = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.params.id;
        await db.createMessage(title, content, userId);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error creating a new message!");
    }
}