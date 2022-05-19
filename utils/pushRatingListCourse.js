const ratingCourses = (courses, ratings) => {
    const ratedCourses = courses.map(eachCourse => {
        const relatedRatings = ratings.filter(rat => rat.course == eachCourse._id.toString())

        let sum = 0
        relatedRatings.forEach(eachRating => {

            sum += eachRating.rating

        })

        const resultFinal = sum === 0 || relatedRatings.length === 0 ? 1 : sum / relatedRatings.length
        return {
            ...eachCourse._doc, avgRating: resultFinal.toFixed(1).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')
        }
    })

    return ratedCourses
}

module.exports = { ratingCourses }