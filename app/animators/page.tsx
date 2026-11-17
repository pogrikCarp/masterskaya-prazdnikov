import SiteShell from "../site/components/SiteShell";
import Container from "../site/components/Container";
import AnimatorCatalog from "../site/components/AnimatorCatalog";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AnimatorsPage() {
  const animators = await prisma.animator.findMany({
    where: { active: true },
    orderBy: [{ popular: "desc" }, { id: "desc" }],
  });
  return (
    <SiteShell>
      <section className="py-16">
        <Container className="max-w-[1320px]">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mt-4 text-[34px] font-black tracking-tight text-[var(--mp-ink)] sm:text-[44px]">Аниматоры на ваш праздник</h1>
            <p className="mt-3 text-sm leading-relaxed text-black/60 sm:text-base">Выберите любимого героя и программу для вашего ребёнка.</p>
          </div>
          <AnimatorCatalog animators={animators} />
        </Container>
      </section>
    </SiteShell>
  );
}
