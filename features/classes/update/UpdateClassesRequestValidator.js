import Joi from "joi";

const UpdateClassesSchema = Joi.object({
  Division: Joi.string().required().max(20),
  YearId: Joi.number().required(),
});

export default UpdateClassesSchema;