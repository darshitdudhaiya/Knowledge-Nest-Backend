import Joi from "joi";

const AddDiscussionSchema = Joi.object({
  UserId:Joi.number().required(),
  SubjectId:Joi.number().required(),
  ClassId:Joi.number().required(),
});

export default AddDiscussionSchema;