const { readdir, readFile, writeFile } = require('fs/promises');
const { resolve } = require('path');

const POSTS_DIR = resolve(__dirname, 'public', 'data');
const INDEX_DIR = resolve(__dirname, 'src', 'data');
const COLOR_RED = "\x1b[31m";
const COLOR_GREEN = "\x1b[32m";

function validatePost(data, name) {

  let e = [];
  const { created, tags, content } = data;

  try {

    if (!created) {
      e.push('Created is missing');
    }
    else if (!(new Date(created)).getTime() > 0) {
      e.push('Created is not a number');
    }

    if (!tags) {
      e.push('Tags is missing');
    }
    else if (!Array.isArray(tags)) {
      e.push('Tags must be an array')
    }
    else if (tags.some(tag => typeof tag !== 'string')) {
      e.push('Tags must be an array of strings');
    }

    if (!content) {
      e.push('Content is missing')
    }
    else if (!Array.isArray(content)) {
      e.push('Content must be an array')
    }
    else if (content.some(p => typeof p !== 'string')) {
      e.push('Content must be an array of strings');
    }
    
    if (e.length) throw new Error(e.join(',\n'));
    return true;
    
  } catch (e) {
    console.log(COLOR_RED, `Post validation error in ${name}\n ${e}`)
  }
}

const main = async () => {
  try {
    const files = await readdir(POSTS_DIR, { withFileTypes: true });

    const promises = files.reduce((acc, file) => {
      if (file.isDirectory()) return acc;

      const filePath = resolve(POSTS_DIR, file.name)
      return [...acc, readFile(filePath).then(cnt => ({ cnt, name: file.name }))];
    }, [])

    const filesContent = await Promise.all(promises);
   
    const indexContent = filesContent.map(({ cnt, name }) => {
      const json = JSON.parse(cnt.toString());

      if (validatePost(json, name)) {
        return { i: json.created, t: json.tags }
      };

      return null;
    })

    indexContent.sort((a, b) => b.i - a.i);

    await writeFile(resolve(INDEX_DIR, 'posts-index.json'), JSON.stringify(indexContent));
    console.log(COLOR_GREEN, "posts index.json has been generated")

  } catch (error) {
    console.log(COLOR_RED, `oops! something went wrong\n ${error}`)
  }
};

main();