export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formatted = result.error.format();
      const errors = result.error.issues.map((e) => e.message);

      return res
        .status(400)
        .json({ message: "Validation Failed...", errors: errors });
    }
    next();
  };
};
