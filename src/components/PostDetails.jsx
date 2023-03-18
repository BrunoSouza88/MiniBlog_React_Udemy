import React from 'react';
import { Link } from 'react-router-dom';

import styles from './PostDetails.module.css';

function PostDetails({ post }) {
  return (
    <div className={styles.post_detail}>
      <h3>{ post.title }</h3>
      <img src={ post.image } alt={ post.title } />
      <p>{ post.body }</p>
      <p>by { post.createdBy }</p>
      <div>
        {post.tagsArray.map((tag, index) => (
          <p key={ index }><span>#</span>{ tag }</p>
        ))}
      </div>
      <Link className="btn btn-outline" to={`/posts/${post.id}`}>Ler</Link>
    </div>
  )
}

export default PostDetails;
