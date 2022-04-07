const Joi = require('joi');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { error } = schema.validate(data);
    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    return res.status(200).json({ success: true, data: data });
  }
}

const schema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  company: Joi.string().required(),
  loadNumber: Joi.string().required(),
  customerName: Joi.string().required(),
  containerNumber: Joi.string().required(),
});
