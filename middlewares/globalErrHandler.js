export const globalErrHandler = (err,req,res,next) => {
    const stack = err?.stack;
    const statusCode = err?.statusCode ? err?.statusCode : 500;
    const message = err?.message;
    res.status(statusCode).json({
        stack,
        message,
    })
}

export const notFound = (req,res,next) => {
    const message = new Error(`Route ${req.originalUrl} not found`);
    
}