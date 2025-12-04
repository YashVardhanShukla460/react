// App.jsx
import { useState, useRef, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import './App.css';
import robotimage from './assets/robot.png'
import userimage from './assets/user.png'

function ChatInput({ messages, setMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText.trim() === '') return;

    setIsLoading(true);

    const newMessages = [
      ...messages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
      },
      {
        message: 'Loading....',
        sender: 'robot',
        id: crypto.randomUUID(),
      },
    ];

    const updatedMessages = [...newMessages];

    setMessages(newMessages);
    setInputText('');

    const response = await Chatbot.getResponseAsync(inputText);

    updatedMessages[updatedMessages.length - 1] = {
      message: response,
      sender: 'robot',
      id: crypto.randomUUID(),
    };

    setMessages(updatedMessages);
    setIsLoading(false);
  }

  function keyMessage(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
    if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-style">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={keyMessage}
        className="input-style"
      />
      <button
        onClick={sendMessage}
        disabled={inputText === '' || isLoading}
        className="button-style"
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div
      className={
        sender === 'user' ? 'chat-user-style' : 'chat-robot-style'
      }
    >
      {sender === 'robot' && (
        <img src={robotimage} width="50" className="img-style" alt="Robot" />
      )}
      <div className="chat-message-style">{message}</div>
      {sender === 'user' && (
        <img src={userimage} width="50" className="img-style" alt="User" />
      )}
    </div>
  );
}

function ChatMessages({ messages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-messages-style" ref={chatMessagesRef}>
      {messages.map((hola) => (
        <ChatMessage
          message={hola.message}
          sender={hola.sender}
          key={hola.id}
        />
      ))}
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([
    {
      message: 'hello chatbot',
      sender: 'user',
      id: '1',
    },
    {
      message: 'Hello! How can I help you?',
      sender: 'robot',
      id: '2',
    },
    {
      message: 'can you get me todays date?',
      sender: 'user',
      id: '3',
    },
    {
      message: 'Today is September 27',
      sender: 'robot',
      id: '4',
    },
  ]);

  return (
    <div className="app-style">
      <ChatMessages messages={messages} />
      <ChatInput messages={messages} setMessages={setMessages} />
    </div>
  );
}

export default App;
