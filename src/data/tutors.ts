export interface Tutor {
  id: number;
  name: string;
  totalMentee: number;
  rating: number;
  status: string;
  avatarUrl: string;
}
export const tutors: Tutor[] = [
  {
    id: 20210001,
    name: "Nguyễn Văn A",
    totalMentee: 24,
    rating: 4.9,
    status: "Hoạt động",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 20210002,
    name: "Trần Thị B",
    totalMentee: 18,
    rating: 4.6,
    status: "Hoạt động",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 20210003,
    name: "Lê Văn C",
    totalMentee: 15,
    rating: 4.2,
    status: "Tạm dừng",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 20210004,
    name: "Phạm Thị D",
    totalMentee: 2,
    rating: 4.8,
    status: "Hoạt động",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  },
];
