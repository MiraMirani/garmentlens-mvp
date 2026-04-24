import {NavLink} from "react-router-dom";

function Navbar() {

    return (
        <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
            <NavLink to="/upload" className={({ isActive }) => (isActive ? "active" : "")}>Upload</NavLink>
            <NavLink to="/list" className={({ isActive }) => (isActive ? "active" : "")}>List</NavLink>
        </nav>
    )
}

export default Navbar;