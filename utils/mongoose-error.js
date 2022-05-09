const formatError = err => {
    let errorMessage = '';
    console.log(Object.entries(err.errors).forEach(eachError => errorMessage += `${eachError[1].message}`))
    return errorMessage
}

module.exports = { formatError }