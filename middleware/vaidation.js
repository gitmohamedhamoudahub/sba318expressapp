function validateUser(req, res, next) 
{
    const { name, email, password } = req.body;

    if (!name 
        || typeof name !== 'string' 
        || name.trim().length === 0
        ) 
    {
        const error = new Error('Invalid or missing user name.');
        error.status = 400;
        return next(error);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        const error = new Error('Invalid or missing user email.');
        error.status = 400;
        return next(error);
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
        const error = new Error(
            'Password  must be a string with at least 8 characters.'
        );
        error.status = 400;
        return next(error);
    }

    next();
}

module.exports = validateUser;