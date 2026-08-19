"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { Option } from "@/lib/survey/types";

function ChoiceRow({
  children,
  selected,
  disabled,
}: {
  children: React.ReactNode;
  selected: boolean;
  disabled?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-md border px-3 py-3 text-sm leading-snug transition-colors",
        selected
          ? "border-workshop bg-workshop/8 shadow-[inset_3px_0_0_var(--workshop)]"
          : "border-form-line/80 bg-white/60 hover:border-ink/30 hover:bg-white",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {children}
    </label>
  );
}

export function SingleChoice({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next);
      }}
      className="gap-2"
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <ChoiceRow key={option.value} selected={selected}>
            <RadioGroupItem
              value={option.value}
              className="mt-0.5"
            />
            <span>{option.label}</span>
          </ChoiceRow>
        );
      })}
    </RadioGroup>
  );
}

export function MultiChoice({
  values,
  options,
  maxSelect,
  onChange,
}: {
  values: string[];
  options: Option[];
  maxSelect?: number;
  onChange: (values: string[]) => void;
}) {
  const atLimit = maxSelect !== undefined && values.length >= maxSelect;

  return (
    <div className="grid gap-2">
      {options.map((option) => {
        const selected = values.includes(option.value);
        const disabled = atLimit && !selected;

        return (
          <ChoiceRow key={option.value} selected={selected} disabled={disabled}>
            <Checkbox
              checked={selected}
              disabled={disabled}
              className="mt-0.5"
              onCheckedChange={(checked) => {
                if (checked) {
                  onChange([...values, option.value]);
                  return;
                }
                onChange(values.filter((item) => item !== option.value));
              }}
            />
            <span>{option.label}</span>
          </ChoiceRow>
        );
      })}
    </div>
  );
}
