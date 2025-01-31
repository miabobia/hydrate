// responseTemplate.js

const createResponse = (status, data = null, message = "", error = null) => {
    return {
        status: status,
        data: data,
        message: message,
        error: error
    };
};

module.exports = createResponse;