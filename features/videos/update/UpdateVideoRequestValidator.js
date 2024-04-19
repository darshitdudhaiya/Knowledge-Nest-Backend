import Joi from "joi";

const UpdateVideoRequestSchema = Joi.object({
  Title: Joi.string().required().max(50),
  Description: Joi.string().required().max(300),
  IsApproved: Joi.boolean().required(),
  UserId: Joi.number().required(),
  SubjectId: Joi.number().required(),
});

export default UpdateVideoRequestSchema;
