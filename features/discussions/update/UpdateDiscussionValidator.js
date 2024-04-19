import Joi from "joi";

const UpdateDiscussionSchema = Joi.object({
  UserId:Joi.number().required(),
  SubjectId:Joi.number().required(),
  ClassId:Joi.number().required(),
});

export default UpdateDiscussionSchema;