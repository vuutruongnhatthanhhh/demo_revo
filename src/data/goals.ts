import type { Goal, Level, Duration } from "./types";

export const GOALS: Goal[] = [
  {
    id: "weight-loss",
    title: "Giảm cân",
    subtitle: "Đốt mỡ, thon gọn vóc dáng",
    description:
      "Lịch tập cardio & toàn thân cường độ cao, tối ưu để đốt năng lượng và cải thiện sức bền.",
    image: "/images/goals/weight-loss.jpg",
    icon: "Flame",
  },
  {
    id: "muscle-gain",
    title: "Tăng cơ",
    subtitle: "Xây dựng cơ bắp săn chắc",
    description:
      "Tập trung các bài kháng lực theo nhóm cơ Đẩy – Kéo – Chân để phát triển cơ bắp đều và chắc khỏe.",
    image: "/images/goals/muscle-gain.jpg",
    icon: "Dumbbell",
  },
  {
    id: "weight-gain",
    title: "Tăng cân",
    subtitle: "Tăng khối lượng cơ thể khỏe mạnh",
    description:
      "Kết hợp bài tập sức mạnh nền tảng với khối lượng tập vừa phải, hỗ trợ tăng cân lành mạnh.",
    image: "/images/goals/weight-gain.jpg",
    icon: "TrendingUp",
  },
];

export const LEVELS: Level[] = [
  {
    id: "beginner",
    title: "Người mới bắt đầu",
    subtitle: "Làm quen với vận động",
    description:
      "Bài tập nền tảng, hướng dẫn kỹ thuật chi tiết, cường độ tăng dần để cơ thể thích nghi an toàn.",
    image: "/images/levels/beginner.jpg",
  },
  {
    id: "experienced",
    title: "Đã có kinh nghiệm",
    subtitle: "Sẵn sàng thử thách hơn",
    description:
      "Khối lượng tập lớn hơn, thời gian nghỉ ngắn hơn, bài tập phức hợp để tối đa hiệu quả.",
    image: "/images/levels/experienced.jpg",
  },
];

export const DURATIONS: Duration[] = [
  { id: 15, label: "15 phút", helper: "Buổi tập nhanh, tranh thủ mỗi ngày" },
  { id: 30, label: "30 phút", helper: "Cân bằng giữa hiệu quả & thời gian" },
  { id: 45, label: "45 phút", helper: "Tập trung xây nền thể lực vững" },
  { id: 60, label: "60 phút", helper: "Buổi tập đầy đủ, chuyên sâu" },
];
