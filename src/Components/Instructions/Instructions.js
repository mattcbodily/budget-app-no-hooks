import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Instructions extends Component {
    constructor(){
        super();
        this.state = {
            step: 1
        }
    }

    decrementStep = () => {
        this.setState(prevState => ({
            step: prevState.step - 1
        }))
    }

    incrementStep = () => {
        this.setState(prevState => ({
            step: prevState.step + 1
        }))
    }

    showStep = () => {
        switch(this.state.step){
            case 1:
                return (
                    <div>
                        step one
                        <button onClick={this.incrementStep}>Next</button>
                    </div>
                )
            case 2:
                return (
                    <div>
                        step two
                        <button onClick={this.decrementStep}>Back</button>
                        <button onClick={this.incrementStep}>Next</button>
                    </div>
                )
            case 3:
                return (
                    <div>
                        step three
                        <button onClick={this.decrementStep}>Back</button>
                        <Link to='/planner'><button>Got it</button></Link>
                    </div>
                )
            default:
                return;
        }
    }

    render(){
        return (
            <div>
                {this.showStep()}
            </div>
        )
    }
}

export default Instructions;