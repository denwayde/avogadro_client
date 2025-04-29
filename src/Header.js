import React from 'react'
//import icon from './img/icon.png'
import icon1 from './img/atom-icon-1.png'
function Header() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-center">
                
                <span className='navbar-brand my-brand'>
                    <img src={icon1} alt="Logo" className="d-inline-block align-text-top"/>
                </span>

            </div>
        </nav>
    )
}

export default Header
