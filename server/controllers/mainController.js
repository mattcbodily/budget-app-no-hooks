module.exports = {
    addMonthlyBudget: (req, res) => {
        const {user_id, budget, groceries, gas, entertainment, restaurants, other, date} = req.body;
        req.app.get('db').budget.add_monthly_budget(user_id, budget, groceries, gas, entertainment, restaurants, other, date)
        .then(res.sendStatus(200))
    }
}