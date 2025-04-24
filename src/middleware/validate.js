const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const data = req[source];
    const { error } = schema.validate(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = validate;
