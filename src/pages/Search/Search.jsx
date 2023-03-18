import React from 'react';

import styles from './Search.module.css';

import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import PostDetails from '../../components/PostDetails';
import { Link } from 'react-router-dom';

function Search() {

  const query = useQuery();
  const search = query.get("specQuery");

  const {documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={ styles.search_container }>
      <h1>Search</h1>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Your search has no results</p>
            <Link to="/" className="btn btn-dark">Back</Link>
          </div>
        )}
        {posts && posts.map((post) => (
          <PostDetails key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Search;
