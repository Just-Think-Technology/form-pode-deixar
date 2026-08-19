"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiChoice, SingleChoice } from "@/components/survey/ChoiceList";
import { asString, asStringArray } from "@/lib/survey/options";
import type { Answers, SurveyField } from "@/lib/survey/types";

export function FieldRenderer({
  field,
  answers,
  onChange,
}: {
  field: SurveyField;
  answers: Answers;
  onChange: (name: string, value: unknown) => void;
}) {
  const value = answers[field.name];
  const showOther =
    Boolean(field.otherValue && field.otherField) &&
    (field.type === "multi"
      ? asStringArray(value).includes(field.otherValue ?? "")
      : asString(value) === field.otherValue);

  return (
    <div className="grid gap-3">
      <div className="grid gap-1">
        <p className="text-lg font-medium leading-snug text-ink">{field.label}</p>
        {field.hint ? (
          <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            {field.hint}
          </p>
        ) : null}
      </div>

      {field.type === "single" || field.type === "scale" ? (
        <SingleChoice
          value={asString(value)}
          options={field.options ?? []}
          onChange={(next) => onChange(field.name, next)}
        />
      ) : null}

      {field.type === "multi" ? (
        <MultiChoice
          values={asStringArray(value)}
          options={field.options ?? []}
          maxSelect={field.maxSelect}
          onChange={(next) => onChange(field.name, next)}
        />
      ) : null}

      {field.type === "text" ? (
        <Input
          value={asString(value)}
          placeholder={field.placeholder}
          className="h-11 bg-white text-base"
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      ) : null}

      {field.type === "textarea" ? (
        <Textarea
          value={asString(value)}
          placeholder={field.placeholder}
          rows={field.rows ?? 4}
          className="min-h-32 bg-white text-base"
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      ) : null}

      {showOther && field.otherField ? (
        <Input
          value={asString(answers[field.otherField])}
          placeholder={field.otherPlaceholder ?? "Especifique"}
          className="h-11 bg-white text-base"
          onChange={(event) => onChange(field.otherField!, event.target.value)}
        />
      ) : null}
    </div>
  );
}
