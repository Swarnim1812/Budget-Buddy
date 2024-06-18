const { phone_number } = require("../controller/auth");

function containsOnlyDigits(phone_number) {
    return /^\d+$/.test(phone_number);
}

module.exports = {
    containsOnlyDigits
  };