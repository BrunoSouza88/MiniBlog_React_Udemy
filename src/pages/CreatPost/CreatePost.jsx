import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';

import React from 'react';
import { useInsertDocument } from '../../hooks/useInsertDocumentos';

function CreatePost() {

  const [image, setImage] = useState(''); 
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [formError, setFormError] = useState('');
  const [tags, setTags] = useState([]);

  const { user } = useAuthValue();
 
  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError('');

    // validate image url
    try {
      new URL (image);
    } catch (error) {
      setFormError("Image needs to be an URL.")
    }

    // create tags array

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    // check all values
    if (!title || !image || !tags) {
      setFormError("Plese fill all the fields.")
    }
    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");
  }

  return (
    <div className={ styles.create_post }>
      <h1>Create Post</h1>
      <p>Tell your history</p>
      <form onSubmit={ handleSubmit }>
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="title"
            placeholder="Insert your title"
            value={ title }
            required
            onChange={ (event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          <span>Image URL:</span>
          <input
            type="text"
            name="image"
            placeholder="Insert your image URL"
            value={ image }
            required
            onChange={ (event) => setImage(event.target.value)}
          />
        </label>
        <label>
          <span>Desciption:</span>
          <textarea
            name="body"
            placeholder="Insert your desciption"
            value={ body }
            required
            onChange={ (event) => setBody(event.target.value)}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            placeholder="Insert tags separeted by commas"
            value={ tags }
            required
            onChange={ (event) => setTags(event.target.value)}
          />
        </label>
        {!response.loading && <button className="btn">Post</button>}
        {response.loading && (
          <button className="btn">
            Wait...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost;
