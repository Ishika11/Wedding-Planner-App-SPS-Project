const successMessage = { status: 'success' };
const errorMessage = { status: 'error' };

const status = {
    SUCCESS: 200,
    ERROR: 500,
    NOTFOUND: 404,
    UNAUTHORIZED: 401,
    CONFLICT: 409,
    CREATED: 201,
    BAD: 400,
    NOCONTENT: 204,
};

module.exports= {
    successMessage,
    errorMessage,
    status,
};