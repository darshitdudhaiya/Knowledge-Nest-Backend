import Joi from "joi";

const QuizeSubmissionsSchema = Joi.object({
  StudentId: Joi.number().required(),
  QuizeId: Joi.number().required()
});

export default QuizeSubmissionsSchema;