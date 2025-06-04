import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import BlogPost from "./components/Blog/BlogPost";        // UPDATED
import BlogDashboard from "./components/Blog/BlogDashboard"; // NEW
import NewPostForm from "./components/Blog/NewPostForm";     // NEW
import Login from "./components/Auth/Login";                 // MOVED
import Credentials from "./components/Credentials";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/credentials" element={<Credentials />} />
         {/* <Route path="/blog" element={<Blog />} /> 
          <Route path="/blog/:id" element={<BlogPost />} />*/}
          <Route path="/contact" element={<Contact />} />
          
        </Route>

       {/*} <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<BlogDashboard />} />
        <Route path="/new-post" element={<NewPostForm />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
