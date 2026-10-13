import type { StretchRoutine } from "./types";

export const STRETCH_ROUTINES: StretchRoutine[] = [
  {
    id: "warmup",
    title: "Khởi động trước buổi tập",
    subtitle: "5 phút kích hoạt cơ, làm nóng khớp trước khi vào bài chính",
    videoId: "1e528F0pYPg",
    videoTitle: "Full Body 5 Minute Dynamic Warm Up for Intense Workouts",
    moves: [
      {
        id: "warmup-1",
        name: "Xoay khớp cổ & vai",
        type: "warmup",
        duration: "45 giây",
        image: "/images/stretches/stretch-1.jpg",
        cue: "Xoay nhẹ nhàng theo chiều kim đồng hồ rồi đổi chiều, giúp làm nóng vùng cổ vai gáy.",
      },
      {
        id: "warmup-2",
        name: "Xoay hông & gối",
        type: "warmup",
        duration: "45 giây",
        image: "/images/stretches/stretch-2.jpg",
        cue: "Hai tay chống hông, xoay vòng tròn để làm nóng khớp hông trước khi squat hoặc lunge.",
      },
      {
        id: "warmup-3",
        name: "Nâng cao đùi (High Knees)",
        type: "warmup",
        duration: "30 giây",
        image: "/images/stretches/stretch-3.jpg",
        cue: "Chạy bước nhỏ tại chỗ, nâng gối cao ngang hông để tăng nhịp tim dần.",
      },
      {
        id: "warmup-4",
        name: "Giãn cơ động toàn thân",
        type: "warmup",
        duration: "60 giây",
        image: "/images/stretches/stretch-4.jpg",
        cue: "Kết hợp vươn tay, xoay thân nhẹ để toàn bộ cơ thể sẵn sàng cho buổi tập.",
      },
    ],
  },
  {
    id: "cooldown",
    title: "Giãn cơ sau buổi tập",
    subtitle: "5 phút thả lỏng, phục hồi cơ bắp và giảm đau nhức",
    videoId: "R56k41NLIoI",
    videoTitle:
      "5 Min Full Body Cool Down Stretches - Post Workout For Flexibility",
    moves: [
      {
        id: "cooldown-1",
        name: "Giãn cơ đùi sau (Hamstring Stretch)",
        type: "cooldown",
        duration: "30 giây / bên",
        image: "/images/stretches/stretch-3.jpg",
        cue: "Duỗi thẳng một chân, cúi người nhẹ về phía mũi chân, giữ lưng thẳng.",
      },
      {
        id: "cooldown-2",
        name: "Giãn cơ đùi trước (Quad Stretch)",
        type: "cooldown",
        duration: "30 giây / bên",
        image: "/images/stretches/stretch-2.jpg",
        cue: "Kéo gót chân về phía mông, giữ thăng bằng và cảm nhận căng nhẹ ở đùi trước.",
      },
      {
        id: "cooldown-3",
        name: "Giãn cơ ngực & vai",
        type: "cooldown",
        duration: "30 giây / bên",
        image: "/images/stretches/stretch-1.jpg",
        cue: "Đưa tay ra sau nắm vào tường hoặc kéo nhẹ, mở rộng lồng ngực và thả lỏng vai.",
      },
      {
        id: "cooldown-4",
        name: "Thở sâu & thả lỏng toàn thân",
        type: "cooldown",
        duration: "60 giây",
        image: "/images/stretches/stretch-4.jpg",
        cue: "Hít thở sâu bằng bụng, thả lỏng vai và toàn thân để nhịp tim trở lại bình thường.",
      },
    ],
  },
];
