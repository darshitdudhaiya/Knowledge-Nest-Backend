import Joi from "joi";

const AddSemestersSchema = Joi.object({
  Semester: Joi.number().required(),
  YearId: Joi.number().required(),
});

export default AddSemestersSchema;