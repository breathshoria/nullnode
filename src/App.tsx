import {
  Routes,
  Route, MemoryRouter,
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

const App = () => {
  const auth = useAuth()

  if(auth?.isAuthChecking) {
    return(
        <div className={'bg-gray-800 min-h-screen flex items-center justify-center'}>
          <Loader className={'w-10 h-10'}></Loader>
        </div>
    )
  }
  return (
      <div className="bg-gray-800 h-full text-white">
        <MemoryRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="/about" element={<About/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </MemoryRouter>
      </div>
  );
}

export default App;
