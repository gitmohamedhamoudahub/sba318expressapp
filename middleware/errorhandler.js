function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'OOps and Error happened please try again',
    });
}

module.exports = errorHandler;