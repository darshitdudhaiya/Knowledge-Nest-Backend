import Joi from "joi";

const UpdateQuestionOptionsSchema = Joi.object({
  Value: Joi.string().required().max(100),
  IsCorrect: Joi.boolean().default(false),
  QuestionId: Joi.number().required()
});

export default UpdateQuestionOptionsSchema;