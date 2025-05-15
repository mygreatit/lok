# LaconiX AI Sales Assistant Setup Guide

## Overview

The LaconiX AI Sales Assistant is a powerful, AI-driven conversational agent designed to boost your sales conversion rates. It uses advanced natural language processing via the Groq API to deliver persuasive, personalized responses that guide potential customers through the sales funnel.

## Getting Started with Groq API

For the best, most intelligent conversational experience, connect the chatbot to the Groq API:

1. Create a Groq account at https://console.groq.com/
2. Navigate to "API Keys" in your dashboard and create a new API key
3. Create a `.env` file in the root of the client directory with this content:

```
# Groq API Configuration
VITE_GROQ_API_KEY=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
VITE_GROQ_API_URL=https://api.groq.com/openai/v1
VITE_GROQ_MODEL=llama3-70b-8192
```

4. Replace `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` with the API key you generated
5. Restart your development server to apply the changes

## Model Selection

The LaconiX AI is configured to use the powerful `llama3-70b-8192` model by default, which provides excellent sales-focused responses. Other options include:

- `llama3-70b-8192`: Best overall performance and persuasiveness (recommended)
- `llama3-8b-8192`: Faster responses but less nuanced
- `mixtral-8x7b-32768`: Good performance with longer context handling

Change the model by updating the `VITE_GROQ_MODEL` variable in your `.env` file.

## Monitoring Usage and Performance

The chatbot includes built-in console logging to help you monitor API calls. Check your browser's developer console to see:
- When API calls are attempted
- The success/failure status of calls
- Fallback to the backup response system when needed

## Optimizing Sales Performance

The AI assistant is designed to prioritize sales conversions. To maximize its effectiveness:

1. **Track conversion data**: Monitor which conversations lead to successful sales or consultations
2. **Review chat logs**: Analyze user interactions to identify common objections or questions
3. **Update system prompt**: Enhance the sales approach by modifying the system prompt in `chatService.ts`
4. **Expand fallback responses**: Add more industry-specific responses to the `fallbackResponses` array
5. **Implement lead capture**: Consider adding a form to collect user contact information directly

## Troubleshooting

If your chatbot is not using the Groq API:

1. Check that your `.env` file is properly formatted and in the correct location
2. Verify your API key is valid and has not expired
3. Look for any CORS errors in the browser console
4. Ensure you have sufficient credits in your Groq account
5. Try a different model in case you're hitting rate limits

If you're still experiencing issues, the chatbot will automatically use its intelligent fallback system to maintain sales conversations even without API connectivity.

## Getting Support

For assistance with the LaconiX AI Sales Assistant, contact our development team at support@laconix.com or call +880 1778011899. 