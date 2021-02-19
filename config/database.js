
var mysql = require("mysql");

var db;


function connectDatabase() {
  if (!db) {
    db = mysql.createConnection({
    port:process.env.DB_PORT,
    host:process.env.HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
      database:process.env.DATABASE,
     
    });
    
    db.connect(function(err) {
      console.log(err);
      if (!err) {
        console.log("Database is connected!");
      } else {
        console.log("Error connecting database!");
        
      }
    });
  }
  return db;
}

module.exports = connectDatabase();
