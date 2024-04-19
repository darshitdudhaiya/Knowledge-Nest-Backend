import Joi from "joi";

const AddCircularRecordsSchema = Joi.object({
  UserId:Joi.number().required(),
  CircularId:Joi.number().required(),
  Record:Joi.string().required()
});

export default AddCircularRecordsSchema;