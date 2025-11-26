const Chat =  require("../models/chat.model")

exports.createChat = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, preview } = req.body;

        const chat = await Chat.create({
            userId,
            title: title || "New Chat",
            preview: preview || "",
            messages: []
        });

        return res.status(201).json({ success: true, data: chat });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}


exports.getAllChats = async (req, res) => {
    try {
        const userId = req.user.id;

        const chats = await Chat.find({ userId })
            .select("title preview createdAt updatedAt")
            .sort({ updatedAt: -1 });

        return res.json({ success: true, data: chats });

    } catch (error) {
        console.error("Get chats error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.getChatById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const chat = await Chat.findOne({ _id: id, userId });

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        return res.json({ success: true, data: chat });

    } catch (error) {
        console.error("Get chat error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.addMessage = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { type, content } = req.body;

        if (!type || !content) {
            return res.status(400).json({
                success: false,
                message: "type and content are required"
            });
        }

        const chat = await Chat.findOne({ _id: id, userId });
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        chat.messages.push({
            type,
            content,
            timestamp: new Date()
        });

        // Set preview for first message
        if (chat.messages.length === 1 && type === 'user') {
            chat.preview = content.slice(0, 60);
        }

        await chat.save();

        return res.json({ success: true, data: chat });

    } catch (error) {
        console.error("Add message error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.deleteChat = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const chat = await Chat.findOneAndDelete({ _id: id, userId });

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        return res.json({ success: true, message: "Chat deleted" });

    } catch (error) {
        console.error("Delete chat error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.updateChatTitle = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const chat = await Chat.findOneAndUpdate(
            { _id: id, userId },
            { title },
            { new: true }
        );

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        return res.json({ success: true, data: chat });

    } catch (error) {
        console.error("Update chat title error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
