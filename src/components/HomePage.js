import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav } from 'react-bootstrap'
import Question from './Question'


class HomePage extends Component {
    state = {
        switchTabs : false,
    }

    handleIfAnswered = () => {
        this.setState({
            switchTabs: true
        })
    }
    handleIfUnAnswered = () => {
        this.setState({
            switchTabs: false
        })
    }

    render() {
        return (
            <div>
                <h3 className='center leader'>Questions...</h3>

                <Nav justify variant="tabs" defaultActiveKey="link-a">
                        <Nav.Link eventKey="link-a" onClick={this.handleIfUnAnswered}>Unanswered questions</Nav.Link>
                        <Nav.Link eventKey="link-b" onClick={this.handleIfAnswered}>Answered questions</Nav.Link>
                </Nav>
                
                {this.state.switchTabs === false ? (
                    this.props.unAnswered.map((question) => (
                        <Question key={question.id} ques={question} />
                    ))
                ) : this.props.answered.map((question) => (
                    <Question key={question.id} ques={question} />
                ))}
            </div>
        )
    }
}
function mapStateToProps({ users, questions, authedUser }) {
    const questionsList = Object.values(questions)
    const isLoggedIn = users[authedUser] 
    const authedAnswers = isLoggedIn ? Object.keys(isLoggedIn.answers) : []
    return {
        answered: questionsList.filter((question) => authedAnswers.includes(question.id))
                            .sort((a, b) => b.timestamp - a.timestamp),
        unAnswered: questionsList.filter((question) => !authedAnswers.includes(question.id))
                            .sort((a, b) => b.timestamp - a.timestamp)
    }
}


export default connect(mapStateToProps)(HomePage)