import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux'


class Nav extends Component {
    handleLogout = () => {
        this.props.logout()
    };

    render() {
        const { isLoggedIn } = this.props;
        
    return (
        <nav className='nav'>
            <ul className='nav'>
                <li>
                    <NavLink to='/' exact activeClassName='active' className='nav-li'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' activeClassName='active' className='nav-li'>
                        Add New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' activeClassName='active' className='nav-li'>
                        Leaderboard
                    </NavLink>
                </li>
            </ul>

            {isLoggedIn && (
                <ul >
                    <li>
                        
                    <div className='user'>
                        <div className="leader active">Welcome, {isLoggedIn.name}</div>
                        <img src={isLoggedIn.avatarURL} alt='avatar' className='avatar' />
                        
                    </div>
                        
                    </li>
                    <li>
                        <button
                        onClick={this.handleLogout}
                        className="btn btn-secondary"
                        >
                            Log out
                        </button>
                    </li>
                </ul>
            )}
            
        </nav>
    )
    }
}
function mapStateToProps({authedUser, users}) {
    return {
        isLoggedIn: users[authedUser],
        authedUser,
    }
}
export default connect(mapStateToProps)(Nav)