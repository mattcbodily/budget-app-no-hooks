import React, {Component} from 'react';
import './budget.css'
import axios from 'axios';

class ExpenseModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: 'groceries',
            expenseName: '',
            expenseAmount: ''
        }
    }

    handleAddExpense = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        let expenseObj = {
            budget_id: this.props.budget[0].budget_id,
            expense_name: this.state.expenseName,
            category: this.state.category,
            amount: parseInt(this.state.expenseAmount),
            date: today
        }
        axios.post('/api/expense', expenseObj)
        .then(res => {
            this.props.expenses();
            this.props.toggle();
            // function that will grab all expenses will run here
        })
    }

    handleCategory = (e) => {
        this.setState({
            category: e.target.value
        })
    }

    handleInput = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }

    render(){
        return(
            <div className='expense-modal'>
                <h3>Add an Expense</h3>
                <h5>Expense Category</h5>
                <select onChange={this.handleCategory}>
                    <option value='groceries'>Groceries</option>
                    <option value='gas'>Gas</option>
                    <option value='entertainment'>Entertainment</option>
                    <option value='restaurants'>Restaurants</option>
                    <option value='other'>Other</option>
                </select>
                <h5>Expense Name</h5>
                <input 
                    value={this.state.expenseName}
                    maxLength='20'
                    onChange={e => this.handleInput('expenseName', e.target.value)}/>
                <h5>Expense Amount</h5>
                <input 
                    value={this.state.expenseAmount}
                    maxLength='20'
                    onChange={e => this.handleInput('expenseAmount', e.target.value)}/>
                <button onClick={this.handleAddExpense}>Add Expense</button>
            </div>
        )
    }
}

export default ExpenseModal;