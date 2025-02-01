const mongoose = require('mongoose');

// Translation schema to store translated questions and answers
const TranslationSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String }
}, { _id: false });

// Main FAQ Schema
const FAQSchema = new mongoose.Schema({
  // Base (English) content
  question: { type: String, required: true },
  answer: { type: String, required: true },

  // Translated content for supported languages (e.g., Hindi, Bengali)
  translations: {
    hi: { type: TranslationSchema, default: {} },
    bn: { type: TranslationSchema, default: {} },
  },
}, { timestamps: true });

FAQSchema.methods.getTranslation = function(lang) {
  if (lang && this.translations && this.translations[lang] &&
      this.translations[lang].question && this.translations[lang].answer) {
    return {
      question: this.translations[lang].question,
      answer: this.translations[lang].answer
    };
  }
  // Fallback to English
  return { question: this.question, answer: this.answer };
};

// Export the model
module.exports = mongoose.model('FAQ', FAQSchema);
