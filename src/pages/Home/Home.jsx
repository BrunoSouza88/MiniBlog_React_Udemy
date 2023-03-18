import React, {useState} from 'react';
// import Loading from '../../components/Loading';

import { useNavigate, Link } from 'react-router-dom';
import PostDetails from '../../components/PostDetails';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

import styles from './Home.module.css';


function Home() {

  const [query, setQuery] = useState('');
  const {documents: posts, loading } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(query) {
      return navigate(`/search?specQuery=${query}`);
    }
  };
  
  return (
    <div className={styles.home}>
      <h1>Welcome</h1>
      <form onSubmit={ handleSubmit } className={ styles.search_form }>
        <input type="text" placeholder="Search by tags" onChange={(event) => setQuery(event.target.value)} />
        <button className="btn btn-dark">Search</button>
      </form>
      <div>
        <h2>Posts</h2>
        {loading && <p>Loading... </p>}
        {posts && posts.map((post, index) => 
          <PostDetails key={ index } post={ post } />
        )}
        {posts && posts.length === 0 && (
          <div className={ styles.noposts }>
            <p>There is no posts</p>
            <Link to="/posts/create" className="btn">First Post</Link>
          </div>
        )}
      </div>
    </div>
  )
};

export default Home;
