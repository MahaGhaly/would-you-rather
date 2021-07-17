import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, ProgressBar } from 'react-bootstrap'
import NotFound from './NotFound'
import { handleAnswer } from '../actions/shared'


class QuestionCard extends Component {
    state = {
        choise : ' '
    }

    whenSubmit = (e) => {
        e.preventDefault()
        const ifOneChecked=document.getElementById('first').checked
        const ifTwoChecked=document.getElementById('second').checked
        const ifAnswered=(ifOneChecked && !ifTwoChecked)?'optionOne'
        :((!ifOneChecked && ifTwoChecked)?'optionTwo':null)

        if(ifAnswered !== null && ifAnswered !== undefined){
            this.props.dispatch(handleAnswer(this.props.authedUser, this.props.match.params.id, this.state.choise))
        }else{
            alert('You must select one of two options first!!!')}
    }

    ifChange = (event) => {
        this.setState({
            choise: event.target.value
        })
    }
    
    render() {
        if(this.props.isError) {
            return (
                <div>
                    <NotFound/>
                </div>
            )
        }

        const ques = this.props.q ? this.props.q : ''
        const checkBox1 = this.props.q ? this.props.q.optionOne.votes.includes(this.props.authedUser) : null
        const checkBox2 = this.props.q ? this.props.q.optionTwo.votes.includes(this.props.authedUser) : null
        return (
            <div className='center'>
                <Container>
                    {checkBox1 === true || checkBox2 === true ? (
                        <Card>
                            <img className="avatar" src={this.props.author.avatarURL} alt='avatar' />
                            <div>
                                <div>
                                    <h4 className='in-pink center leader2'>Question Voting:   </h4>
                                    <h6 className='leader2'> Asked By: {this.props.author.name}: </h6>
                                </div>
                                <div>
                                    <p className='in-pink'>Choise1:</p>
                                    <div>
                                        <p className='leader'>Would You Rather... {ques ? ques.optionOne.text : ''}</p>
                                        <div>
                                            <ProgressBar striped animated variant="danger" now={ques ? (ques.optionOne.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}
                                            label={`${ques ? (ques.optionOne.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}%`} />
                                        </div>
                                        <div className='center leader2'>{ques ? `${ques.optionOne.votes.length} Of ${ques.optionTwo.votes.length + ques.optionOne.votes.length}` : ' '}</div>
                                    </div>
                                    <hr/>
                                    <p className='in-pink'>Choise2:</p>
                                    <div>
                                        <p className='leader'> Would You Rather... {ques ? ques.optionTwo.text : ''}</p>
                                        <ProgressBar striped animated variant="danger" now={ques ? (ques.optionOne.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}
                                            label={`${this.props.q ? (ques.optionTwo.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}%`} />
                                        <div className='center leader2'>{ques ? `${ques.optionTwo.votes.length} Of ${ques.optionTwo.votes.length + ques.optionOne.votes.length}` : ' '}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>)
                        : 
                        (<Card className='new-ques'>
                            <img className="avatar" src={this.props.author.avatarURL} alt='avatar' />
                            <div className='container'>
                                <h4 className='leader center'>{this.props.author.name} Asks You:</h4>
                                <h6 className='leader2'>Would you rather?</h6>
                                <div className="in-pink">
                                    
                                    <input 
                                        id='first'
                                        type='radio' 
                                        name='select' 
                                        value='optionOne'
                                        onChange={this.ifChange}/>
                                    <label>{ques ? ques.optionOne.text : null}</label>
                                <hr/>
                                    <input
                                        id='second'
                                        type="radio"
                                        name="select"
                                        label={ques ? ques.optionTwo.text : null}
                                        onChange={this.ifChange}
                                        value="optionTwo" />
                                    <label>{ques ? ques.optionTwo.text : null}</label>
                                </div>
                                <input className='veiw-ques' type='submit' onClick={this.whenSubmit}/>
                            </div>
                        </Card>
                        )}
                </Container>
            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }, { match }) {
    if(questions[match.params.id] === undefined) {
        const isError = true;
        return {
            isError
        }
    }

    let q = questions[match.params.id]
    let author = q ? users[q.author] : ''
    return {
        q: questions[match.params.id],
        author,
        authedUser,
    }
}

export default connect(mapStateToProps)(QuestionCard)