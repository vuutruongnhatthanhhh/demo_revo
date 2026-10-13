import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Flame,
  PlayCircle,
  Salad,
  Target,
  TrendingUp,
  Dumbbell,
} from "lucide-react";
import { LinkButton } from "@/components/Button";
import Container from "@/components/Container";
import SiteNavbar from "@/components/landing/SiteNavbar";
import SiteFooter from "@/components/landing/SiteFooter";

const FEATURES = [
  {
    icon: Target,
    title: "Chọn mục tiêu riêng cho bạn",
    description:
      "Giảm cân, tăng cân hay tăng cơ — chọn trình độ và thời gian tập mỗi ngày để REVO cá nhân hóa trải nghiệm.",
  },
  {
    icon: CalendarCheck2,
    title: "Lịch tập được đề xuất",
    description:
      "Nhận lịch tập theo tuần phù hợp với thời gian rảnh của bạn, kèm số hiệp, số lần lặp và thời gian nghỉ rõ ràng.",
  },
  {
    icon: PlayCircle,
    title: "Video hướng dẫn chi tiết",
    description:
      "Mỗi bài tập đều có video hướng dẫn kỹ thuật, mở xem bất cứ lúc nào ngay trong buổi tập của bạn.",
  },
  {
    icon: TrendingUp,
    title: "Theo dõi tiến độ",
    description:
      "Đánh dấu bài tập hoặc buổi tập đã hoàn thành và xem tiến độ luyện tập của mình trực quan theo thời gian.",
  },
  {
    icon: Salad,
    title: "Giãn cơ & dinh dưỡng",
    description:
      "Khởi động, giãn cơ sau buổi tập và gợi ý món ăn phù hợp với mục tiêu cùng ngân sách của bạn.",
  },
  {
    icon: Flame,
    title: "Thiết kế hiện đại, dễ dùng",
    description:
      "Giao diện tối ưu cho điện thoại, trải nghiệm mượt mà từ onboarding đến từng buổi tập hằng ngày.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Thiết lập hồ sơ tập luyện",
    description: "Chọn mục tiêu, trình độ và thời gian tập mỗi ngày trong 60 giây.",
  },
  {
    step: "02",
    title: "Nhận lịch tập cá nhân hóa",
    description: "REVO đề xuất lịch tập theo tuần, chia rõ từng buổi và bài tập.",
  },
  {
    step: "03",
    title: "Tập theo video hướng dẫn",
    description: "Mở video hướng dẫn kỹ thuật cho từng bài, tập đúng form, an toàn.",
  },
  {
    step: "04",
    title: "Theo dõi & phục hồi",
    description: "Đánh dấu hoàn thành, xem tiến độ, giãn cơ và ăn uống hợp lý.",
  },
];

const STATS = [
  { value: "5+", label: "Nhóm chức năng cốt lõi" },
  { value: "12", label: "Bài tập có video hướng dẫn" },
  { value: "3", label: "Mục tiêu tập luyện" },
  { value: "100%", label: "Tối ưu cho di động" },
];

export default function LandingPage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/hero/hero-main.jpg"
              alt="REVO training"
              fill
              priority
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background to-background" />
            <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
            <div className="absolute top-40 -left-20 h-72 w-72 rounded-full bg-accent-2/20 blur-[120px]" />
          </div>

          <Container className="relative py-20 sm:py-28">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/60 px-4 py-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Ứng dụng tập luyện cá nhân hóa
            </div>

            <h1
              className="animate-fade-up mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl"
              style={{ animationDelay: "0.05s" }}
            >
              Train on{" "}
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                Your Own Terms.
              </span>
            </h1>
            <p
              className="animate-fade-up mt-5 max-w-2xl text-lg text-muted sm:text-xl"
              style={{ animationDelay: "0.1s" }}
            >
              Tập luyện theo cách phù hợp với bạn. REVO giúp bạn chọn mục
              tiêu, nhận lịch tập cá nhân hóa, xem video hướng dẫn và theo
              dõi tiến độ — tất cả trong một trải nghiệm hiện đại, mượt mà.
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.15s" }}
            >
              <LinkButton href="/app/onboarding" size="lg" icon={<ArrowRight size={18} />}>
                Bắt đầu miễn phí
              </LinkButton>
              <LinkButton href="#how-it-works" variant="outline" size="lg">
                Xem cách hoạt động
              </LinkButton>
            </div>

            <div
              className="animate-fade-up mt-14 grid grid-cols-2 gap-6 border-t border-surface-border/60 pt-8 sm:grid-cols-4"
              style={{ animationDelay: "0.2s" }}
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Features */}
        <section id="features" className="py-20 sm:py-28">
          <Container>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Tính năng
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Mọi thứ bạn cần cho một hành trình tập luyện bền vững
              </h2>
              <p className="mt-4 text-muted">
                Từ thiết lập mục tiêu đến phục hồi sau buổi tập, REVO đồng
                hành cùng bạn ở mọi bước.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-surface-border bg-surface p-6 transition-colors hover:border-accent/50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <feature.icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-surface-border/60 bg-surface/30 py-20 sm:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Cách hoạt động
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                  Bắt đầu chỉ với 4 bước đơn giản
                </h2>
                <div className="mt-10 space-y-8">
                  {STEPS.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <span className="font-display text-2xl font-bold text-accent/40">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <LinkButton
                  href="/app/onboarding"
                  className="mt-10"
                  icon={<ArrowRight size={18} />}
                >
                  Thiết lập hồ sơ của bạn
                </LinkButton>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl border border-surface-border">
                  <Image
                    src="/images/hero/hero-app.jpg"
                    alt="REVO app preview"
                    width={640}
                    height={720}
                    className="h-[480px] w-full object-cover sm:h-[560px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                </div>

                <div className="absolute -bottom-6 -left-6 hidden w-64 rounded-2xl border border-surface-border bg-surface/95 p-4 backdrop-blur sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Dumbbell size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Buổi tập hôm nay</p>
                      <p className="text-xs text-muted">6 bài · 30 phút</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-accent">
                    <CheckCircle2 size={14} />
                    <span>4/6 bài tập hoàn thành</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Nutrition teaser */}
        <section id="nutrition" className="py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-3xl border border-surface-border order-last lg:order-first">
              <Image
                src="/images/meals/healthy-bowl.jpg"
                alt="Gợi ý dinh dưỡng REVO"
                width={640}
                height={480}
                className="h-80 w-full object-cover sm:h-[420px]"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Sau mỗi buổi tập
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Phục hồi đúng cách & ăn uống hợp lý
              </h2>
              <p className="mt-4 text-muted">
                REVO gợi ý các động tác giãn cơ, khởi động trước và sau buổi
                tập, cùng thực đơn phù hợp với mục tiêu và ngân sách của
                riêng bạn — tiết kiệm, vừa phải hay cao cấp.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Bài giãn cơ khởi động & thả lỏng có video minh họa",
                  "Gợi ý món ăn theo mục tiêu: giảm cân, tăng cân, tăng cơ",
                  "Lọc thực đơn theo ngân sách phù hợp với bạn",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-muted">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="border-t border-surface-border/60 py-20 sm:py-28">
          <Container>
            <div className="relative overflow-hidden rounded-3xl border border-surface-border bg-gradient-to-br from-surface to-surface-2 px-8 py-14 text-center sm:px-16">
              <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
              <h2 className="relative font-display text-3xl font-bold sm:text-4xl">
                Sẵn sàng tập luyện theo cách của riêng bạn?
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-muted">
                Thiết lập hồ sơ trong chưa đầy 1 phút và nhận ngay lịch tập
                cá nhân hóa đầu tiên của bạn.
              </p>
              <div className="relative mt-8 flex justify-center">
                <LinkButton href="/app/onboarding" size="lg" icon={<ArrowRight size={18} />}>
                  Bắt đầu ngay — Miễn phí
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
