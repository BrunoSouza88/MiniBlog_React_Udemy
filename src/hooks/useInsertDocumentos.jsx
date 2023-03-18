import { useEffect, useState, useReducer } from 'react';

import { db } from '../firebase/config';

import { collection, addDoc, Timestamp } from 'firebase/firestore';
// collection in firebase is not table
// addDoc faz a inserção do documento no banco
// timestamp faz a marcação do tempo

const INITIAL_STATE = {
  loading: null,
  error: null,
}

const insertReduce = (state, action) => {
  switch(action.type) {
    case "LOADING":
      return {loading: true, error: null};
    case "INSERTED_DOC":
      return {loading: false, error: null};
    case "ERROR":
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReduce, INITIAL_STATE);

  // deal memory leak

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  }

  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    })

    try {

      const newDocument = { ...document, createdAt: Timestamp.now() }

      const insertedDocument = await addDoc(
        collection(db, docCollection), newDocument
      )

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      }
      )

    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      })
    }
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, [])

  return {insertDocument, response}
}