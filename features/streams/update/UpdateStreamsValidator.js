import Joi from "joi";

const UpdateStreamsSchema = Joi.object({
  Name: Joi.string().max(100).required(),
});

export default UpdateStreamsSchema;