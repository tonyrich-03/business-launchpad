import type { Message, MessageThread } from "../types/message";

const THREADS_KEY = "business-launchpad-threads";

export const messageStorage = {
  // Get all threads
  getThreads: (): MessageThread[] => {
    try {
      const threads = localStorage.getItem(THREADS_KEY);
      return threads
        ? JSON.parse(threads).map((thread: any) => ({
            ...thread,
            lastMessage: new Date(thread.lastMessage),
            messages: thread.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
              replies:
                msg.replies?.map((reply: any) => ({
                  ...reply,
                  timestamp: new Date(reply.timestamp),
                })) || [],
            })),
          }))
        : [];
    } catch {
      return [];
    }
  },

  // Save threads
  saveThreads: (threads: MessageThread[]): void => {
    localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
  },

  // Get messages for a thread
  getThread: (threadId: string): MessageThread | null => {
    const threads = messageStorage.getThreads();
    return threads.find((thread) => thread.id === threadId) || null;
  },

  // Save a thread
  saveThread: (thread: MessageThread): void => {
    const threads = messageStorage.getThreads();
    const existingIndex = threads.findIndex((t) => t.id === thread.id);

    if (existingIndex >= 0) {
      threads[existingIndex] = thread;
    } else {
      threads.push(thread);
    }

    messageStorage.saveThreads(threads);
  },

  // Mark thread as read
  markThreadAsRead: (threadId: string): void => {
    const threads = messageStorage.getThreads();
    const thread = threads.find((t) => t.id === threadId);

    if (thread) {
      thread.messages.forEach((msg) => {
        msg.read = true;
      });
      thread.unreadCount = 0;
      messageStorage.saveThreads(threads);
    }
  },

  // Add a reply to a thread
  addReply: (threadId: string, reply: Message): void => {
    const threads = messageStorage.getThreads();
    const thread = threads.find((t) => t.id === threadId);

    if (thread) {
      thread.messages.push(reply);
      thread.lastMessage = new Date();
      messageStorage.saveThreads(threads);
    }
  },

  // Delete a thread
  deleteThread: (threadId: string): void => {
    const threads = messageStorage.getThreads();
    const filteredThreads = threads.filter((t) => t.id !== threadId);
    messageStorage.saveThreads(filteredThreads);
  },

  // Get unread count
  getUnreadCount: (): number => {
    const threads = messageStorage.getThreads();
    return threads.reduce((count, thread) => count + thread.unreadCount, 0);
  },
};

// Initialize with sample data if empty
export const initializeSampleData = () => {
  const threads = messageStorage.getThreads();
  if (threads.length === 0) {
    const sampleThreads: MessageThread[] = [
      {
        id: "1",
        subject: "Welcome to Business Launchpad!",
        participants: [
          {
            id: "system",
            name: "Business Launchpad Team",
            email: "team@businesslaunchpad.com",
            avatar: "🚀",
          },
          {
            id: "user",
            name: "You",
            email: "user@example.com",
          },
        ],
        messages: [
          {
            id: "1-1",
            sender: {
              id: "system",
              name: "Business Launchpad Team",
              email: "team@businesslaunchpad.com",
              avatar: "🚀",
            },
            recipient: {
              id: "user",
              name: "You",
              email: "user@example.com",
            },
            subject: "Welcome to Business Launchpad!",
            body: `Welcome to Business Launchpad! 🎉

We're excited to have you on board. This is your central hub for planning, organizing, and launching your business.

Here's what you can do:
• Plan your weekly schedule
• Track daily tasks
• Access business resources
• Collaborate with team members
• Get AI-powered suggestions

If you have any questions, just reply to this message - we're here to help!

Best regards,
The Business Launchpad Team`,
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            read: true,
            category: "support",
            priority: "normal",
          },
        ],
        lastMessage: new Date(Date.now() - 24 * 60 * 60 * 1000),
        unreadCount: 0,
      },
      {
        id: "2",
        subject: "Partnership Opportunity",
        participants: [
          {
            id: "partner1",
            name: "Sarah Chen",
            email: "sarah@techstartups.com",
            avatar: "👩‍💼",
          },
          {
            id: "user",
            name: "You",
            email: "user@example.com",
          },
        ],
        messages: [
          {
            id: "2-1",
            sender: {
              id: "partner1",
              name: "Sarah Chen",
              email: "sarah@techstartups.com",
              avatar: "👩‍💼",
            },
            recipient: {
              id: "user",
              name: "You",
              email: "user@example.com",
            },
            subject: "Partnership Opportunity",
            body: `Hi there!

I came across your business profile and was impressed by your work. I'm reaching out from TechStartups Inc. to explore potential collaboration opportunities.

We specialize in helping early-stage businesses with technology solutions and funding opportunities. Would you be open to a quick call next week to discuss how we might work together?

Looking forward to hearing from you!

Best,
Sarah Chen
Business Development Manager
TechStartups Inc.`,
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            read: false,
            category: "collaboration",
            priority: "high",
          },
        ],
        lastMessage: new Date(Date.now() - 2 * 60 * 60 * 1000),
        unreadCount: 1,
      },
      {
        id: "3",
        subject: "Question about your pricing",
        participants: [
          {
            id: "customer1",
            name: "Mike Rodriguez",
            email: "mike@example.com",
            avatar: "👨‍💼",
          },
          {
            id: "user",
            name: "You",
            email: "user@example.com",
          },
        ],
        messages: [
          {
            id: "3-1",
            sender: {
              id: "customer1",
              name: "Mike Rodriguez",
              email: "mike@example.com",
              avatar: "👨‍💼",
            },
            recipient: {
              id: "user",
              name: "You",
              email: "user@example.com",
            },
            subject: "Question about your pricing",
            body: `Hello,

I'm interested in your services but had a question about your pricing structure. Do you offer any custom packages for startups, or is it strictly the plans listed on your website?

Also, are there any discounts for annual commitments?

Thanks,
Mike Rodriguez`,
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
            read: true,
            category: "inquiry",
            priority: "normal",
          },
        ],
        lastMessage: new Date(Date.now() - 5 * 60 * 60 * 1000),
        unreadCount: 0,
      },
    ];

    messageStorage.saveThreads(sampleThreads);
  }
};
