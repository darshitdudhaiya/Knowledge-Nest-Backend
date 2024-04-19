import Joi from "joi";

const QuizzesSchema = Joi.object({
  Title: Joi.string().required().max(50),
  Description: Joi.string().required().max(300),
  LastSubmissionDate: Joi.date().required(),
  Marks: Joi.number().required(),
  PassingMarks: Joi.number().required(),
  TotalQuestions: Joi.number().required(),
  UserId: Joi.number().required(),
  SubjectId: Joi.number().required(),
  ClassId: Joi.number().required()
});

export default QuizzesSchema;