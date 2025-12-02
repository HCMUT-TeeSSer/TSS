import { useEffect, useState, useMemo } from "react";
import type { User } from "@/types/user.type";
import type { Message } from "@/types/message.type";
import { getMessages, saveMessage } from "@/utils/chat";

interface ChatBoxProps {
  currentUser: User;
  onClose: () => void;
}

export const NotificationBox = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className='animate-fadeIn absolute right-0 z-[200] mt-2 max-h-96 w-80 overflow-y-auto rounded-lg border bg-white p-4 shadow-lg'>
      <div className='mb-2 flex items-center justify-between'>
        <h4 className='font-semibold'>Thông báo</h4>
        <button onClick={onClose} className='text-sm text-gray-500 hover:text-gray-700'>
          Đóng
        </button>
      </div>

      <div className='text-sm text-gray-500'>Chưa có thông báo nào</div>
    </div>
  );
};

export const ChatBox = ({ currentUser, onClose }: ChatBoxProps) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [chatUsers, setChatUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState<Record<string, number>>({});
  const [input, setInput] = useState("");

  useEffect(() => {
    const allUsersJson = localStorage.getItem("users");
    if (allUsersJson) {
      const users = JSON.parse(allUsersJson) as User[];
      setTimeout(() => {
        setAllUsers(users.filter((u) => u.id !== currentUser.id));
      }, 0);
    }
  }, [currentUser.id]);

  const sortedChatUsers = useMemo(() => {
    const msgs = getMessages();
    const chattedIDs = new Set<string>();
    msgs.forEach((m) => {
      if (m.from.id === currentUser.id) chattedIDs.add(m.to.id);
      if (m.to.id === currentUser.id) chattedIDs.add(m.from.id);
    });
    const list = allUsers.filter((u) => chattedIDs.has(u.id));
    return list.sort((a, b) => {
      const last = (u: User) =>
        msgs.filter((m) => m.from.id === u.id || m.to.id === u.id).sort((x, y) => y.timestamp - x.timestamp)[0]
          ?.timestamp ?? 0;
      return last(b) - last(a);
    });
  }, [allUsers, currentUser.id]);

  useEffect(() => {
    setChatUsers(sortedChatUsers);
    setFilteredUsers(sortedChatUsers);
  }, [sortedChatUsers]);

  useEffect(() => {
    const t = search.toLowerCase();

    if (!t) {
      setFilteredUsers(chatUsers);
      return;
    }

    const match = allUsers.filter((u) => u.fullName.toLowerCase().includes(t));

    const merged = [...chatUsers, ...match.filter((u) => !chatUsers.some((c) => c.id === u.id))];

    setFilteredUsers(merged);
  }, [search, chatUsers, allUsers]);

  useEffect(() => {
    if (!selectedUser) return;

    const all = getMessages();

    const updated = all.map((m) => {
      if (m.to.id === currentUser.id && m.from.id === selectedUser.id) {
        return { ...m, read: true };
      }
      return m;
    });

    localStorage.setItem("messages", JSON.stringify(updated));

    const chatMsgs = updated.filter(
      (m) =>
        (m.from.id === currentUser.id && m.to.id === selectedUser.id) ||
        (m.from.id === selectedUser.id && m.to.id === currentUser.id)
    );

    setMessages(chatMsgs);

    setUnread((prev) => ({ ...prev, [selectedUser.id]: 0 }));
  }, [selectedUser, currentUser]);

  useEffect(() => {
    const msgs = getMessages();
    const counter: Record<string, number> = {};

    msgs.forEach((m) => {
      if (m.to.id === currentUser.id && !m.read) {
        counter[m.from.id] = (counter[m.from.id] ?? 0) + 1;
      }
    });

    setUnread((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(counter)) {
        return counter;
      }
      return prev;
    });
  }, [currentUser.id]);

  useEffect(() => {
    const total = Object.values(unread).reduce((a, b) => a + b, 0);
    localStorage.setItem("totalUnread", String(total));
  }, [unread]);

  const handleSend = () => {
    if (!input.trim() || !selectedUser) return;

    const msg: Message = {
      id: `${Date.now().toString()}-${Math.random().toString()}`,
      from: currentUser,
      to: selectedUser,
      text: input.trim(),
      timestamp: Date.now(),
      read: false,
    };

    saveMessage(msg);
    setMessages((prev) => [...prev, msg]);
    setInput("");

    setChatUsers((prev) => {
      const rest = prev.filter((u) => u.id !== selectedUser.id);
      return [selectedUser, ...rest];
    });
  };

  const handleDeleteMessage = (msgId: string) => {
    const all = getMessages().map((m) => {
      if (m.id === msgId) {
        return { ...m, text: "Tin nhắn đã được thu hồi", revoked: true };
      }
      return m;
    });

    localStorage.setItem("messages", JSON.stringify(all));

    if (selectedUser) {
      const chatMsgs = all.filter(
        (m) =>
          (m.from.id === currentUser.id && m.to.id === selectedUser.id) ||
          (m.from.id === selectedUser.id && m.to.id === currentUser.id)
      );
      setMessages(chatMsgs);
    }
  };

  return (
    <div className='fixed inset-0 z-[90] flex items-center justify-center bg-black/30'>
      <div className='flex h-[520px] w-[750px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl'>
        {/* LEFT SIDEBAR */}
        <div className='flex w-1/3 flex-col border-r border-gray-200 bg-gray-50'>
          {/* TITLE */}
          <div className='flex h-14 items-center border-b border-gray-300 bg-white px-4 font-semibold text-gray-700'>
            Tin nhắn
          </div>

          {/* SEARCH */}
          <div className='border border-gray-300 p-3'>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder='Tìm tên người dùng...'
              className='w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>

          {/* USER LIST */}
          <div className='flex-1 overflow-y-auto'>
            {filteredUsers.map((u) => (
              <div
                key={u.id}
                onClick={() => {
                  setSelectedUser(u);
                }}
                className={`flex cursor-pointer items-center gap-3 border border-gray-300 p-3 transition hover:bg-gray-200 ${selectedUser?.id === u.id ? "bg-gray-200" : ""}`}
              >
                {unread[u.id] > 0 && (
                  <span className='rounded-full bg-blue-500 px-2 py-1 text-xs text-white'>{String(unread[u.id])}</span>
                )}

                <img src={u.avatar} className='h-10 w-10 rounded-full border object-cover' />

                <div className='flex flex-1 flex-col'>
                  <span className='text-sm font-medium'>{u.fullName}</span>
                  <span className='text-xs text-gray-500'>{u.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CHAT */}
        <div className='flex flex-1 flex-col bg-white'>
          {/* HEADER */}
          <div className='flex h-14 items-center justify-between border border-gray-300 px-4'>
            <div className='flex flex-col'>
              <span className='font-semibold'>{selectedUser ? selectedUser.fullName : ""}</span>
              {selectedUser && <span className='text-xs text-gray-500'>{selectedUser.role}</span>}
            </div>
            <button onClick={onClose} className='px-2 text-lg text-gray-500 hover:text-black'>
              ✕
            </button>
          </div>

          {/* BODY */}
          <div className='flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4'>
            {selectedUser ? (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`relative max-w-[75%] rounded-xl border border-gray-300 p-3 text-sm shadow-sm ${
                    m.from.id === currentUser.id ? "ml-auto border-none bg-blue-500 text-white" : "bg-white"
                  }`}
                >
                  {m.text}

                  {m.from.id === currentUser.id && (
                    <button
                      onClick={() => {
                        handleDeleteMessage(m.id);
                      }}
                      className='absolute top-1 right-1 text-xs text-red-500 hover:text-red-700'
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className='mt-20 text-center text-sm text-gray-400'>Chọn một người để bắt đầu trò chuyện</div>
            )}
          </div>

          {/* INPUT */}
          {selectedUser && (
            <div className='flex gap-2 border border-gray-300 bg-white p-3'>
              <input
                className='flex-1 rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400'
                placeholder='Nhập tin nhắn...'
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
              />
              <button onClick={handleSend} className='rounded-xl bg-blue-500 px-5 py-2 text-white hover:bg-blue-600'>
                Gửi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
