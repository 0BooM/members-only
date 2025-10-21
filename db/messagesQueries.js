const pool = require("./pool");

exports.getMessages = async () => {
  const { rows } = await pool.query(
    `SELECT m.id,
                        m.title,
                        m.content,
                        m.author,
                        u.username AS author
         FROM messages m
         JOIN users u ON u.id = m.author
         ORDER BY m.id DESC`
  );

  return rows;
};