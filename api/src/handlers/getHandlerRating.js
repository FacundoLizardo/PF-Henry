const getCourseByRatingController = require("../controllers/getControllers/getCourseByRatingController")

const getHandlerRating = async (req,res) => {

    try {
        const courseByRating = await getCourseByRatingController()
        return res.status(200).json(courseByRating)
        
    } catch (error) {
        return res.status(400).json({error: error.message})
        
    }
};

module.exports = { getHandlerRating };
