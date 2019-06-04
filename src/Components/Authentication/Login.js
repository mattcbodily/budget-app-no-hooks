import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInput(prop, val){
        this.setState({
            [prop]: val
        })
    }

    handleLogin = () => {
        const {email, password} = this.state;
        axios.post('/auth/login', {email, password})
        .then(res => {
            this.props.history.push('/')
        })
    }

    render(){
        const {email, password} = this.state;
        return(
            <div>
                <input 
                    value={email}
                    placeholder='Email'
                    maxLength='40'
                    onChange={e => this.handleInput('email', e.target.value)}/>
                <input 
                    value={password}
                    type='password'
                    placeholder='Password'
                    maxLength='40'
                    onChange={e => this.handleInput('password', e.target.value)}/>
                <button onClick={this.handleLogin}>Login</button>
            </div>
        )
    }
}

export default Login;