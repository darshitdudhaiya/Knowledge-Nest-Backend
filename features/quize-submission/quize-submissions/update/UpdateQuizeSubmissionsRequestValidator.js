import Joi from "joi";

const UpdateQuizeSubmissionsSchema = Joi.object({
  StudentId: Joi.number().required(),
  QuizeId: Joi.number().required()
});

export default UpdateQuizeSubmissionsSchema;