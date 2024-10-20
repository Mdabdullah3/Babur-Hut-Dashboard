import React, { useEffect } from "react";
import useChatStore from "../../store/ChatStore";

const ChatCenterAdminView = () => {
  const { chats, fetchChats } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleViewChat = (chatId) => {
    // Handle view chat logic here
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Vendor Chat Center</h1>
      <ul className="mt-4">
        {chats?.map((chat) => (
          <li
            key={chat?._id}
            className="flex items-center justify-between p-4 border-b"
          >
            <span>{chat?.name}</span>
            <button
              className="text-blue-500"
              onClick={() => handleViewChat(chat?._id)}
            >
              View Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatCenterAdminView;
