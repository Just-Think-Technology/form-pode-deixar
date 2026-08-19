import { asString, asStringArray } from "./options";
import type { Answers, SurveyDefinition, SurveyField, SurveyStep } from "./types";

export function getVisibleSteps(
  definition: SurveyDefinition,
  answers: Answers,
): SurveyStep[] {
  return definition.steps.filter((step) => !step.skip?.(answers));
}

export function getVisibleFields(step: SurveyStep, answers: Answers): SurveyField[] {
  return step.fields.filter((field) => field.visible?.(answers) !== false);
}

function isFilled(field: SurveyField, answers: Answers): boolean {
  const value = answers[field.name];

  if (field.type === "multi") {
    const selected = asStringArray(value);
    if (selected.length === 0) {
      return false;
    }
    if (field.otherValue && field.otherField && selected.includes(field.otherValue)) {
      return asString(answers[field.otherField]).trim().length > 0;
    }
    return true;
  }

  const text = asString(value).trim();
  if (!text) {
    return false;
  }

  if (field.otherValue && field.otherField && text === field.otherValue) {
    return asString(answers[field.otherField]).trim().length > 0;
  }

  return true;
}

export function isStepValid(step: SurveyStep, answers: Answers): boolean {
  return getVisibleFields(step, answers).every((field) => {
    if (field.required === false) {
      if (field.otherValue && field.otherField) {
        const value = answers[field.name];
        if (field.type === "multi") {
          if (asStringArray(value).includes(field.otherValue)) {
            return asString(answers[field.otherField]).trim().length > 0;
          }
        } else if (asString(value) === field.otherValue) {
          return asString(answers[field.otherField]).trim().length > 0;
        }
      }
      return true;
    }

    return isFilled(field, answers);
  });
}

export function emptyToNull(value: unknown): string | null {
  const text = asString(value).trim();
  return text.length > 0 ? text : null;
}

export function arrayOrNull(value: unknown): string[] | undefined {
  const items = asStringArray(value);
  return items.length > 0 ? items : undefined;
}

export function yesNoToBoolean(value: unknown): boolean | null {
  if (value === "sim") return true;
  if (value === "nao") return false;
  return null;
}

export function scaleToNumber(value: unknown): number | null {
  const parsed = Number(asString(value));
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 5 ? parsed : null;
}
