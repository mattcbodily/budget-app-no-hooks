import React, {Component} from 'react';
import './Authentication.css';

class Register extends Component {
    render(){
        return(
            <div>
                <h3>Budget</h3>
                <input placeholder='Email'/>
                <input placeholder='Password'/>
            </div>
        )
    }
}

export default Register;