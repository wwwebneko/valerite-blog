export async function loadFiles(filesPaths) {

  if (!Array.isArray(filesPaths) && !filesPaths.length) {
    return [];
  }

  const promises = filesPaths.map(path => loadFile(path));
  return await Promise.all(promises);
}

async function loadFile(filePath) {
  try {
    const response =  await fetch(filePath, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    return await response.json()
    
  } catch (error) {
    throw new Error(error)
  }
}