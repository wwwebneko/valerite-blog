const { readdir, readFile, writeFile } = require('fs/promises');
const { resolve } = require('path');

const POSTS_DIR = resolve(__dirname, 'src', 'data');

const main = async () => {
  const files = await readdir(POSTS_DIR, { withFileTypes: true });

  const promises = files.reduce((acc, file) => {
    if (file.isDirectory() || file.name === 'index.json') return acc;

    const filePath = resolve(POSTS_DIR, file.name)
    return [...acc, readFile(filePath)];
  }, [])

  const filesContent = await Promise.all(promises);
  const indexContent =  filesContent.map((cnt) => {
    const json = JSON.parse(cnt.toString());
    return { id: json.id, tags: json.tags };
  })

  await writeFile(resolve(POSTS_DIR, 'index.json'), JSON.stringify(indexContent));
  return 'done';


};

main().then(console.log).catch(console.error)