import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'
import 'bootstrap/dist/css/bootstrap.css';


class Leaderboard extends Component {
    render() {
        return (
            <div>
                <h1 className='center leader'>Leaderboard</h1>
                {this.props.userSorted.map((user) => (
                    <li key={user.id}>
                        <UserCard key={user.id} user={user}/>
                    </li>
                ))}
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return ({
        userSorted : (Object.values(users)).sort((a, b) => (
                    ((Object.keys(b.answers)).length + b.questions.length) - ((Object.keys(a.answers)).length + a.questions.length)
    ))
    })
}

export default connect(mapStateToProps)(Leaderboard)