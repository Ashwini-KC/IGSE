const {createHash} = require("crypto")

module.exports = (string) => {
    return createHash('sha256').update(string).digest('hex');
}