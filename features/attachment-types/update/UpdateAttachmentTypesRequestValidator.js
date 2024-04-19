import Joi from "joi";

const UpdateAttachmentTypesSchema = Joi.object({
  Extension: Joi.string().required().max(50),
});

export default UpdateAttachmentTypesSchema;