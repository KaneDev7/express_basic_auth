
module.exports = checkSession = (req, res, next) => {
    if (!req?.session?.user) {
        return res.status(401).send({
            success: false,
            message: "Non authentifié"
        })
    }
    req.user = req?.session.user
    next()
}