import React, {Component} from 'react';
import axios from 'axios';
import './Authentication.css';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            username: '',
            password: '',
            verPassword: ''
        }
    }

    handleInput(prop, val){
        this.setState({
            [prop]: val
        })
    }

    handleRegister = () => {
        const {email, username, password, verPassword} = this.state;
        if(password !== verPassword){
            alert('Passwords Do Not Match')
        } else {
            axios.post('/auth/register', {email, username, password})
            .then(res => {
                this.props.history.push('/instructions')
        })}
    }

    render(){
        const {email, username, password, verPassword} = this.state;
        return(
            <div>
                <h3>Budget</h3>
                <input 
                    value={email}
                    placeholder='Email'
                    maxLength='40'
                    onChange={e => this.handleInput('email', e.target.value)}/>
                <input 
                    value={username}
                    placeholder='Username'
                    maxLength='20'
                    onChange={e => this.handleInput('username', e.target.value)}/>
                <input
                    value={password} 
                    placeholder='Password'
                    maxLength='40'
                    type='password'
                    onChange={e => this.handleInput('password', e.target.value)}/>
                <input
                    value={verPassword} 
                    placeholder='Verify Password'
                    maxLength='40'
                    type='password'
                    onChange={e => this.handleInput('verPassword', e.target.value)}/>
                    <button onClick={this.handleRegister}>Register</button>
            </div>
        )
    }
}

export default Register;