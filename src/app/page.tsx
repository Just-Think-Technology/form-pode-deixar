import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function PathCard({
  code,
  title,
  description,
  href,
  cta,
}: {
  code: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="clipboard-board relative flex flex-col rounded-sm border border-form-line p-6">
      <div className="mb-5 flex items-center justify-between border-b border-dashed border-form-line pb-3">
        <span className="rounded-sm bg-highlight px-2 py-0.5 font-mono text-[11px] tracking-wide text-ink">
          {code}
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Via destacável
        </span>
      </div>
      <h2 className="text-2xl leading-tight text-ink">{title}</h2>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
        {description}
      </p>
      <Link
        href={href}
        className={cn(buttonVariants({ size: "lg" }), "mt-6 h-11 justify-center")}
      >
        {cta}
      </Link>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] tracking-[0.24em] text-workshop uppercase">
          Pesquisa de campo
        </p>
        <h1 className="mt-4 text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
          Pesquisa sobre contratação de serviços
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Estamos realizando uma pesquisa para entender como as pessoas encontram e
          contratam profissionais para serviços do dia a dia, como manutenção,
          instalação, limpeza, beleza, assistência técnica, entre outros.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          A pesquisa é rápida e leva aproximadamente 3 minutos. As respostas serão
          utilizadas exclusivamente para fins de pesquisa. Não pedimos nome, telefone
          nem documento.
        </p>
      </header>

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        <PathCard
          code="OS-CLIENTE"
          title="Quem contrata serviços"
          description="Para quem já precisou chamar um profissional — ou ainda precisa — e pode contar como encontra, escolhe e paga por esses serviços."
          href="/pesquisa/cliente"
          cta="Responder como cliente"
        />
        <PathCard
          code="OS-PRESTADOR"
          title="Quem presta serviços"
          description="Para autônomos, equipes e quem oferece serviço como renda complementar. Queremos entender como chegam novos clientes hoje."
          href="/pesquisa/prestador"
          cta="Responder como prestador"
        />
      </section>
    </main>
  );
}
