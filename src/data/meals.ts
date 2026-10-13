import type { Meal } from "./types";

export const MEALS: Meal[] = [
  {
    id: "salad-ga",
    name: "Salad gà áp chảo & rau củ",
    image: "/images/meals/salad.jpg",
    calories: 380,
    price: "35.000 - 45.000đ",
    budget: "tiet-kiem",
    goals: ["weight-loss"],
    description:
      "Ức gà áp chảo ít dầu, rau xanh tươi và sốt chanh dầu olive — giàu đạm, ít calo, no lâu.",
    tags: ["Giàu đạm", "Ít calo", "Dễ chuẩn bị"],
  },
  {
    id: "yen-mach-chuoi",
    name: "Yến mạch chuối & hạt chia",
    image: "/images/meals/oatmeal.jpg",
    calories: 320,
    price: "15.000 - 25.000đ",
    budget: "tiet-kiem",
    goals: ["weight-loss", "muscle-gain"],
    description:
      "Bữa sáng nhanh, nhiều chất xơ, ổn định đường huyết và cung cấp năng lượng bền trước buổi tập.",
    tags: ["Chất xơ cao", "Bữa sáng", "Tiết kiệm"],
  },
  {
    id: "bowl-rau-cu",
    name: "Bowl rau củ & đậu gà",
    image: "/images/meals/healthy-bowl.jpg",
    calories: 410,
    price: "40.000 - 50.000đ",
    budget: "tiet-kiem",
    goals: ["weight-loss"],
    description:
      "Đậu gà, rau củ nướng và diêm mạch (quinoa) — bữa ăn thực vật giàu chất xơ, hỗ trợ giảm mỡ.",
    tags: ["Thực vật", "Giàu chất xơ"],
  },
  {
    id: "smoothie-protein",
    name: "Sinh tố protein chuối & bơ đậu phộng",
    image: "/images/meals/smoothie.jpg",
    calories: 450,
    price: "30.000 - 40.000đ",
    budget: "vua",
    goals: ["muscle-gain", "weight-gain"],
    description:
      "Whey protein, chuối, bơ đậu phộng và sữa — nạp năng lượng và đạm nhanh sau buổi tập.",
    tags: ["Giàu đạm", "Sau tập", "Nhanh gọn"],
  },
  {
    id: "com-ga-uc",
    name: "Cơm gạo lứt, ức gà & bông cải",
    image: "/images/meals/chicken-rice.jpg",
    calories: 520,
    price: "40.000 - 55.000đ",
    budget: "vua",
    goals: ["muscle-gain", "weight-loss"],
    description:
      "Combo kinh điển cho người tập gym: tinh bột phức hợp, đạm nạc và rau xanh cân bằng dinh dưỡng.",
    tags: ["Giàu đạm", "Cân bằng", "Phổ biến"],
  },
  {
    id: "ca-hoi-khoai",
    name: "Cá hồi áp chảo & khoai lang nướng",
    image: "/images/meals/meal-plate.jpg",
    calories: 560,
    price: "70.000 - 90.000đ",
    budget: "cao-cap",
    goals: ["muscle-gain", "weight-gain"],
    description:
      "Omega-3 từ cá hồi hỗ trợ phục hồi cơ, kết hợp khoai lang cung cấp carb chất lượng.",
    tags: ["Omega-3", "Cao cấp", "Phục hồi cơ"],
  },
  {
    id: "bo-bit-tet",
    name: "Bít tết bò & rau củ hấp",
    image: "/images/meals/meal-prep.jpg",
    calories: 650,
    price: "90.000 - 120.000đ",
    budget: "cao-cap",
    goals: ["weight-gain", "muscle-gain"],
    description:
      "Thịt bò giàu đạm & sắt, hỗ trợ tăng khối lượng cơ và năng lượng cho người cần tăng cân.",
    tags: ["Giàu năng lượng", "Tăng cân", "Cao cấp"],
  },
  {
    id: "trung-bo-cam",
    name: "Trứng bơ & bánh mì nguyên cám",
    image: "/images/meals/avocado-toast.jpg",
    calories: 410,
    price: "25.000 - 35.000đ",
    budget: "tiet-kiem",
    goals: ["weight-gain", "muscle-gain"],
    description:
      "Chất béo tốt từ bơ, đạm từ trứng và carb phức hợp — bữa sáng tăng cân lành mạnh.",
    tags: ["Chất béo tốt", "Bữa sáng"],
  },
  {
    id: "hat-trai-cay",
    name: "Hũ hạt dinh dưỡng & trái cây",
    image: "/images/meals/nuts.jpg",
    calories: 280,
    price: "20.000 - 30.000đ",
    budget: "vua",
    goals: ["weight-gain", "weight-loss", "muscle-gain"],
    description:
      "Hạnh nhân, óc chó, hạt điều cùng trái cây tươi — bữa ăn phụ tiện lợi giữa các buổi tập.",
    tags: ["Ăn vặt lành mạnh", "Tiện lợi"],
  },
  {
    id: "rau-cu-hap",
    name: "Rau củ hấp & đậu phụ sốt mè",
    image: "/images/meals/veggies.jpg",
    calories: 300,
    price: "25.000 - 35.000đ",
    budget: "tiet-kiem",
    goals: ["weight-loss"],
    description:
      "Bữa ăn thực vật thanh đạm, ít calo, giàu vitamin — lựa chọn nhẹ bụng cho buổi tối.",
    tags: ["Thực vật", "Thanh đạm"],
  },
  {
    id: "trai-cay-tron",
    name: "Fruit bowl & sữa chua Hy Lạp",
    image: "/images/meals/fruit-bowl.jpg",
    calories: 260,
    price: "20.000 - 30.000đ",
    budget: "vua",
    goals: ["weight-loss", "muscle-gain"],
    description:
      "Sữa chua Hy Lạp giàu đạm kết hợp trái cây tươi — bữa ăn nhẹ giàu probiotic và vitamin.",
    tags: ["Giàu probiotic", "Bữa nhẹ"],
  },
  {
    id: "set-bua-sang",
    name: "Set bữa sáng đầy đủ dinh dưỡng",
    image: "/images/meals/breakfast.jpg",
    calories: 480,
    price: "45.000 - 60.000đ",
    budget: "cao-cap",
    goals: ["weight-gain", "muscle-gain"],
    description:
      "Trứng, bánh mì nguyên cám, trái cây và nước ép — set bữa sáng cân bằng cho ngày tập nặng.",
    tags: ["Đầy đủ dinh dưỡng", "Cao cấp"],
  },
];

export const BUDGETS: { id: Meal["budget"]; label: string }[] = [
  { id: "tiet-kiem", label: "Tiết kiệm" },
  { id: "vua", label: "Vừa phải" },
  { id: "cao-cap", label: "Cao cấp" },
];
