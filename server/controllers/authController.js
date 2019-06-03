const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        const {session} = req;
        let user = await db.user.check_user(email);
        user = user[0];
        if(user){
            return res.status(400).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.user.register(email, hash);
        newUser = newUser[0];
        delete newUser.password;
        session.user = newUser;
        res.status(201).send(session.user);
    },
    login: async(req, res) => {

    },
    logout: async(req, res) => {

    },
    getSessionUser: async(req, res) => {

    }
}