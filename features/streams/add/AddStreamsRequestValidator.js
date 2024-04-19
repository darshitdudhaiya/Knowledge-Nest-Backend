import Joi from "joi";

const StreamSchema = Joi.object({
  Name: Joi.string().max(100).required(),
});

export default StreamSchema;