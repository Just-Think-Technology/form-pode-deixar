import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const { tipo } = await searchParams;
  const otherHref = tipo === "prestador" ? "/pesquisa/cliente" : "/pesquisa/prestador";
  const otherLabel =
    tipo === "prestador" ? "Responder como cliente" : "Responder como prestador";

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-16">
      <div className="clipboard-board relative rounded-sm border border-form-line px-6 py-10 text-center sm:px-10">
        <div className="clipboard-clip absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <p className="font-mono text-[11px] tracking-[0.22em] text-workshop uppercase">
          Protocolo recebido
        </p>
        <h1 className="mt-4 text-4xl tracking-tight text-ink">Obrigado</h1>
        <p className="mt-4 text-muted-foreground">
          Sua resposta foi registrada. Ela ajuda a entender como as pessoas realmente
          encontram, contratam e prestam serviços no dia a dia.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className={cn(buttonVariants({ size: "lg" }), "h-11 justify-center")}
          >
            Voltar ao início
          </Link>
          <Link
            href={otherHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 justify-center",
            )}
          >
            {otherLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
