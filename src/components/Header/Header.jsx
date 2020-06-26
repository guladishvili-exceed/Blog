import React, {Component} from 'react'
import './header.css'
import logo from './logo.png'

class Header extends Component {
    render() {
        return (
            <div className={'container'}>
                <div className={'elements'}>
                    <img  src={logo} alt="Logo" />;
                    <button  className={'btn btn-primary'}>Log In</button>
                    <button  className={'btn btn-primary' }>Register</button>
                </div>
            </div>
        )
    }
}

export default Header;