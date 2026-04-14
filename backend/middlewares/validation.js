const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error('string.uri');
  }

  return value;
};

const validateEmail = (value, helpers) => {
  if (!validator.isEmail(value)) {
    return helpers.error('string.email');
  }

  return value;
};

const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateUrl),
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
});

const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
});

const validateUpdateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

const validateCreateItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    imageUrl: Joi.string().required().custom(validateUrl),
    weather: Joi.string().valid('hot', 'warm', 'cold').required(),
  }),
});

const validateItemId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateUpdateUser,
  validateCreateItem,
  validateItemId,
};