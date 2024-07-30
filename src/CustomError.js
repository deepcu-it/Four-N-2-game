class CustomError extends Error {
    CustomError(message) {
        super(message);
        Error.captureStackTrace(this,CustomError);
    }
}
export default CustomError;