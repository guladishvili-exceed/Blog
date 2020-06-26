import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Nav  extends Component {
    render() {
        return (
            <div>
                <Link to={'/login'}>
                    <button>Log In</button>
                </Link>
                <Link to={'/register'}>
                    <button>Register</button>
                </Link>
                <Link to={'/startingpage'}>
                    <button>Starting Page</button>
                </Link>
            </div>
        )
    }
}

export default Nav;