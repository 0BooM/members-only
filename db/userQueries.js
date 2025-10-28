const pool = require("./pool");

exports.updateMembership = async (id) => {
    await pool.query(`UPDATE users SET membership = true WHERE id=$1`, [id]);
}