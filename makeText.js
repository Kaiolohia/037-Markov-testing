/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function genText(data) {
    let MM = new markov.MarkovMachine(data);
    console.log(MM.makeText());
}

function readFile(path) {
    try {
        let data = fs.readFileSync(path, 'utf-8')

        return genText(data)
    } catch (err) {
        console.log("Error reading file");
        console.log(err);
        process.exit(1);
    }
}

async function readPage(url) {
    try {
        res = await axios.get(url)
        return genText(res.data)
    }
    catch(err) {
        console.log("Error: URL Not found")
        process.exit(1);
    }
}

const argv = process.argv

if ( argv[2] == "file" ) {
    readFile(argv[3])
} else if ( argv[2] == "url" ) {
    readPage(argv[3])
} else {
    console.log(`Error! Invalid method: ${argv[2]}\nPlease use "file" or "url"`)
    process.exit(1)
}