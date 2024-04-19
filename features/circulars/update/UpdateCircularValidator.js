import Joi from "joi";

const UpdateCircularsSchema = Joi.object({
  UserId:Joi.number().required(),
  SubjectId:Joi.number().required(),
});

export default UpdateCircularsSchema;