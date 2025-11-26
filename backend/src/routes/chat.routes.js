const express = require("express");
const router = express.Router();

const chatController = require('../controllers/chat.controller');
const authMiddleware = require("../middleware/auth.middleware");

// All routes are protected - user must be logged in
router.post('/create', authMiddleware, chatController.createChat);
router.get('/history', authMiddleware, chatController.getAllChats);
router.get('/:id', authMiddleware, chatController.getChatById);
router.put('/:id/message', authMiddleware, chatController.addMessage);
router.delete('/:id', authMiddleware, chatController.deleteChat);
router.put('/:id/title', authMiddleware, chatController.updateChatTitle);

module.exports = router;