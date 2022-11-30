const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const fs = require('fs');

const IMAGES_PATH = '../client/src/images/'

/*
path: path to file to be read
match: [Strings] to be cross referenced to see if should be included
*/
const fileToDict = (path, match) => {
    let fileData = fs.readFileSync(path, 'utf-8');
    fileData = fileData.trim(); // get ride of whitespace at start/end
    
    const splitData = fileData.split("\n\n");
    var dataDict = {};

    // iterate through each section
    for (let i = 0; i < splitData.length; i++){
        const newLineIndex = splitData[i].indexOf("\n");
        if(newLineIndex === -1) continue;

        // before new line is key, after is data
        const key = splitData[i].substring(0, newLineIndex);
        if (match.includes(key))
            dataDict[key] = splitData[i].substring(newLineIndex + 1);
    }
    return dataDict;
}

/**
 * looks into specified folder of imgs (eg '/images/Fencing')
 * and returns the images inside and captions in the text file
 * if there is one
 * 
 * returns {images:[Strings], captions:{"egImg.png":"caption", ...}}
 */
app.get('/images/:folder', async (req, res) => {
    // data: files in specified folder
    const data = await fs.promises.readdir(IMAGES_PATH + req.params.folder);
    if(data[0] === '.DS_Store') data.shift();
    
    // look for text file to use for captions
    for(let i = 0; i < data.length; i++){
        if (data[i].indexOf('.txt') !== -1) {
            const textFile = data[i];
            data.splice(i, 1); // separate from image files

            const captionsDict = fileToDict(IMAGES_PATH + req.params.folder + "/" + textFile, data);
            res.send(JSON.stringify({
                images:data,
                captions:captionsDict
            }));
            return;
        }
    }

    // no text file found, just return image names
    res.send(JSON.stringify({
        images:data
    }));
});

/**
 * looks at what folders are in images folder and tries to find
 * images in the images folder that correspond to each folder found
 * 
 * returns {
 *   headers:[Strings],
 *   about: {[Strings]} eg {header1:['h1', 'info']}
 *   profileImgs:[Strings]
 * }
 */
app.get('/interests', async (req, res) => {
    // data: all files in image folder
    const data = await fs.promises.readdir(IMAGES_PATH);
    if(data[0] === '.DS_Store') data.shift();
    var headers = [];   // interest titles (strings), folders in images
    var profiles = [];  // image names
    var nonDirectories = [];

    // accumulate all folders
    for(let i = 0; i < data.length; i++){
        if (fs.statSync(IMAGES_PATH + data[i]).isDirectory()){
            headers.push(data[i]);
            profiles.push(undefined);
        } else {
            nonDirectories.push(data[i]);
        }
    }

    // of nondirectories, check for matches
    var infoDict;
    for (let i = 0; i < nonDirectories.length; i++){
        let fileName = nonDirectories[i];

        const dotIndex = fileName.indexOf('.');
        if (dotIndex !== -1 &&
            fileName.substring(dotIndex) === '.txt' &&
            fileName.substring(0, dotIndex).toLowerCase() !== 'readme') {

            infoDict = fileToDict(IMAGES_PATH + fileName, headers);
            for (const key in infoDict) {
                infoDict[key] = infoDict[key].split('\n');
            }
            continue;
        }

        // remove extension
        if (dotIndex !== -1) fileName = fileName.substring(0, dotIndex);

        // add to index correspoonding to title (repeats --> override)
        for (let j = 0; j < headers.length; j++){
            if (fileName.toLowerCase() === headers[j].toLowerCase()){
                profiles[j] = nonDirectories[i];
            }
        }
    }
    res.send(JSON.stringify({
        headers:headers,
        about:infoDict,
        profileImgs:profiles
    }))
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
});













/*
app.get('/test', (req, res) => {
    res.json({ message: "test"});
});
*/