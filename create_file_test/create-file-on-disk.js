// FirstProgram from Visual Studio Code

const now = new Date().toLocaleString();

console.log(now);
console.log(Math.random());

const fs = require("fs"); //file system

const data = `
    Node JS created file
    ...
`;

const fileName = "nodejs-created-file.txt";

fs.writeFileSync(fileName, data);
const readingResult = fs.readFileSync(fileName, { encoding: "utf-8" });
console.log(readingResult);
console.log(__dirname);
console.log(__filename);
