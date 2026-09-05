import SiteShell from "../site/components/SiteShell";
import Container from "../site/components/Container";
import prisma from "@/lib/prisma";

async function getShows() {
  const shows = await prisma.show.findMany({
    where: { active: true },
    orderBy: [{ popular: "desc" }, { id: "desc" }],
  });
  return shows;
}

export default async function ShowsPage() {
  const shows = await getShows();

  return (
    <SiteShell>
      <section className="py-16">
        <Container className="max-w-[1320px]">
          <div className="text-center">
            <h1 className="mt-4 text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              Все шоу‑программы
            </h1>
          </div>

          {shows.length === 0 ? (
            <div className="mt-10 text-center text-black/50">Нет шоу-программ</div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shows.map((show) => (
                <div
                  key={show.id}
                  className="group relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] transition-all hover:shadow-[0_32px_100px_rgba(17,24,39,0.14)]"
                >
                  <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.42)_0%,rgba(255,255,255,0.85)_55%,rgba(214,249,239,0.55)_100%)]" />
                  <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.35)] blur-3xl" />
                  <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

                  <div className="relative p-7 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-lg sm:text-xl font-black tracking-tight text-[var(--mp-ink)] leading-tight">
                        {show.name}
                      </div>
                      {show.popular && (
                        <div className="shrink-0 rounded-full bg-[var(--mp-ink)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
                          Хит
                        </div>
                      )}
                    </div>

                    <div className="mt-4 rounded-[28px] bg-white/55 ring-1 ring-white/60 p-6 sm:p-7">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[22px] ring-1 ring-black/5 bg-gradient-to-br from-[rgb(var(--mp-lavender-rgb)_/_0.2)] to-[rgba(255,107,138,0.1)]">
                        {show.imageUrl ? (
                          <img
                            src={show.imageUrl}
                            alt={show.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-black/20 text-5xl">
                            🎪
                          </div>
                        )}
                      </div>
                    </div>

                    {show.description && (
                      <p className="mt-5 text-sm text-black/60 leading-relaxed">
                        {show.description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-black/50">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{show.duration} мин</span>
                      </div>
                      <div className="text-sm font-semibold text-[var(--mp-ink)]">
                        {show.price.toLocaleString()} ₽
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
