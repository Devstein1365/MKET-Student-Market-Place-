// Google Gemini AI Service for Product Description Generation

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Generate product description using Google Gemini AI
 * @param {Object} productData - Product information
 * @param {string} productData.title - Product title
 * @param {string} productData.category - Product category
 * @param {string} productData.condition - Product condition (New, Used, Fairly Used)
 * @param {string} productData.price - Product price
 * @param {string} productData.location - Product location
 * @returns {Promise<string>} Generated description
 */
export const generateProductDescription = async (productData) => {
  try {
    const { title, category, condition, price, location } = productData;

    // Create a prompt for Gemini
    const prompt = `You are a helpful assistant for a student marketplace called MKET at Federal University of Technology, Minna (FUTMINNA), Nigeria.

Generate a compelling and detailed product description for the following item:

Product Title: ${title}
Category: ${category}
Condition: ${condition}
Price: ₦${parseInt(price).toLocaleString()}
Location: ${location}

Requirements:
1. Write in a friendly, professional tone suitable for students
2. Highlight the key features and benefits
3. Mention the condition clearly
4. Keep it concise (3-4 sentences, max 150 words)
5. Make it appealing to FUTMINNA students
6. Include relevant details about the product
7. Use Nigerian English and context
8. Don't use markdown or special formatting
9. Make it sound natural and conversational

Generate the description now:`;

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error("Failed to generate description");
    }

    const data = await response.json();

    // Extract the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No description generated");
    }

    // Clean up the generated text (remove extra whitespace, etc.)
    return generatedText.trim();
  } catch (error) {
    console.error("Error generating description:", error);
    throw error;
  }
};

export default {
  generateProductDescription,
};
