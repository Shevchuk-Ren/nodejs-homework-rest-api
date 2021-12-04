const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru', 'ua'] } }).required(),
})

module.exports = contactSchema
