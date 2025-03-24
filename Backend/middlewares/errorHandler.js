const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message); // Log only the message

    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
    });
};

export default errorHandler;

