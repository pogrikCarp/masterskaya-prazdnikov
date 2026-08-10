import SiteShell from "../site/components/SiteShell";
import Container from "../site/components/Container";
import prisma from "@/lib/prisma";

async function getAdditionalServices() {
  const services = await prisma.additionalService.findMany({
    where: { active: true },
    orderBy: [{ popular: "desc" }, { id: "desc" }],
  });
  return services;
}

export default async function ServicesPage() {
  const services = await getAdditionalServices();

  return (
    <SiteShell>
      <section className="py-16">
        <Container className="max-w-[1320px]">
          <div className="text-center">
            <h1 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              Дополнительные услуги
            </h1>
            <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl mx-auto">
              Добавьте к празднику дополнительные опции — соберите идеальную программу под
              ваш бюджет.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="mt-10 text-center text-black/50">Нет дополнительных услуг</div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] transition-all hover:shadow-[0_32px_100px_rgba(17,24,39,0.14)]"
                >
                  <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgba(130,230,200,0.28)_0%,rgba(255,255,255,0.85)_55%,rgb(var(--mp-lavender-rgb)_/_0.26)_100%)]" />
                  <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#82E6C8]/28 blur-3xl" />
                  <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

                  <div className="relative p-7 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/70 ring-1 ring-black/10 text-2xl">
                        🎉
                      </div>
                      {service.popular && (
                        <div className="rounded-full bg-[rgba(130,230,200,0.85)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
                          Хит
                        </div>
                      )}
                    </div>

                    <div className="mt-5 text-lg sm:text-xl font-black tracking-tight text-[var(--mp-ink)] leading-tight">
                      {service.name}
                    </div>

                    {service.imageUrl && (
                      <div className="mt-4 rounded-[20px] overflow-hidden">
                        <img
                          src={service.imageUrl}
                          alt={service.name}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}

                    {service.description && (
                      <p className="mt-4 text-sm text-black/60 leading-relaxed">
                        {service.description}
                      </p>
                    )}

                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-sm font-semibold text-[var(--mp-ink)]">
                        {service.price.toLocaleString()} ₽
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
