import { cn } from "@/lib/utils";
import type { SurveyStep } from "@/lib/survey/types";

export function SurveyShell({
  children,
  steps,
  currentIndex,
  kicker,
}: {
  children: React.ReactNode;
  steps: SurveyStep[];
  currentIndex: number;
  kicker: string;
}) {
  const progress = steps.length > 0 ? ((currentIndex + 1) / steps.length) * 100 : 0;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <div className="relative pt-6">
        <div className="clipboard-clip absolute top-0 left-1/2 z-10 -translate-x-1/2" />

        <div className="clipboard-board overflow-hidden rounded-sm border border-form-line">
          <div className="flex min-h-[70vh] flex-col md:flex-row">
            <aside className="relative hidden w-[7.25rem] shrink-0 border-r border-dashed border-form-line bg-[#edf3f8] md:block">
              <div className="stub-perforation absolute inset-y-0 right-[-6px] w-3" />
              <div className="flex h-full flex-col gap-1 p-3 pt-8">
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  Via
                </p>
                {steps.map((step, index) => {
                  const current = index === currentIndex;
                  const done = index < currentIndex;
                  return (
                    <div
                      key={step.id}
                      className={cn(
                        "rounded-sm px-1.5 py-1 font-mono text-[10px] tracking-wide",
                        current && "bg-highlight text-ink",
                        done && "text-workshop",
                        !current && !done && "text-form-line",
                      )}
                    >
                      {step.code}
                    </div>
                  );
                })}
              </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
              <header className="border-b border-form-line px-5 py-4 sm:px-8">
                <p className="font-mono text-[11px] tracking-[0.22em] text-workshop uppercase">
                  {kicker}
                </p>
                <div className="mt-3 md:hidden">
                  <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                    <span>{steps[currentIndex]?.code}</span>
                    <span>
                      {currentIndex + 1}/{steps.length}
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-workshop transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </header>
              <div className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
