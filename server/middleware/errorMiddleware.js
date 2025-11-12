// unsupported /404 endpoint
const notFound = (req, res, next) => {
    const error = new Error(`not found - ${req.originUrl}`)
    res.status(400)
    next(error);
}



// Error middleware
const errorHandler = (error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500).json({message: error.message || "An unknown error occured."})
}


module.exports = {notFound, errorHandler}