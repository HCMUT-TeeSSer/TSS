export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: number;
}

export const CHAT_STORAGE_KEY = "demo_chat_messages";

export const saveMessage = (msg: Message) => {
  const raw = localStorage.getItem(CHAT_STORAGE_KEY) ?? "[]";
  const messages = JSON.parse(raw) as Message[];

  messages.push(msg);

  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
};

export const getMessages = (user1: string, user2: string): Message[] => {
  const raw = localStorage.getItem(CHAT_STORAGE_KEY) ?? "[]";
  const messages = JSON.parse(raw) as Message[];

  return messages.filter((m) => (m.from === user1 && m.to === user2) || (m.from === user2 && m.to === user1));
};
