// We will be creating a File System Oraganizer//
//Features of the Projects - 
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text file will go into text File Folder .exe files go into application folder and so on
// so at the end you will have a arranged set of files in specific folders

const organizeWaaliFile = require('./commands/organize')    //we are importing the file
const helpModule = require('./commands/help')
const treeModule = require('./commands/tree')
let inputArr = process.argv.slice(2)
//console.log(inputArr)



let command = inputArr[0]

switch (command) {
    case "tree":
        treeModule.treeFnKey(inputArr[1]);
        break;

    case "organize":
        organizeWaaliFile.organizeFnkey(inputArr[1]);    // import from the organizeFnkey  
        break;

    case "help":
        helpModule.helpFnkey()
        break;

    default:
        console.log("Enter a valid Command");
        break;


}


