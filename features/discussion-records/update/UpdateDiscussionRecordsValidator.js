import Joi from "joi";

const UpdateDiscussionRecordsSchema = Joi.object({
  UserId:Joi.number().required(),
  DiscussionId:Joi.number().required(),
  Record:Joi.string().required()
});

export default UpdateDiscussionRecordsSchema;