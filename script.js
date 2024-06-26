import { GoogleGenerativeAI } from "@google/generative-ai";

const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector("#chat-text");
const sendChatBtn = document.querySelector(".chat-input span");
const inputInitHeight = chatInput.scrollHeight;
const inputGreet = document.querySelector(".greet");
const userName = localStorage.getItem("Name");
const infoBtn = document.querySelector(".info-button span");
const infoBox = document.getElementById("alertName");
const closeBtn = document.getElementById("cancel");

if(!userName == ""){
  inputGreet.innerHTML = `Hi , ${userName} 👋\nHow can I help you today?`;
}
// Fetch your API_KEY
const API_KEY = "AIzaSyBuwsaOQg95KUAh4K6E4_DQq6_yxQL3JLk";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);
  
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "You are a career advisor. Refuse to answer the questions apart from career advice. Remember your trainer Arulkathick. Be breif"
});

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "I came here to get some Eductional advice" }],
    },
    {
      role: "model",
      parts: [{ text: `Great to meet you ${userName}. What would you like to know?` }],
    },
  ],
  generationConfig: {
    maxOutputTokens: 50,
  },
});


// textarea = document.querySelector("#chat-area");
// textarea.addEventListener('input', autoResize, false);

// function autoResize() {
//     textarea.style.height = 'auto';
//     textarea.style.height = textarea.scrollHeight + 'px';
// }

// chatInput.addEventListener("input", () => {
//   // Adjust the height of the input textarea based on its content
//   console.log(inputInitHeight);
//   chatInput.style.height = 'auto';
//   // chatInput.style.height = `${inputInitHeight}px`;
//   chatInput.style.height = `${chatInput.scrollHeight}px`;
// });
// chatInput.addEventListener("keydown", (e) => {
//   // If Enter key is pressed without Shift key and the window 
//   // width is greater than 800px, handle the chat
//   if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//       e.preventDefault();
//       handleChat();
//   }
// });

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">robot_2</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
}

  async function generateResponse(chatElement,message) {
    const messageElement = chatElement.querySelector("p");
    // const prompt = "Write a story about a AI and magic"
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    messageElement.textContent = text.trim();
}

// }
const handleChat = () => {
  const userMessage = chatInput.value; // Get user entered message and remove extra whitespace
  if(!userMessage) return;
  // Clear the input textarea and set its height to default
  chatInput.value = "";
  // chatInput.style.height = `${inputInitHeight}px`;
  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    console.log(incomingChatLi.querySelector("p"));
    generateResponse(incomingChatLi,userMessage);
}, 500);
}



infoBtn.addEventListener("click",showInfo);
closeBtn.addEventListener("click",closeInfo);
sendChatBtn.addEventListener("click", handleChat);

function showInfo(){
  infoBox.style.visibility = "visible";
}

function closeInfo(){
  infoBox.style.visibility = "hidden";
}





// // A simple chatbot that responds with some predefined answers
// //  function chatbot(input) {
// //     let output = "";
// //     input = input.toLowerCase();
// //     if (input.includes("hello") || input.includes("hi")) {
// //       output = "Hello, nice to meet you!";
// //     } else if (input.includes("how are you")) {
// //       output = "I'm doing fine, thank you for asking.";
// //     } else if (input.includes("what is your name")) {
// //       output = "My name is Jarvis, I'm a chatbot.";
// //     } else if (input.includes("what can you do")) {
// //       output = "I can chat with you and answer some simple questions.";
// //     } else if (input.includes("tell me a joke")) {
// //       output = "Why did the chicken go to the seance? To get to the other side.";
// //     } else {
// //       output = "Sorry, I don't understand that. Please try something else.";
// //     }
//   //   return output1;
//   // }

//   // Display the user message on the chat
//   function displayUserMessage(message) {
//     let chat = document.getElementById("chat");
//     let userMessage = document.createElement("div");
//     userMessage.classList.add("message");
//     userMessage.classList.add("user");
//     let userAvatar = document.createElement("div");
//     userAvatar.classList.add("avatar");
//     let userText = document.createElement("div");
//     userText.classList.add("text");
//     userText.innerHTML = message;
//     userMessage.appendChild(userAvatar);
//     userMessage.appendChild(userText);
//     chat.appendChild(userMessage);
//     chat.scrollTop = chat.scrollHeight;
//   }

//   // Display the bot message on the chat
//   function displayBotMessage(message) {
//     let chat = document.getElementById("chat");
//     let botMessage = document.createElement("div");
//     botMessage.classList.add("message");
//     botMessage.classList.add("bot");
//     let botAvatar = document.createElement("div");
//     botAvatar.classList.add("avatar");
//     let botText = document.createElement("div");
//     botText.classList.add("text");
//     botText.innerHTML = message;
//     botMessage.appendChild(botAvatar);
//     botMessage.appendChild(botText);
//     chat.appendChild(botMessage);
//     chat.scrollTop = chat.scrollHeight;
//   }

  


//   // Send the user message and get the bot response
//   function sendMessage() {
//     let input = document.getElementById("input").value;
//     if (input) {
//       displayUserMessage(input);
//       run(input);
//       document.getElementById("input").value = "";
//     }
//   }

//   // Add a click event listener to the button
//   document.getElementById("button").addEventListener("click", sendMessage);

//   // Add a keypress event listener to the input
//   document.getElementById("input").addEventListener("keypress", function(event) {
//     if (event.keyCode == 13) {
//       sendMessage();
//     }
//   });