class ExpressError extends Error {
    constructor(statusCode, message) {
        super(); // This sets up the error message
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
