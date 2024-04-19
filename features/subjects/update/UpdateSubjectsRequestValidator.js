import Joi from "joi";

const UpdateSubjectsSchema = Joi.object({
  Name: Joi.string().required().max(50),
  SemesterId: Joi.number().required(),
});

export default UpdateSubjectsSchema;