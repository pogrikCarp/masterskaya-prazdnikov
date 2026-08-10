import SiteShell from "../site/components/SiteShell";
import Container from "../site/components/Container";
import prisma from "@/lib/prisma";

async function getQuests() {
  const quests = await prisma.quest.findMany({
    where: { active: true },
    orderBy: [{ popular: "desc" }, { id: "desc" }],
  });
  return quests;
}

export default async function QuestsPage() {
  const quests = await getQuests();

  return (
    <SiteShell>
      <section className="py-16">
        <Container className="max-w-[1320px]">
          <div className="text-center">
            <h1 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              Все квесты
            </h1>
            <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl mx-auto">
              Сюжетные игры с заданиями — вовлекают детей и держат темп.
            </p>
          </div>

          {quests.length === 0 ? (
            <div className="mt-10 text-center text-black/50">Нет квестов</div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  className="group relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] transition-all hover:shadow-[0_32px_100px_rgba(17,24,39,0.14)]"
                >
                  <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.22)_0%,rgba(255,255,255,0.85)_55%,rgba(255,107,138,0.18)_100%)]" />
                  <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.22)] blur-3xl" />
                  <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

                  <div className="relative p-7 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-black/70 ring-1 ring-black/10">
                        от {quest.minAge}+ лет
                      </div>
                      {quest.popular && (
                        <div className="shrink-0 rounded-full bg-[rgba(255,107,138,0.85)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
                          Хит
                        </div>
                      )}
                    </div>

                    <div className="mt-4 text-lg sm:text-xl font-black tracking-tight text-[var(--mp-ink)] leading-tight">
                      {quest.name}
                    </div>

                    {quest.imageUrl && (
                      <div className="mt-4 rounded-[28px] bg-white/55 ring-1 ring-white/60 p-4">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] ring-1 ring-black/5">
                          <img
                            src={quest.imageUrl}
                            alt={quest.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {quest.description && (
                      <p className="mt-4 text-sm text-black/60 leading-relaxed">
                        {quest.description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-black/50">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{quest.duration} мин</span>
                      </div>
                      <div className="text-sm font-semibold text-[var(--mp-ink)]">
                        {quest.price.toLocaleString()} ₽
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
