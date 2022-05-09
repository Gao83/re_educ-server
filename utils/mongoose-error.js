const formatError = err => {
    let errorMessage = '';
    Object.entries(err.errors).forEach(eachError => errorMessage += `${eachError[1].message}`)
    return errorMessage
}

module.exports = { formatError }