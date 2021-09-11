const bcrypt = require('bcrypt');

const saltRounds = 10;

function encrypt(text) {
 	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(text, salt);
	return hash;
}
function verifyPassword(password,hash) {
        const text = bcrypt.compareSync(password,hash);
        return text;
    }

module.exports = {
    encrypt,
    verifyPassword
};

