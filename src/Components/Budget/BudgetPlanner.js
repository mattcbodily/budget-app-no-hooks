import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';

class BudgetPlanner extends Component {
    constructor(){
        super();
        this.state = {
            user: {},
            budget: '',
            groceries: '',
            gas: '',
            entertainment: '',
            restaurants: '',
            other: '',
            step: 1
        }
    }

    componentDidMount(){
        this.handleGetSessionUser();
    }

    handleGetSessionUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
        }) 
    }

    handleInput = (prop, val) => {
        this.setState({
            [prop]: val
        })
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

    addMonthlyBudget = () => {
        let today = new Date();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        today = mm + '/' + yyyy;
        axios.post('/api/monthly-budget', {user_id: this.state.user.user_id, budget: parseInt(this.state.budget), date: today})
        .then(res => {
            this.incrementStep()
        })
    }

    showStep = () => {
        switch(this.state.step){
            case 1:
                return (
                    <div>
                        <h5>Step One: Set Your Budget</h5>
                        <input 
                            value={this.state.budget}
                            onChange={e => this.handleInput('budget', e.target.value)}/>
                        <button onClick={this.addMonthlyBudget}>Submit</button>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <h5>Step Two: Split Your Budget</h5>
                        <p>Your budget: ${this.state.budget}</p>
                        <p>Budget left: ${(this.state.budget - this.state.groceries - this.state.gas - this.state.entertainment - this.state.restaurants - this.state.other)}</p>
                        <p>Groceries</p>
                        <input 
                            value={this.state.groceries}
                            maxLength='20'
                            onChange={e => this.handleInput('groceries', e.target.value)}/>
                        <p>Gas</p>
                        <input 
                            value={this.state.gas}
                            maxLength='20'
                            onChange={e => this.handleInput('gas', e.target.value)}/>
                        <p>Entertainment</p>
                        <input 
                            value={this.state.entertainment}
                            maxLength='20'
                            onChange={e => this.handleInput('entertainment', e.target.value)}/>
                        <p>Restaurants</p>
                        <input 
                            value={this.state.restaurants}
                            maxLength='20'
                            onChange={e => this.handleInput('restaurants', e.target.value)}/>
                        <p>Other</p>
                        <input 
                            value={this.state.other}
                            maxLength='20'
                            onChange={e => this.handleInput('other', e.target.value)}/>
                        <Link to='budget'><button>Submit</button></Link>
                    </div>
                )
            default:
                return;
        }
    }

    render(){
        console.log(this.state.user)
        const {groceries, gas, entertainment, restaurants, other} = this.state;
        return(
            <div>
                <h3>Plan your Budget</h3>
                <div className='doughnut-chart'>
                    <Doughnut
                        height={300}
                        width={300} 
                        data={{labels: ['Groceries', 'Gas', 'Entertainment', 'Restaurants', 'Other'],
                               datasets: [{
                                 label: 'Budget Dataset',
                                 backgroundColor: ['#FF4242', '#49D4D6', '#8749D6', '#FFC264', '#2CDE00'],
                                 borderColor: '#000000',
                                 data: [parseInt(groceries), parseInt(gas), parseInt(entertainment), parseInt(restaurants), parseInt(other)]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false
                        }}/>
                </div>
                {this.showStep()}
            </div>
        )
    }
}

export default BudgetPlanner;