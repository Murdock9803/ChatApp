// Demo data for the chat application: 10 contacts and 1-10 messages per contact

export const generateDemoData = () => {
  const contacts = [
    { id: 1, name: 'Alice Johnson', avatar: 'AJ', online: true, lastSeen: new Date().toISOString() },
    { id: 2, name: 'Bob Smith', avatar: 'BS', online: false, lastSeen: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, name: 'Carol Williams', avatar: 'CW', online: true, lastSeen: new Date().toISOString() },
    { id: 4, name: 'David Brown', avatar: 'DB', online: false, lastSeen: new Date(Date.now() - 7200000).toISOString() },
    { id: 5, name: 'Emma Davis', avatar: 'ED', online: true, lastSeen: new Date().toISOString() },
    { id: 6, name: 'Frank Miller', avatar: 'FM', online: false, lastSeen: new Date(Date.now() - 10800000).toISOString() },
    { id: 7, name: 'Grace Wilson', avatar: 'GW', online: true, lastSeen: new Date().toISOString() },
    { id: 8, name: 'Henry Moore', avatar: 'HM', online: false, lastSeen: new Date(Date.now() - 14400000).toISOString() },
    { id: 9, name: 'Iris Taylor', avatar: 'IT', online: true, lastSeen: new Date().toISOString() },
    { id: 10, name: 'Jack Anderson', avatar: 'JA', online: false, lastSeen: new Date(Date.now() - 18000000).toISOString() },
  ];

  const messageTemplates = [
    "Hey! How are you doing?",
    "Did you see the news today?",
    "Let's meet up sometime this week",
    "Thanks for your help yesterday!",
    "I'm running a bit late",
    "What time works best for you?",
    "That sounds like a great idea",
    "I'll send you the details later",
    "Hope you're having a good day",
    "Let me know when you're free",
    "I agree with you completely",
    "That's really interesting!",
    "Can you help me with something?",
    "I'll be there in 10 minutes",
    "Thanks for letting me know",
    "See you soon!",
    "Have a great weekend",
    "I'm looking forward to it",
    "That was really helpful",
    "Talk to you later",
    "👍",
    "😊",
    "No problem at all",
    "Sounds good to me",
    "I'll check and get back to you",
  ];

  const messages = [];
  let messageId = 1;

  // Generating messages for each contact
  contacts.forEach((contact) => {
    const messageCount = Math.floor(Math.random() * 10) + 1; // 20-30 messages
    
    for (let i = 0; i < messageCount; i++) {
      const isSent = Math.random() > 0.5; // Random sent/received
      const timestamp = new Date(Date.now() - (messageCount - i) * 300000).toISOString(); // 5 min intervals
      
      messages.push({
        id: messageId++,
        contactId: contact.id,
        text: messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
        isSent,
        status: isSent ? (Math.random() > 0.3 ? 'delivered' : 'sent') : 'delivered',
        timestamp,
        synced: Math.random() > 0.1, // 90% synced
      });
    }
  });

  return { contacts, messages };
};
