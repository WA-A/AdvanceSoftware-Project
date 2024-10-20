
export const Validation = (schema) => {
    return (req, res, next) => {
        const errorsMessage = [];

        if (req.file) {
            fileData.image = req.file;
        }
        const { error } = schema.validate({ ...req.body, ...req.params, ...req.query });

        if (error) {
            error.details.forEach(err => {
                const key = err.context.key;
                errorsMessage.push({ [key]: err.message });
            });

            return res.status(400).json({ message: "Validation error", errors: errorsMessage });
        }

        next();
    };
};
