import Joi from "joi";

const loginValidator = Joi.object({
  Email: Joi.string().required(),
  Password: Joi.string().required(),
});

export default loginValidator;
