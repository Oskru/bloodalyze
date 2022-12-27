const mongoose = require('mongoose');
const Joi = require('joi');

const resultSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // user id
  testDate: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  testName: { type: String, required: true },
  elements: {
    hemoglobin: { type: String, required: false },
    hematocrit: { type: String, required: false },
    rbc: { type: String, required: false },
    wbc: { type: String, required: false },
    neutrophils: { type: String, required: false },
    mcv: { type: String, required: false },
    mch: { type: String, required: false },
    platelets: { type: String, required: false },
    lymphocytes: { type: String, required: false },
    monocytes: { type: String, required: false },
    eosinophils: { type: String, required: false },
    basophils: { type: String, required: false },
  },
});

const Result = mongoose.model('result', resultSchema);

const validate = (data) => {
  const schema = Joi.object({
    testDate: Joi.string().required().label('Test date'),
    testName: Joi.string().required().label('Test name'),
    elements: Joi.object().required().label('Elements'),
  });
  return schema.validate(data);
};

module.exports = { Result, validate };
