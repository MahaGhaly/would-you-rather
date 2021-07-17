import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

class UserCard extends Component {
    render() {
        const { user } = this.props
        const created = user.questions.length
        const answered = Object.keys(user.answers).length
        const score=created+answered
        return (
            <div>
                <Card>
                    <Card.Body>
                        <img className="avatar" src={user.avatarURL} alt='avatar' />
                        <div className='leader center'>{user.name}</div>
                        <div className="center in-pink unit ">
                            Answered questions: {answered} 
                        <br/>
                            Created question: {created}
                        </div>
                        <hr/>
                        <div className="center leader2 in-pink2 unit">Score= {score}</div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default connect()(UserCard)
