const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require('../models/chat.model');

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.review = async (req, res) => {
    try {
        const { code, chatId } = req.body;
        const userId = req.user?.id; // Optional - if user is logged in

        if (!code) {
            return res.status(400).json({ message: "Code is required" });
        }

        const model = genAi.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });

        const result = await model.generateContent(
            `You are a code optimizer. 
Whenever I give you messy, unoptimized, low-quality, badly written code, 
your response should ONLY contain:

1. The fully optimized, refactored, clean version of the code.
2. Keep the logic same unless broken.
3. Do not explain anything.
4. No bullet points, no paragraphs, no descriptions.
5. Only give me the final improved code.

If the input code has issues, fix them silently.
If naming is bad, improve names silently.
If performance is bad, optimize silently.
If structure is bad, rewrite it cleanly.

Your entire response must only be optimized code.

            ${code}
            `
        );

        const reviewText = result.response.text();

        // Save to database if user is logged in
        let savedChat = null;
        if (userId) {
            if (chatId) {
                // Add to existing chat
                savedChat = await Chat.findOne({ _id: chatId, userId });
                
                if (savedChat) {
                    savedChat.messages.push(
                        { type: 'user', content: code, timestamp: new Date() },
                        { type: 'ai', content: reviewText, timestamp: new Date() }
                    );
                    await savedChat.save();
                }
            } else {
                // Create new chat
                const preview = code.slice(0, 60);
                savedChat = await Chat.create({
                    userId,
                    title: 'Code Review',
                    preview,
                    messages: [
                        { type: 'user', content: code, timestamp: new Date() },
                        { type: 'ai', content: reviewText, timestamp: new Date() }
                    ]
                });
            }
        }

        return res.json({ 
            review: reviewText,
            chatId: savedChat?._id || null
        });

    } catch (error) {
        console.error("Review error:", error);
        return res.status(500).json({ message: "AI Review failed" });
    }
};