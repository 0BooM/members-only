const pool = require("./pool");

exports.getMessages = async () => {
  const { rows } = await pool.query(
    `SELECT m.id,
                        m.title,
                        m.content,
                        m.author,
                        TO_CHAR(m.date, 'DD.MM.YYYY') || ' ' || TO_CHAR(m.date, 'HH24:MI') AS formatted_date,
                        u.username AS author
         FROM messages m
         JOIN users u ON u.id = m.author
         ORDER BY m.id DESC`
  );

  return rows;
};

exports.createMessage = async (title, content, userId) => {
  await pool.query(
    `INSERT INTO messages (title, content, author) VALUES ($1, $2, $3)`,
    [title, content, userId]
  );
};
