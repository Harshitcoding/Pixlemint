const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require('../models/chat.model');

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.review = async (req, res) => {
    try {
        const { code, chatId } = req.body;
        const userId = req.user?.id;

        if (!code) {
            return res.status(400).json({ message: "Code is required" });
        }

        const model = genAi.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });

        const result = await model.generateContent(`
            You are a code optimizer. Only output the optimized code. 
            No explanation. No markdown. No comments.
            ${code}
        `);

        // FIX: Correct extraction for Gemini 2.5
        const reviewText =
            result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        if (!reviewText.trim()) {
            return res.status(500).json({ message: "AI returned empty response" });
        }

        let savedChat = null;

        if (userId) {
            if (chatId) {
                // Update existing chat
                savedChat = await Chat.findOne({ _id: chatId, userId });

                if (!savedChat) {
                    return res.status(404).json({ message: "Chat not found" });
                }

                savedChat.messages.push(
                    { type: "user", content: code, timestamp: new Date() },
                    { type: "ai", content: reviewText, timestamp: new Date() }
                );

                // If first user message → set preview
                if (savedChat.messages.length === 2) {
                    savedChat.preview = code.slice(0, 60);
                }

                await savedChat.save();
            } else {
                // Create new chat
                savedChat = await Chat.create({
                    userId,
                    title: "Code Review",
                    preview: code.slice(0, 60),
                    messages: [
                        { type: "user", content: code, timestamp: new Date() },
                        { type: "ai", content: reviewText, timestamp: new Date() }
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
