const Joi = require('joi')

const validator = (schemaObject) => {
  return (req, res, next) => {
    const payload = Object.assign(
      {},
      req.params || {},
      req.query || {},
      req.body || {}
    );
    const { error } = Joi.object(schemaObject).validate(payload);
    if (error) {
      return res
        .status(400)
        .json({ message: errorHandler(error), success: false });
    }
    next();
  };
};

const errorHandler = (error) => {
  const err = error.details?.map((err) => err?.message?.replace(/"/g, ""));
  return err;
};

module.exports= {validator};