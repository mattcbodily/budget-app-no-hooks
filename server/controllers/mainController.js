module.exports = {
    addMonthlyBudget: (req, res) => {
        const {user_id, budget, date} = req.body;
        req.app.get('db').budget.add_monthly_budget(user_id, budget, date)
        .then(res.sendStatus(200))
    }
}