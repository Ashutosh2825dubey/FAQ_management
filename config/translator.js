const translate = require('@vitalets/google-translate-api');

const translateText = async (text, targetLang) => {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (error) {
    console.error(`Translation error for lang ${targetLang}:`, error.message);
    return text;
  }
};

module.exports = { translateText };
