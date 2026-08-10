import SiteShell from "../site/components/SiteShell";
import Container from "../site/components/Container";
import prisma from "@/lib/prisma";

async function getAnimators() {
  const animators = await prisma.animator.findMany({
    where: { active: true },
    orderBy: [{ popular: "desc" }, { id: "desc" }],
  });
  return animators;
}

export default async function AnimatorsPage() {
  const animators = await getAnimators();

  return (
    <SiteShell>
      <section className="py-16">
        <Container className="max-w-[1320px]">
          <div className="text-center">
            <h1 className="mt-4 text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              Все аниматоры
            </h1>
          </div>

          {animators.length === 0 ? (
            <div className="mt-10 text-center text-black/50">Нет аниматоров</div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {animators.map((a) => (
                <div
                  key={a.id}
                  className="group relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] transition-all hover:-translate-y-0.5 hover:shadow-[0_32px_100px_rgba(17,24,39,0.14)]"
                >
                  <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.34)_0%,rgba(255,255,255,0.86)_55%,rgba(214,249,239,0.55)_100%)]" />
                  <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.22)] blur-3xl" />
                  <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

                  <div className="relative p-7 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-lg sm:text-xl font-black tracking-tight text-[var(--mp-ink)] leading-tight">
                        {a.name}
                      </div>
                      {a.popular && (
                        <div className="shrink-0 rounded-full bg-[rgba(255,107,138,0.85)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
                          Хит
                        </div>
                      )}
                    </div>

                    <div className="mt-5 rounded-[28px] bg-white/55 ring-1 ring-white/60 p-6 sm:p-7">
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] ring-1 ring-black/5 bg-gradient-to-br from-[rgb(var(--mp-lavender-rgb)_/_0.2)] to-[rgba(255,107,138,0.1)]">
                        {a.imageUrl ? (
                          <img
                            src={a.imageUrl}
                            alt={a.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-black/20 text-6xl">
                            🎭
                          </div>
                        )}
                      </div>
                    </div>

                    {a.description && (
                      <p className="mt-5 text-sm text-black/60 leading-relaxed">
                        {a.description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm font-semibold text-[var(--mp-ink)]">
                        {a.pricePerHour.toLocaleString()} ₽/час
                      </div>
                      <div className="text-sm font-semibold text-[var(--mp-ink)] group-hover:translate-x-[2px] transition-transform">
                        Подробнее →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </SiteShell>
  );
}
