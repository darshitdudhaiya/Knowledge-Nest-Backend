import Joi from "joi";

const QuizeQuestionsSchema = Joi.object({
  Question: Joi.string().required().max(300),
  QuizeId: Joi.number().required()
});

export default QuizeQuestionsSchema;