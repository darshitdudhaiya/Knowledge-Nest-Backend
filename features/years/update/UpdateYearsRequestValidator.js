import Joi from "joi";

const UpdateYearsSchema = Joi.object({
  Name: Joi.string().required().max(100),
  StreamId: Joi.number().required(),
});

export default UpdateYearsSchema;