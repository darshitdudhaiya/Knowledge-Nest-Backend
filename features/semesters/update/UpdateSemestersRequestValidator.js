import Joi from "joi";

const UpdateSemestersSchema = Joi.object({
  Semester: Joi.number().required(),
  StreamId: Joi.number().required(),
});

export default UpdateSemestersSchema;