// Mock Chat/Messaging Service
// This simulates chat functionality and will be replaced with real backend + WebSocket later

const mockConversations = [
  {
    id: 1,
    participant: {
      id: 2,
      name: "Aisha Mohammed",
      avatar: null,
      verified: true,
      isOnline: true,
    },
    product: {
      id: 1,
      title: "iPhone 13 Pro Max 256GB",
      image:
        "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400",
      price: 450000,
    },
    lastMessage: {
      id: 5,
      text: "Yes, battery health is at 95%. Would you like to see more pictures?",
      senderId: 2,
      timestamp: "2025-11-04T14:30:00Z",
      isRead: false,
    },
    unreadCount: 2,
    updatedAt: "2025-11-04T14:30:00Z",
  },
  {
    id: 2,
    participant: {
      id: 4,
      name: "Ibrahim Usman",
      avatar: null,
      verified: true,
      isOnline: false,
      lastSeen: "2025-11-04T12:00:00Z",
    },
    product: {
      id: 4,
      title: "Gaming Laptop - ASUS ROG",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
      price: 650000,
    },
    lastMessage: {
      id: 12,
      text: "Okay, I'll check it out tomorrow. Thanks!",
      senderId: 0, // Current user
      timestamp: "2025-11-04T10:15:00Z",
      isRead: true,
    },
    unreadCount: 0,
    updatedAt: "2025-11-04T10:15:00Z",
  },
  {
    id: 3,
    participant: {
      id: 3,
      name: "Fatima Yusuf",
      avatar: null,
      verified: false,
      isOnline: true,
    },
    product: {
      id: 3,
      title: "Engineering Mathematics Textbook Set",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      price: 15000,
    },
    lastMessage: {
      id: 8,
      text: "The books are in great condition, barely used. I can meet at Main Campus.",
      senderId: 3,
      timestamp: "2025-11-03T16:45:00Z",
      isRead: true,
    },
    unreadCount: 0,
    updatedAt: "2025-11-03T16:45:00Z",
  },
  {
    id: 4,
    participant: {
      id: 5,
      name: "Chioma Nwosu",
      avatar: null,
      verified: true,
      isOnline: false,
      lastSeen: "2025-11-03T20:30:00Z",
    },
    product: {
      id: 7,
      title: "Canon Camera DSLR",
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
      price: 280000,
    },
    lastMessage: {
      id: 15,
      text: "Is this still available?",
      senderId: 0,
      timestamp: "2025-11-03T15:20:00Z",
      isRead: true,
    },
    unreadCount: 0,
    updatedAt: "2025-11-03T15:20:00Z",
  },
];

const mockMessages = {
  1: [
    {
      id: 1,
      text: "Hello! I'm interested in the iPhone. Is it still available?",
      senderId: 0,
      timestamp: "2025-11-04T13:00:00Z",
      isRead: true,
    },
    {
      id: 2,
      text: "Yes, it's available! Would you like to know more about it?",
      senderId: 2,
      timestamp: "2025-11-04T13:05:00Z",
      isRead: true,
    },
    {
      id: 3,
      text: "Great! What's the battery health? Any issues with the phone?",
      senderId: 0,
      timestamp: "2025-11-04T13:10:00Z",
      isRead: true,
    },
    {
      id: 4,
      text: "No issues at all. Everything works perfectly.",
      senderId: 2,
      timestamp: "2025-11-04T14:00:00Z",
      isRead: true,
    },
    {
      id: 5,
      text: "Yes, battery health is at 95%. Would you like to see more pictures?",
      senderId: 2,
      timestamp: "2025-11-04T14:30:00Z",
      isRead: false,
    },
  ],
  2: [
    {
      id: 9,
      text: "Hi! Is the laptop still available?",
      senderId: 0,
      timestamp: "2025-11-04T09:00:00Z",
      isRead: true,
    },
    {
      id: 10,
      text: "Yes! It's available. Would you like to meet up?",
      senderId: 4,
      timestamp: "2025-11-04T09:30:00Z",
      isRead: true,
    },
    {
      id: 11,
      text: "Sure! Where are you located?",
      senderId: 0,
      timestamp: "2025-11-04T09:45:00Z",
      isRead: true,
    },
    {
      id: 12,
      text: "Okay, I'll check it out tomorrow. Thanks!",
      senderId: 0,
      timestamp: "2025-11-04T10:15:00Z",
      isRead: true,
    },
  ],
  3: [
    {
      id: 6,
      text: "Hi! I need the Engineering Math books. Are they available?",
      senderId: 0,
      timestamp: "2025-11-03T16:00:00Z",
      isRead: true,
    },
    {
      id: 7,
      text: "Yes! All volumes are available.",
      senderId: 3,
      timestamp: "2025-11-03T16:20:00Z",
      isRead: true,
    },
    {
      id: 8,
      text: "The books are in great condition, barely used. I can meet at Main Campus.",
      senderId: 3,
      timestamp: "2025-11-03T16:45:00Z",
      isRead: true,
    },
  ],
  4: [
    {
      id: 13,
      text: "Hi! I saw your Canon camera listing.",
      senderId: 0,
      timestamp: "2025-11-03T15:00:00Z",
      isRead: true,
    },
    {
      id: 14,
      text: "Yes, it's a great camera!",
      senderId: 5,
      timestamp: "2025-11-03T15:10:00Z",
      isRead: true,
    },
    {
      id: 15,
      text: "Is this still available?",
      senderId: 0,
      timestamp: "2025-11-03T15:20:00Z",
      isRead: true,
    },
  ],
};

// Service functions
export const chatService = {
  // Get all conversations
  getAllConversations: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          [...mockConversations].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          )
        );
      }, 300);
    });
  },

  // Get conversation by ID
  getConversationById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const conversation = mockConversations.find(
          (c) => c.id === parseInt(id)
        );
        if (conversation) {
          resolve(conversation);
        } else {
          reject(new Error("Conversation not found"));
        }
      }, 300);
    });
  },

  // Get messages for a conversation
  getMessages: (conversationId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Handle both numeric IDs and string IDs (for new conversations like "new-5")
        const messages = mockMessages[conversationId] || [];
        resolve(messages);
      }, 300);
    });
  },

  // Send a message
  sendMessage: (conversationId, messageData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage = {
          id: Date.now(),
          text: messageData.text,
          image: messageData.image || null,
          senderId: 0, // Current user
          timestamp: new Date().toISOString(),
          isRead: false,
        };

        // Store the message in mockMessages for the conversation
        if (!mockMessages[conversationId]) {
          mockMessages[conversationId] = [];
        }
        mockMessages[conversationId].push(newMessage);

        // Update conversation's last message
        const conversation = mockConversations.find(
          (c) => c.id === parseInt(conversationId) || c.id === conversationId
        );
        if (conversation) {
          conversation.lastMessage = newMessage;
          conversation.updatedAt = newMessage.timestamp;
        }

        resolve(newMessage);
      }, 300);
    });
  },

  // Mark messages as read
  markAsRead: (conversationId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const conversation = mockConversations.find(
          (c) => c.id === parseInt(conversationId)
        );
        if (conversation) {
          conversation.unreadCount = 0;

          // Mark all messages as read
          const messages = mockMessages[conversationId] || [];
          messages.forEach((msg) => {
            if (msg.senderId !== 0) {
              msg.isRead = true;
            }
          });
        }
        resolve();
      }, 100);
    });
  },

  // Search conversations
  searchConversations: (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!query.trim()) {
          resolve([...mockConversations]);
          return;
        }

        const filtered = mockConversations.filter((conv) => {
          const nameMatch = conv.participant.name
            .toLowerCase()
            .includes(query.toLowerCase());
          const productMatch = conv.product.title
            .toLowerCase()
            .includes(query.toLowerCase());
          const messageMatch = conv.lastMessage.text
            .toLowerCase()
            .includes(query.toLowerCase());
          return nameMatch || productMatch || messageMatch;
        });

        resolve(filtered);
      }, 200);
    });
  },

  // Get unread count
  getUnreadCount: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const total = mockConversations.reduce(
          (sum, conv) => sum + conv.unreadCount,
          0
        );
        resolve(total);
      }, 100);
    });
  },
};

export default chatService;
