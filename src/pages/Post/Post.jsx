import React from 'react';

import { useParams } from 'react-router-dom';

import { useFetchDocument } from '../../hooks/useFetchDocument';

import styles from './Post.module.css';


function Post() {

  const { id } = useParams();
  const {document: post, loading} = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {loading && <p>Loading post...</p>}
      {post && (
        <div>
          <h1>{post.title}</h1>
          <h4>by {post.createdBy}</h4>
          <img src={post.image} alt={post.title}></img>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  )
}

export default Post;
