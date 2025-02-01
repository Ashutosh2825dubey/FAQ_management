const FAQ = require('../models/faq');
const redisClient = require('../config/redis');

// Cache key generator based on language
const getCacheKey = (lang) => `faqs_${lang || 'en'}`;

exports.getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || process.env.DEFAULT_LANG || 'en';
    const cacheKey = getCacheKey(lang);

    // Check if FAQs are cached in Redis
    const cachedFAQs = await redisClient.get(cacheKey);
    if (cachedFAQs) {
      console.log('Cache Hit! Returning data from Redis.');
      return res.render('faqOutput', { 
        faqs: JSON.parse(cachedFAQs),
        heading: getHeadingTranslation(lang)
      });
    }

    console.log('Cache Miss! Fetching from MongoDB.');

    // Fetch FAQs from MongoDB
    const faqs = await FAQ.find({});
    const translatedFaqs = faqs.map(faq => {
      // Use the FAQ model's getTranslation method to obtain the proper language.
      const content = faq.getTranslation(lang);
      return {
        id: faq._id,
        question: content.question,
        answer: content.answer
      };
    });

   
    await redisClient.setEx(cacheKey, 10, JSON.stringify(translatedFaqs));

    res.status(200).render('faqOutput', { 
      faqs: translatedFaqs,
      heading: getHeadingTranslation(lang)
    });
  } catch (error) {
    console.error('Error in getFAQs:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const getHeadingTranslation = (lang) => {
  switch (lang) {
    case 'hi':
      return 'सामान्य प्रश्न';
    case 'bn':
      return 'সাধারণ প্রশ্ন';
    default:
      return 'Frequently Asked Questions';
  }
};
