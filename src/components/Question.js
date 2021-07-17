import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'



class Question extends Component {
    render() {
        return (
            <Card>
                <div>
                <img  className='avatar' src={this.props.questionOfUser.avatarURL} alt={this.props.author}/>
                </div>
                <div >
                    <h4 className='leader2'><p className='in-pink'>Asked By: </p>{ this.props.questionOfUser.name  }</h4>
                    <h6>
                        Would you rather?...
                    </h6>
                    
                    <Link to={`/questions/${this.props.ques.id}`}><button className=' veiw-ques'>View Question</button></Link>
                </div>
                
            </Card>
        )
    }
}


function mapStateToProps({ users }, {ques}) {
    return {
        questionOfUser: users[ques.author] 
    }
}

export default connect(mapStateToProps)(Question)

