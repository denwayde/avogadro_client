import React from 'react'
import icon from './img/icon.png'

function Header() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-center">
                
                <span className='navbar-brand'>
                    <img src={icon} alt="Logo" width="45" height="37" className="d-inline-block align-text-top"/>
                </span>
                
            </div>
        </nav>
    )
}

export default Header
