import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import './App.css';
import Homepage from "./components/homepage";
import Login from "./components/login";
import Register from "./components/register";
import Welcome from "./components/welcomepage";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact  path="/Register" element={<Register />} />
        <Route exact  path="/welcomepage" element={<Welcome />} />
        <Route exact  path="/Homepage" element={<Homepage />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </Router>
    </div>
    );
  }
  
  export default App;

// function App() {
//   return (
//     
//       {/* <Homepage /> */}
//       {/* <Login /> */}
//       <Register />
//     
//   );
// }


