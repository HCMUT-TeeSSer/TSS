import type { Program } from "./programs";
import { programs } from "./programs";

export interface Mentee {
  id: number;
  name: string;
  rating: number;
  listCourse: Program[];
  avatarUrl: string;
}
export const mentees: Mentee[] = [
  {
    id: 20220001,
    name: "Hoàng Minh E",
    rating: 8.5,
    listCourse: [programs[0], programs[1]],
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 20220002,
    name: "Trần Thị B",
    rating: 9.2,
    listCourse: [programs[2], programs[3]],
    avatarUrl: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 20220003,
    name: "Lê Văn C",
    rating: 6.8,
    listCourse: [programs[4], programs[5]],
    avatarUrl: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 20220004,
    name: "Phạm Thị D",
    rating: 8.9,
    listCourse: [programs[6], programs[7]],
    avatarUrl: "https://i.pravatar.cc/150?img=8",
  },
];
