import Joi from "joi";

const AddClassesSchema = Joi.object({
  Division: Joi.string().required().max(20),
  YearId: Joi.number().required(),
});

export default AddClassesSchema;