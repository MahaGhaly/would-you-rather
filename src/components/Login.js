import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Form } from 'react-bootstrap'
import { setAuthedUser } from './../actions/authedUser'
import Card from 'react-bootstrap/Card'


class Login extends Component {
    state = {
        userId: null,

    }

    onChange = (e) => {
        e.preventDefault()
        this.setState({
            userId: e.target.value
        })
    }

    signIn = (e) => {
        e.preventDefault()
        if(this.state.userId !== null){
        this.props.dispatch(setAuthedUser(this.state.userId))
        return this.props.login()}
    }

    render() {
        return (
            <div>
                <Container>
                    <Card>
                        
                        <Card.Body>
                            <Card.Header className='center leader'>Welcome To Would you Rather Game...</Card.Header>
                            <div className='center avatar'>
                                <img src='https://image.flaticon.com/icons/png/512/2302/2302842.png' alt='Q/A'/>
                            </div>

                            <Form >
                                <Form.Group >
                                    <Form.Control as="select" onChange={this.onChange}>
                                        
                                        <option value='default'>Choose User...</option>

                                        {this.props.users.map((id)=> {
                                            return (<option key={id} value={id}>
                                                        {id}
                                                    </option>)
                                        })}

                                    </Form.Control>
                                </Form.Group>
                                <button className="btn btn-danger" onClick={this.signIn}>Login</button>
                            </Form>

                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.keys(users)
    }
}
export default connect(mapStateToProps)(Login)
