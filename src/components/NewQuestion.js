import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        first: "",
        second: "",
redirect: false,    
    };

    onChange = (e) => {
        const {name,value} = e.target
        this.setState((state) => ({
            ...state,
            [name]:value
        }))
        console.log(this.state)
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { first, second } = this.state;
        if(this.state.first !== '' && this.state.second !==''){
            this.props.dispatch(handleSaveQuestion({first,second}))
            return this.setState({first:'',second:'', redirect:true})
        }else(
            alert('where\'s question to submit?!!')
        )
    };

    render() {
        return (
            <div>
                {(this.state.redirect===true)?(
                    <Redirect to='/' />
                ):(
                <form onSubmit={this.onSubmit} className='new-ques'>
                        <h3 className='center'>Would You Rather ?</h3>
                        <div className='container'>
                            <div >
                                <span className="option">1-</span>
                                <input
                                    className='input'
                                    name="first"
                                    onChange={(e) => this.onChange(e)}
                                    placeholder="first option"
                                />
                            </div>
                            <div>
                                <span className="option">2-</span>
                                <input
                                    className='input'
                                    name="second"
                                    onChange={(e) => this.onChange(e)}
                                    placeholder="second option"
                                />
                            </div>
                        </div>
                        <input type="submit" className="submit-btn"
                        />
                </form>
                        )}
                    
                </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser,
    }
}
export default connect(mapStateToProps)(NewQuestion)
