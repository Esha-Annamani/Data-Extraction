const { readAndExtractData } = require("./ReadAndExtractData");

const fileNames = ["./files/textfile.txt", "./files/jsondata.json"]
fileNames.forEach(fileName => readAndExtractData(fileName))