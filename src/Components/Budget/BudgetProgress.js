import React, {Component} from 'react';
import axios from 'axios';
import ExpenseModal from './ExpenseModal';
// import {HorizonalBar} from 'react-chartjs-2';

class BudgetProgress extends Component {
    constructor(){
        super();
        this.state = {
            user: {},
            budget: [],
            showModal: false
        }
    }

    componentDidMount(){
        this.handleGetSessionUser();
    }

    handleGetSessionUser = async() => {
        await axios.get('/auth/session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
        })
        this.handleGetUserBudget(); 
    }

    handleGetUserBudget = () => {
        axios.get(`/api/monthly-budget/${this.state.user.user_id}`)
        .then(res => {
            this.setState({
                budget: res.data
            })
        })
    }

    handleModalToggle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render(){
        return (
            <div>
                <button onClick={this.handleModalToggle}>Add Expense</button>
                {this.state.showModal
                ? <ExpenseModal 
                        budget={this.state.budget}
                        toggle={this.handleModalToggle}/>
                : null}
            </div>
        )
    }
}

export default BudgetProgress;