// Validation middleware

const runValidators = (validators) => {
    return (req, res, next) => {
        const errors = [];

        for (const validate of validators) {
            const result = validate(req);
            if (result && result.message) {
                errors.push({ field: result.field, message: result.message });
            }
        }

        if (errors.length > 0) {
            const err = new Error("Validation failed");
            err.status = 400;
            err.details = errors;
            return next(err);
        }

        next();
    };
};

// Validators
const requireBodyFields = (fields) => (req) => {
    for (const field of fields) {
        if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
            return { field, message: `${field} is required` };
        }
    }
    return null;
};

const validateEmailField = (fieldName = 'email') => (req) => {
    const value = req.body[fieldName];
    if (typeof value !== 'string') return { field: fieldName, message: `${fieldName} must be a string` };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // format : email@domain.com
    if (!regex.test(value)) return { field: fieldName, message: `Invalid ${fieldName}, must be a valid email` };
    return null;
};

const validatePhoneField = (fieldName = 'phone') => (req) => {
    const value = req.body[fieldName];
    if (typeof value !== 'string') return { field: fieldName, message: `${fieldName} must be a string` };
    const regex = /^\d{10}$/; // format : 1234567890
    if (!regex.test(value)) return { field: fieldName, message: `Invalid ${fieldName}, must be 10 digits` };
    return null;
};

module.exports = {
    runValidators,
    requireBodyFields,
    validateEmailField,
    validatePhoneField,
};


