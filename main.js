// File reader configs
const fs = require("fs");
const path = require("path");

//csv reader configs
const { parse } = require("csv-parse");

//MariaDB config
const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "idk",
    database: "testew",
})

function deleteFile(filename) {
    fs.unlinkSync("C:/uploadcsv/" + filename);
    console.log("Deleted file: " + filename);
}

function addCsvToDB(filename) {
    var counter = 0;
    console.log("Processing: " + filename)
    fs.createReadStream("C:/uploadcsv/" + filename)
        .pipe(
            parse({
            delimiter: ";",
            columns: true,
            relax_quotes: true,
            quote: '"',
        })
    )
    .on("data", function (row) {
        pool.query(
        "INSERT INTO dados(nome, ddd, fone, email) VALUES ('" + 
        row["name"] + "' , " + 
        row["phone1_ddd"] + ", " +
        row["phone1"] + ", '" +
        row["email"] + "'" +
        ")")

        counter++;

    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      console.log(filename + " added " + counter + " rows to the database");
      deleteFile(filename);
    })
}

setInterval(() => {
    if(!fs.existsSync("C:/uploadcsv")) {fs.mkdirSync("C:/uploadcsv")}
    console.log("searching for csv");
    const csvresults = fs.readdirSync(path.resolve("C:/uploadcsv"));
    csvresults.forEach(addCsvToDB);
}, 5000);

