const ratingCourses = (courses, ratings) => {
    const ratedCourses = courses.map(eachCourse => {
        const relatedRatings = ratings.filter(rat => rat.course == eachCourse._id.toString())
        const finalAvg = relatedRatings.reduce((acc, val) => val.rating != null ? acc + val.rating : 0, 1)
        const resultFinal = finalAvg / relatedRatings.length

        return {
            ...eachCourse._doc, avgRating: resultFinal != Infinity ? resultFinal.toFixed(1) : '1'
        }
    })
    return ratedCourses
}

module.exports = { ratingCourses }