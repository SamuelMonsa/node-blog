const validateForm = async (body, validation) => {
    const validate = new Validator(body, validation);
    return {
        success: await validate.check(),
        errors: validate.errors
    };
}

module.exports = validateForm