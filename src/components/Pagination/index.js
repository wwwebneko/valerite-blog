import React, { useEffect, useState } from 'react';
import { loadFiles } from '../../actions/file';
import index from '../../data/posts-index.json';
import Post from '../Post';

const POST_DIRECTORY = '/data';

export default function Pagination() {

  const [posts, setPosts] = useState([]);
  const [pagStart, setPagStart] = useState(0);

  const PAG_OFFSET = 2;
  const isAllLoaded = index.length === posts.length;

  useEffect(() => {

    async function getPosts() {
      const posts = index.slice(pagStart, pagStart + PAG_OFFSET);
      const filePaths = posts.map(file => `${POST_DIRECTORY}/${file.i}.json` )
     
      return await loadFiles(filePaths);
    }

    if (!isAllLoaded) {
       getPosts()
        .then(newPosts => {
          setPosts(posts => [...posts, ...newPosts])
        })
    }
  }, [pagStart, isAllLoaded])

  function onLoadMoreClick() {
    setPagStart(pagStart => pagStart + PAG_OFFSET)
  }

  function renderPosts() {
    return posts.map(post => <Post key={post.created} { ...post } />)
  }

  return (
    <div>
      {renderPosts()}
      { !isAllLoaded && <button onClick={onLoadMoreClick}>Load More</button> }
    </div>
  )
}
