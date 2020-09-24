const chalk = require("chalk")
const moment = require("moment")
require("dotenv").config()

console.log(chalk.red("test"))

var hari = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log(hari)
console.log(process.env.DB_USER)