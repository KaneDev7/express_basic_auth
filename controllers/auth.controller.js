const UserModele = require("../models/users.model")
const bcrypt = require('bcrypt')
const saltRounds = 10

const signInController = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(401).send({
            success: false,
            message: "Verifier les informations"
        })
    }

    try {
        const user = await UserModele.findOne({ username })
        if (!user?.username) {
            return res.status(401).send({
                success: false,
                message: "incorrect username or password"
            })
        }
        const validPassword = await bcrypt.compare(password, user?.password);
        if (!validPassword) {
            return res.status(401).send({
                message: 'incorrect username or password'
            });
        }

        req.session.user = {
            username: user?.username
        };

        res.status(201).send({
            success: true,
            message: "successfuly connected",
            user: req.session.user
        })

    } catch (error) {
        res.status(401).send({ success: false, message: error?.message || "Une erreur est survenue" })
    }
}

const registerController = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(401).send({ success: false, message: "Verifier les informations" })
    }

    try {
        const user = await UserModele.findOne({ username })
        if (user) {
            return res.status(401).send({ success: false, message: "user already exist" })
        }

        const passwordHashed = await bcrypt.hash(password, saltRounds)
        await UserModele.create({ username, password: passwordHashed })
        res.status(201).send({ success: true, message: "user successfuly created" })


    } catch (error) {
        res.status(401).send({ success: false, message: error?.message || "Une erreur est survenue" })
    }
}


const logOutController = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
        }
        res.clearCookie('connect.sid');
        res.json({ success : true,  message: 'Déconnexion réussie' });
    });
}

const getUserAuthController = (req, res) =>{
    res.status(200).send({
        success: true,
        message: "successfuly connected",
        user: req.session.user
    })
}

module.exports = {
    signInController,
    registerController,
    logOutController,
    getUserAuthController
}