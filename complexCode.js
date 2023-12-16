/* 
   Filename: complexCode.js
   Description: This code demonstrates a complex implementation 
                of a chatbot using JavaScript.
*/

// Class representing a user with a name and a unique ID
class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  greet() {
    return `Hello, ${this.name}! How can I assist you today?`;
  }
}

// Class representing a chat message with a sender, recipient, and content
class Message {
  constructor(sender, recipient, content) {
    this.sender = sender;
    this.recipient = recipient;
    this.content = content;
  }

  sendMessage() {
    console.log(`Message sent from ${this.sender.name} to ${this.recipient.name}: ${this.content}`);
  }
}

// Class representing a chatbot that interacts with users
class Chatbot {
  constructor(name) {
    this.name = name;
  }

  processMessage(message) {
    console.log(`Processing message: ${message.content}`);
    console.log(`From: ${message.sender.name}`);
    console.log(`To: ${message.recipient.name}`);
  }

  static async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Function to simulate a user sending messages to the chatbot
async function simulateChat() {
  const user1 = new User("Alice", 1);
  const user2 = new User("Bob", 2);
  const chatbot = new Chatbot("Chatbot9000");

  console.log(user1.greet());
  console.log(user2.greet());

  await Chatbot.sleep(2000);

  const message1 = new Message(user1, chatbot, "Can you recommend a good restaurant?");
  const message2 = new Message(user2, chatbot, "What time does the movie start?");

  message1.sendMessage();
  chatbot.processMessage(message1);

  await Chatbot.sleep(3000);

  message2.sendMessage();
  chatbot.processMessage(message2);
}

// Start the chat simulation
simulateChat();