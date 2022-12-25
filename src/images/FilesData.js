const files_data = {};


/*
** FOLDER STRUCTURE EXAMPLE **

..
    images/
        Ceramics/
            img1.jpg    // in array files_data["Ceramics"]
            img2.jpg    // ''
            ...         // ''
        Fencing/
            captions.txt
            img1.jpg
            img2.jpg
    Ceramics.jpg    // name needs to match images/Ceramics
                    // in array files_data.interestProfileImgs
    Fencing.jpg     // ''
                    // ''

    FilesData.js    // this file
    interests_about.txt     // --> files_data.about_file = "interests_about.txt"
*/

files_data.about_file = "interests_about.txt"

files_data.interestProfileImgs = [

    "Ceramics.JPG",
    "Fencing.png"

];

files_data["Ceramics"] = [

    "IMG_0959.JPG",
    "IMG_0975.JPG",
    "IMG_0977.JPG",
    "IMG_1187.JPG",
    "IMG_1190.JPG",
    "IMG_1194.jpg",
    "IMG_1200.JPG",
    "IMG_1216.JPG",
    "IMG_1224.JPG"

]
files_data["Fencing"] = [

    "captions.txt",
    "fencing1.png",
    "fencing2.png",
    "fencing3.png",
    "fencing4.png"

]









// **** FOLLOWING ATTRIBUTES ARE INDEPENDENT OF EXISTING FILES *****


files_data.get_captions = async (folder) => {
    for (let i = 0; i < files_data[folder].length; i++) {
        let file_name = files_data[folder][i];
        if (file_name.indexOf(".txt") !== -1) {
            let file = require("./" + folder + "/" + file_name);
            return fetch(file)
                    .then(r => r.text())
                    .then(text => {
                        const parts = text.split("\n\n");
                        const obj = {};
                        for (let i = 0; i < parts.length; i++) {
                            const lineEnd = parts[i].indexOf("\n");
                            // empty line
                            if (lineEnd === -1) continue;
                            obj[parts[i].substring(0, lineEnd)] = parts[i].substring(lineEnd + 1);
                        }
                        return copy_images(files_data[folder]).map( (file) => {
                            return obj[file];
                        });
                    });
        }
    }
    return undefined;
}
files_data.get_images = (folder) => {
    return copy_images(files_data[folder]).map( (file) => {
        return require("./" + folder + "/" + file);
    });
}

files_data.headers = files_data.interestProfileImgs.map(
        (file_name) => {
            return file_name.substring(0, file_name.indexOf("."));
        }
    );

files_data.about = async () => {
    let about_file = require("./" + files_data.about_file);
    return fetch(about_file)
               .then(r => r.text())
               .then(text => {
                   const parts = text.split("\n\n");
                   const obj = {};
                   for (let i = 0; i < parts.length; i++) {
                       const subParts = parts[i].split("\n");
                       obj[subParts.shift()] = subParts;
                   }
                   return obj;
               })
}

const copy_images = (arr) => {
    const new_arr = [];
    for (let i = 0; i < arr.length; i++) {
        let el = arr[i];
        if (el.indexOf(".txt") === -1 && el.indexOf(".md") === -1) {
            new_arr.push(el);
        }
    }
    return new_arr;
}

export default files_data;