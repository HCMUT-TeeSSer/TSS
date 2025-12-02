import type { User } from "@/types/user.type";

export interface Message {
  id: string;
  from: User;
  to: User;
  text: string;
  timestamp: number;
  read?: boolean;
}
