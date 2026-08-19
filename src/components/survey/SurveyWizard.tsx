"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { FieldRenderer } from "@/components/survey/FieldRenderer";
import { SurveyShell } from "@/components/survey/SurveyShell";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  getVisibleFields,
  getVisibleSteps,
  isStepValid,
} from "@/lib/survey/engine";
import { clientSurvey } from "@/lib/survey/client";
import { providerSurvey } from "@/lib/survey/provider";
import type { Answers, SurveyDefinition } from "@/lib/survey/types";
import { cn } from "@/lib/utils";

const surveys = {
  cliente: clientSurvey,
  prestador: providerSurvey,
} as const;

type StoredState = {
  stepIndex: number;
  answers: Answers;
};

const emptyState: StoredState = { stepIndex: 0, answers: {} };

function subscribe() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

function readStored(storageKey: string): StoredState {
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw) as StoredState;
    return {
      stepIndex: parsed.stepIndex ?? 0,
      answers: parsed.answers ?? {},
    };
  } catch {
    sessionStorage.removeItem(storageKey);
    return emptyState;
  }
}

export function SurveyWizard({ surveyId }: { surveyId: keyof typeof surveys }) {
  const definition = surveys[surveyId];
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center font-mono text-sm text-muted-foreground">
        Preparando a ordem de serviço…
      </div>
    );
  }

  return <SurveyWizardForm definition={definition} />;
}

function SurveyWizardForm({ definition }: { definition: SurveyDefinition }) {
  const router = useRouter();
  const initial = readStored(definition.storageKey);
  const [stepIndex, setStepIndex] = useState(initial.stepIndex);
  const [answers, setAnswers] = useState<Answers>(initial.answers);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const visibleSteps = useMemo(
    () => getVisibleSteps(definition, answers),
    [answers, definition],
  );

  const safeIndex = Math.min(stepIndex, Math.max(visibleSteps.length - 1, 0));
  const currentStep = visibleSteps[safeIndex];
  const fields = currentStep ? getVisibleFields(currentStep, answers) : [];
  const canContinue = currentStep ? isStepValid(currentStep, answers) : false;
  const isLast = safeIndex === visibleSteps.length - 1;

  useEffect(() => {
    sessionStorage.setItem(
      definition.storageKey,
      JSON.stringify({ stepIndex: safeIndex, answers }),
    );
  }, [answers, definition.storageKey, safeIndex]);

  function updateAnswer(name: string, value: unknown) {
    setAnswers((current) => ({ ...current, [name]: value }));
    setError(null);
  }

  async function submit() {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(definition.submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error ?? "Não foi possível enviar as respostas.");
      }

      sessionStorage.removeItem(definition.storageKey);
      router.push(`/obrigado?tipo=${definition.id}`);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível enviar as respostas.",
      );
      setSubmitting(false);
    }
  }

  function goNext() {
    if (!canContinue || !currentStep) return;
    if (isLast) {
      void submit();
      return;
    }
    setStepIndex(safeIndex + 1);
  }

  if (!currentStep) {
    return (
      <div className="flex min-h-screen items-center justify-center font-mono text-sm text-muted-foreground">
        Preparando a ordem de serviço…
      </div>
    );
  }

  return (
    <SurveyShell
      steps={visibleSteps}
      currentIndex={safeIndex}
      kicker={definition.intro.kicker}
    >
      <div className="flex h-full flex-col gap-8">
        {safeIndex === 0 ? (
          <div className="grid gap-3 border-b border-dashed border-form-line pb-6">
            <h1 className="text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
              {definition.intro.title}
            </h1>
            <p className="max-w-prose whitespace-pre-line text-muted-foreground">
              {definition.intro.description}
            </p>
          </div>
        ) : null}

        {currentStep.blurb ? (
          <blockquote className="border-l-4 border-highlight bg-highlight/20 px-4 py-3 text-[15px] leading-relaxed text-ink">
            {currentStep.blurb}
          </blockquote>
        ) : null}

        <div className="grid gap-8">
          {fields.map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              answers={answers}
              onChange={updateAnswer}
            />
          ))}
        </div>

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          {safeIndex > 0 ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-11 px-4"
              onClick={() => setStepIndex(safeIndex - 1)}
              disabled={submitting}
            >
              Voltar
            </Button>
          ) : (
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-11 px-4")}
            >
              Início
            </Link>
          )}

          <Button
            type="button"
            size="lg"
            className="h-11 min-w-32 px-5"
            disabled={!canContinue || submitting}
            onClick={goNext}
          >
            {submitting ? "Enviando…" : isLast ? "Enviar respostas" : "Continuar"}
          </Button>
        </div>
      </div>
    </SurveyShell>
  );
}
