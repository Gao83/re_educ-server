const checkRole = (...rolesToCheck) => (req, res, next) => {

    if (rolesToCheck.includes(req.payload.role)) {
        next()
    } else {
        res.status(401).json({ message: 'No estás autorizado/a' })
    }
}

module.exports = {
    checkRole,
}