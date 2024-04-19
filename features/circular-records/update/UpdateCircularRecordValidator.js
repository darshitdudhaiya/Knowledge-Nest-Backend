import Joi from "joi";

const UpdateCircularRecordsSchema = Joi.object({
  UserId:Joi.number().required(),
  CircularId:Joi.number().required(),
  Record:Joi.string().required()
});

export default UpdateCircularRecordsSchema;