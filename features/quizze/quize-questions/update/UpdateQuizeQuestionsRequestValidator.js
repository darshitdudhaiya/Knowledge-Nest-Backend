import Joi from "joi";

const UpdateQuizeQuestionsSchema = Joi.object({
  Question: Joi.string().required().max(300),
  QuizeId: Joi.number().required()
});

export default UpdateQuizeQuestionsSchema;