import {
    Routes,
    Route, BrowserRouter,
} from "react-router-dom";
import React from "react";
import Home from "./components/Home"
import Nav from "./components/Nav";
import About from "./components/About";
import Projects from "./components/projects/Projects";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import useAuth from "./hooks/useAuth";
import RequireAuth from "./components/helpers/RequireAuth";
import Loader from "./components/helpers/Loader";
import Project from "./components/projects/Project";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  const auth = useAuth()
  console.log(auth)
  if(auth?.isAuthChecking) {
    return(
        <div className={'bg-gray-800 min-h-screen flex items-center justify-center'}>
          <Loader className={'w-10 h-10'}></Loader>
        </div>
    )
  }
  return (
      <div className="bg-gray-800 h-full w-full text-white">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/projects/:projectId" element={<Project />} />
            <Route path="/about" element={<About/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path={'/dashboard'} element={<RequireAuth><Dashboard /></RequireAuth>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
