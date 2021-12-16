const bcrypt = require("bcrypt")

const HashSync = async (password) => {
    const salt = await bcrypt.genSaltSync(10, "a");
    return bcrypt.hashSync(password, salt);
};

module.exports = {HashSync}