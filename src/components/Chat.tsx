import React, { useEffect, useRef, useState } from "react";

interface Message {
  sender: string;
  text: string;
}

interface ChatProps {
  messages: Message[];
  sendMessage: (message: string) => void;
  maxHeight: string;
}

const Chat: React.FC<ChatProps> = ({
  messages,
  sendMessage,
  maxHeight = "230px",
}) => {
  const [inputMessage, setInputMessage] = useState("");

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSendClick = () => {
    if (inputMessage.trim() !== "") {
      sendMessage(inputMessage);
      setInputMessage(""); // Réinitialisez l'état local après l'envoi
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  // Utilisez useEffect pour ajuster la hauteur maximale en fonction du contenu
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative rounded h-[450px] px-4 mt-5 lg:shadow-md lg:p-2 lg:mt-0 lg:block hidden ">
      <h2 className="text-xl font-semibold mb-4 font-mono text-center">Chat</h2>
      <div
        className={`chat ${maxHeight} overflow-y-auto`}
        ref={chatContainerRef}
      >
        <div className="messages">
          {messages &&
            messages.map((message, index) => (
              <div className="message" key={index}>
                <span className="font-semibold mr-1">{message.sender}:</span>
                <span className="text-sm">{message.text}</span>
              </div>
            ))}
        </div>
        <div className="input absolute bottom-0 left-0 w-full flex items-center">
          <input
            type="text"
            className="w-full p-2 rounded border-2 border-blue-500"
            placeholder="Message"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded border-2 border-blue-500"
            onClick={handleSendClick}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
