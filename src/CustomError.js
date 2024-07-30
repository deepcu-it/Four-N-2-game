class CustomError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this,CustomError);
    }
}
export default CustomError;