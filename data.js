const fs = require('fs/promise');
const path = require('path');
const POSTS_FOLDER_PATH = path.resolve(__dirname, 'src', 'data');

const indexJSON = [];

function readJSONFile(file) {
  if (file.isDirectory() || file.name === 'index.json') return;

  const filePath = path.resolve(POSTS_FOLDER_PATH, file.name);

  fs.readFile(filePath, (err, data) => {
    fillIndexJSON(data);
  })
}

function fillIndexJSON(data) {
  const dataObj = JSON.parse(data.toString());

  if (isJSONFileValid(dataObj)) {
    indexJSON.push({ id: dataObj.id })
    
  } else {
    throw new Error('time stamp is not valid')
  }
}

function isJSONFileValid(data) {
  if (data.id) {
    return (new Date(data.id)).getTime() > 0
  }
}

fs.readdir(POSTS_FOLDER_PATH, { withFileTypes: true }, (err, files) => {
  files.forEach(readJSONFile);
  console.log(indexJSON)
});



//fs.writeFileSync.