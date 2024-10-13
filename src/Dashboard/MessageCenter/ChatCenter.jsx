import React, { useEffect } from "react";
import useChatStore from "../../store/ChatStore";

const ChatCenterAdminView = () => {
  const { chats, fetchChats, setSelectedUser } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Chat Center</h1>
      <ul className="mt-4">
        {chats.map((chat) => (
          <li
            key={chat._id}
            className="flex items-center justify-between p-4 border-b"
          >
            <span>{chat.user.name}</span>
            <button
              className="text-blue-500"
              onClick={() => setSelectedUser(chat.user)}
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
