import Joi from "joi";

const AddAttachmentTypes = Joi.object({
  Extension: Joi.string().required().max(50),
});

export default AddAttachmentTypes;