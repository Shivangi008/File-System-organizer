// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extensions
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders






//take input
//let input = process.argv[2]
//console.log(input)

//let firstNumber=process.argv[2]
//let secondNumber=process.argv[3]
//console.log(Number(firstNumber )+Number( secondNumber))
const fs = require("fs");
const path = require("path");
const { getEnabledCategories } = require("trace_events");

let inputArr=process.argv.slice(2)

let types = {
    media: ["mp4", "mkv", "mp3","jpg"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
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
//console.log(inputArr)

let command=inputArr[0]

switch(command){
    case "tree":
        console.log("Tree command will be Execute")
        break;
        case "organize":
            organizefn(inputArr[1])//passes dirpath
            break;
            case "help":
            console.log(`List of all commands-
            1)Tree command - node FO.js tree<dirPath>
            2)Organize command- node FO.js organize<dirname>
            3)Help command-node FO.js help `);
           
            break;
            default:
                console.log("Enter a valid command");
                break;
}

function organizefn(dirpath){
    let destpath;
    if(dirpath == undefined){
        console.log("Please enter a valid Directory Path")//check whether folder path is given or not
        return;
    }else{
        
        let doesExist=fs.existsSync(dirpath);//here we are checking the folder path exists or not
        if(doesExist == true){
            destpath=path.join(dirpath,"organizedfiles");
            //so first i will have to make a path for a folder
        }

        if(fs.existsSync(destpath)== false){
            fs.mkdirSync(destpath)
        }
        else{
            console.log("Folder already exists")
        }
    }
    else{ 
        console.log("Please enter a valid path")
    }
}

organizerHelper(dirpath);
}
function organizerHelper(src,dest){
    let childNames=fs.readdirSync(src);
    console.log(childNames);


    for(let i=0;i< childNames.length;i++){
        let childAddress=path.join(src,childNames[i]);
        let checkForFile=fs.lstatSync(childAddress).isFile();


        if(checkForFile==true){
            let fileCategory=getCategory(childNames[i]);
            console.log(childNames[i] +"belongs to"+fileCategory)
        }
    }
}
function getCategory(fileName){
    let ext=path.extname(fileName)
    ext=ext.slice(1)
    console.log(ext)



    for(let type in types){
        let cTypeArr= types[type]

        for(let i=0;i<cTypeArr.length;i++){
            if(ext == cTypeArr[i]){
                return type;
            }
        }
    }
    return "others";
}
