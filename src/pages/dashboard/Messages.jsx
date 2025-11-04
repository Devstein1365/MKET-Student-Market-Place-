import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaPaperPlane,
  FaImage,
  FaTimes,
  FaArrowLeft,
  FaCheckCircle,
  FaCircle,
  FaEllipsisV,
} from "react-icons/fa";
import chatService from "../../services/chatService";
import Button from "../../components/shared/Button";
import Input from "../../components/shared/Input";
import Avatar from "../../components/shared/Avatar";
import Card from "../../components/shared/Card";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      setLoading(true);
      try {
        const data = await chatService.getAllConversations();
        setConversations(data);
      } catch (error) {
        console.error("Error loading conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
      chatService.markAsRead(selectedConversation.id);
    }
  }, [selectedConversation]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Search conversations
  useEffect(() => {
    const searchChats = async () => {
      const results = await chatService.searchConversations(searchQuery);
      setConversations(results);
    };

    const debounce = setTimeout(() => {
      searchChats();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const loadMessages = async (conversationId) => {
    try {
      const data = await chatService.getMessages(conversationId);
      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // Update unread count
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() && !imagePreview) return;

    setSending(true);
    try {
      const messageData = {
        text: messageInput.trim(),
        image: imagePreview,
      };

      const newMessage = await chatService.sendMessage(
        selectedConversation.id,
        messageData
      );

      setMessages([...messages, newMessage]);
      setMessageInput("");
      setImagePreview(null);

      // Update conversation list
      setConversations((prev) =>
        prev
          .map((conv) =>
            conv.id === selectedConversation.id
              ? {
                  ...conv,
                  lastMessage: newMessage,
                  updatedAt: newMessage.timestamp,
                }
              : conv
          )
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      );
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7E22CE]"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 flex">
      {/* Conversations List - Left Sidebar */}
      <div
        className={`${
          selectedConversation ? "hidden lg:flex" : "flex"
        } w-full lg:w-96 flex-col bg-white border-r border-gray-200`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-inter font-bold text-gray-900 mb-4">
            Messages
          </h1>
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg font-instrument focus:outline-none focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaSearch className="text-4xl text-gray-400" />
              </div>
              <p className="text-gray-600 font-instrument">
                {searchQuery ? "No conversations found" : "No messages yet"}
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {conversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => handleSelectConversation(conversation)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conversation.id
                      ? "bg-[#7E22CE]/5"
                      : ""
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Avatar with online status */}
                    <div className="relative shrink-0">
                      <Avatar
                        src={conversation.participant.avatar}
                        alt={conversation.participant.name}
                        size="lg"
                      />
                      {conversation.participant.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <h3 className="font-instrument font-semibold text-gray-900 truncate">
                            {conversation.participant.name}
                          </h3>
                          {conversation.participant.verified && (
                            <FaCheckCircle className="text-[#14B8A6] text-xs shrink-0" />
                          )}
                        </div>
                        <span className="text-xs text-gray-500 font-instrument shrink-0 ml-2">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </span>
                      </div>

                      {/* Product info */}
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src={conversation.product.image}
                          alt=""
                          className="w-6 h-6 rounded object-cover"
                        />
                        <p className="text-xs text-gray-600 font-instrument truncate">
                          {conversation.product.title}
                        </p>
                      </div>

                      {/* Last message */}
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-instrument truncate ${
                            conversation.unreadCount > 0
                              ? "font-semibold text-gray-900"
                              : "text-gray-600"
                          }`}
                        >
                          {conversation.lastMessage.senderId === 0 && "You: "}
                          {conversation.lastMessage.text}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <div className="shrink-0 ml-2 w-5 h-5 bg-[#7E22CE] text-white rounded-full flex items-center justify-center text-xs font-inter font-bold">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Chat Window - Right Side */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedConversation(null)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft />
              </button>
              <div className="relative">
                <Avatar
                  src={selectedConversation.participant.avatar}
                  alt={selectedConversation.participant.name}
                  size="md"
                />
                {selectedConversation.participant.isOnline && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h2 className="font-instrument font-semibold text-gray-900">
                    {selectedConversation.participant.name}
                  </h2>
                  {selectedConversation.participant.verified && (
                    <FaCheckCircle className="text-[#14B8A6] text-xs" />
                  )}
                </div>
                <p className="text-xs text-gray-600 font-instrument">
                  {selectedConversation.participant.isOnline
                    ? "Online"
                    : `Last seen ${formatTime(
                        selectedConversation.participant.lastSeen
                      )}`}
                </p>
              </div>
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              <FaEllipsisV />
            </button>
          </div>

          {/* Product Context Banner */}
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={selectedConversation.product.image}
                alt={selectedConversation.product.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-instrument font-semibold text-gray-900 truncate">
                  {selectedConversation.product.title}
                </p>
                <p className="text-sm font-inter font-bold text-[#7E22CE]">
                  ₦
                  {parseInt(
                    selectedConversation.product.price
                  ).toLocaleString()}
                </p>
              </div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === 0;
              const showTime =
                index === 0 ||
                new Date(message.timestamp).getTime() -
                  new Date(messages[index - 1].timestamp).getTime() >
                  300000; // 5 minutes

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] ${
                      isCurrentUser ? "items-end" : "items-start"
                    } flex flex-col gap-1`}
                  >
                    {showTime && (
                      <span className="text-xs text-gray-500 font-instrument px-3">
                        {formatMessageTime(message.timestamp)}
                      </span>
                    )}
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-w-64 rounded-lg"
                      />
                    )}
                    {message.text && (
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          isCurrentUser
                            ? "bg-[#7E22CE] text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm font-instrument break-words">
                          {message.text}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-32 rounded-lg"
                />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-end gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <FaImage />
              </button>
              <div className="flex-1">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  rows={1}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl font-instrument focus:outline-none focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent resize-none"
                  style={{
                    minHeight: "40px",
                    maxHeight: "120px",
                  }}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={sending || (!messageInput.trim() && !imagePreview)}
                className="shrink-0 w-10 h-10 !rounded-full !p-0"
              >
                {sending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <FaPaperPlane />
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Empty State - No conversation selected
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-32 h-32 bg-linear-to-br from-[#7E22CE]/10 to-[#14B8A6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaPaperPlane className="text-5xl text-[#7E22CE]" />
            </div>
            <h2 className="text-2xl font-inter font-bold text-gray-900 mb-2">
              Your Messages
            </h2>
            <p className="text-gray-600 font-instrument max-w-sm">
              Select a conversation from the list to start chatting with buyers
              and sellers
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
