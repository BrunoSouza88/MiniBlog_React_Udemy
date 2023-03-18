// Import of CSS
import './App.css';

// Import React-Router-Dom
import { Routes, Route, Navigate } from 'react-router-dom';

// Import from Firebase
import { onAuthStateChanged } from 'firebase/auth'; // map if auth is ok

// import Hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/userAuthentication';

// Import Provider
import { AuthProvider } from './context/AuthContext';

// Import of Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './NotFound/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/CreatPost/CreatePost';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from "./pages/EditPost/EditPost";

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
   }, [auth]);

  if(loadingUser) {
    return <p>Loading...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={ <Home />}/>
            <Route path="/about" element={ <About /> } />
            <Route path="/search" element={ <Search /> } />
            <Route path="/posts/:id" element={ <Post /> } />
            <Route path="/login" element={!user ?  <Login /> : <Navigate to="/" /> } />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" /> } />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" /> } />
            <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" /> } />
            <Route
                path="/posts/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />
            <Route path="*" element={ <NotFound />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
