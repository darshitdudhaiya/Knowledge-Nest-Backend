import Joi from "joi";

const AddCircularsSchema = Joi.object({
  UserId:Joi.number().required(),
  SubjectId:Joi.number().required(),
});

export default AddCircularsSchema;