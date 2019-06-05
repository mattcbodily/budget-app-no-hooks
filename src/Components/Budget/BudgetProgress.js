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
            expenses: [],
            groceriesTotal: 0,
            gasTotal: 0,
            entertainmentTotal: 0,
            restaurantsTotal: 0,
            otherTotal: 0,
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

    handleGetUserBudget = async() => {
        await axios.get(`/api/monthly-budget/${this.state.user.user_id}`)
        .then(res => {
            this.setState({
                budget: res.data
            })
        })
        this.handleGetUserExpenses();
    }

    handleGetUserExpenses = async() => {
        await axios.get(`/api/expenses/${this.state.budget[0].budget_id}`)
        .then(res => {
            this.setState({
                expenses: res.data
            })
        })
        this.handleExpenseTotals();
    }

    handleModalToggle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleExpenseTotals = () => {
        let groceries = this.state.expenses.filter(element => element.category === 'groceries');
        let gas = this.state.expenses.filter(element => element.category === 'gas');
        let entertainment = this.state.expenses.filter(element => element.category === 'entertainment')
        let restaurants = this.state.expenses.filter(element => element.category === 'restaurants')
        let other = this.state.expenses.filter(element => element.category === 'other')

        let groceriesTotal = groceries.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let gasTotal = gas.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let entertainmentTotal = entertainment.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let restaurantsTotal = restaurants.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let otherTotal = other.reduce((acc, curr) => {return acc + +curr.amount}, 0)

        this.setState({groceriesTotal, gasTotal, entertainmentTotal, restaurantsTotal, otherTotal})
    }

    render(){
        return (
            <div>
                <button onClick={this.handleModalToggle}>Add Expense</button>
                {this.state.showModal
                ? <ExpenseModal 
                        budget={this.state.budget}
                        toggle={this.handleModalToggle}
                        expenses={this.handleGetUserExpenses}/>
                : null}
            </div>
        )
    }
}

export default BudgetProgress;