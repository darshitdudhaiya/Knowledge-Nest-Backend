import Joi from "joi";

const AddSubjectsSchema = Joi.object({
  Name: Joi.string().required().max(50),
  SemesterId: Joi.number().required(),
});

export default AddSubjectsSchema;