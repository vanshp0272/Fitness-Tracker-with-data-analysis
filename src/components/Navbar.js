import React from "react";
import './navbar.css';

function Navbar(){

    return (
        <>
            <nav>
                <a><svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" class="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" class="ccustom" fill="#312ECB"></path> </svg></a>
            <div>
                <ul id="navbar">
                    <li>
                        <a className="active" href ="/welcomepage">Home</a>
                    </li>
                    <li>
                        <a href ="/homepage">Daily Data</a>
                    </li>
                    <li className="lol">
                        <a href = "fitnessData.html" target="_blank">Graphs</a>
                    </li>
                    <li>
                        Scheduler   
                    </li>
                    <li className="lo">
                        <a href = "/">Log Out</a>
                    </li>
                </ul>
            </div>
            </nav>
        </>
    );
}
  export default Navbar;
// <div className="navbar">
    //   <li>
    //     <Link to="/">Home</Link>
    //   </li>
    //   <li>
    //     <Link to="/Insert">Insert</Link>
    //   </li>
    //   <li>
    //     <Link to="/Update">Update</Link>
    //   </li>
    //   <li>
    //     <Link to="/Delete">Delete</Link>
    //   </li>
    // </div>