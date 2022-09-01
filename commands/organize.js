const fs = require('fs')

const path = require('path')


let types = {
    media: ["mp4", "mkv", "mp3", "jpg"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};


function organizeFn(dirpath) {
    let destPath
    if (dirpath == undefined) {
        console.log(`please enter a valid directory path`)
        return;
    }
    else {
        let doesExist = fs.existsSync(dirpath)

        if (doesExist == true) {
            destPath = path.join(dirpath, 'organize file')


            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath)
            }
            else {
                console.log(`Folder already exists`)
            }
        }
        else {
            console.log(`Please enter a valid path`)
        }
    }

    organizeHelper(dirpath, destPath)

}

function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src)
    //console.log(childNames)

    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i])
        let checkForFiles = fs.lstatSync(childAddress).isFile()
        // console.log(childAddress + " " + checkForFiles)

        if (checkForFiles == true) {
            let fileCategory = getCategory(childNames[i])
            console.log(childNames[i] + " belongs to " + fileCategory)
            sendFiles(childAddress, dest, fileCategory)
        }
    }

}

function getCategory(fileName) {
    let ext = path.extname(fileName)
    ext = ext.slice(1)
    console.log(ext)

    for (let type in types) {
        let cTypeArr = types[type]

        for (let i = 0; i < cTypeArr.length; i++) {
            if (ext == cTypeArr[i]) {
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcFilePath, dest, fileCategory) {
    let catPath = path.join(dest, fileCategory)

    if (fs.existsSync(catPath) == false) {
        fs.mkdirSync(catPath)
    }

    let fileName = path.basename(srcFilePath)
    let destPath = path.join(catPath, fileName)

    fs.copyFileSync(srcFilePath, destPath)

    fs.unlinkSync(srcFilePath)
    console.log(fileName + ` Copied to ` + fileCategory)
}


module.exports = {
    organizeFnkey: organizeFn           //we are mainly expoting the main function in module
}