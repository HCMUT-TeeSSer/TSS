import type { Message } from "@/types/message.type";

const MESSAGES_KEY = "messages";

export const getMessages = (): Message[] => {
  const data = localStorage.getItem(MESSAGES_KEY);
  return data ? (JSON.parse(data) as Message[]) : [];
};

export const saveMessage = (msg: Message): void => {
  const msgs = getMessages();
  msgs.push(msg);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs));
};
