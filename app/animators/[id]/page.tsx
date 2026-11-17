import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ANIMATOR_AGE_GROUPS } from "@/lib/animator-filters";
import SiteShell from "../../site/components/SiteShell";
import Container from "../../site/components/Container";
import AnimatorPhoto from "../../site/components/AnimatorPhoto";
import RequestButton from "../../site/components/RequestButton";

export const dynamic = "force-dynamic";

export default async function AnimatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id)) || Number(id) > 2147483647) notFound();
  const animator = await prisma.animator.findFirst({ where: { id: Number(id), active: true } });
  if (!animator) notFound();

  return (
    <SiteShell>
      <section className="py-16">
        <Container className="max-w-[1100px]">
          <Link href="/animators" className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--mp-ink)]">← Все аниматоры</Link>
          <div className="mt-5 grid items-start gap-8 md:grid-cols-2 lg:gap-12">
            <AnimatorPhoto imageUrl={animator.imageUrl} name={animator.name} className="aspect-[4/5] rounded-[32px]" />
            <div className="py-4">
              <h1 className="text-[32px] font-black leading-tight tracking-tight text-[var(--mp-ink)] [overflow-wrap:anywhere] sm:text-[40px]">{animator.name}</h1>
              <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-black/65">{animator.description || "Подберём программу с этим героем под ваш праздник. Оставьте заявку, чтобы обсудить детали."}</p>
              {animator.ageGroups.length > 0 && (
                <p className="mt-5 text-sm text-black/60">Возраст — {ANIMATOR_AGE_GROUPS.filter(item => animator.ageGroups.includes(item.value)).map(item => item.label).join(", ")}</p>
              )}
              <p className="mt-6 text-2xl font-black text-[var(--mp-ink)]">{animator.pricePerHour.toLocaleString("ru-RU")} ₽/час</p>
              <RequestButton className="mt-6" size="lg" subject={`Аниматор: ${animator.name}`}>Заказать этого героя</RequestButton>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
