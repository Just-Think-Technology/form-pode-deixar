export type Answers = Record<string, unknown>;

export type Option = {
  value: string;
  label: string;
};

export type FieldType = "single" | "multi" | "text" | "textarea" | "scale";

export type SurveyField = {
  name: string;
  label: string;
  hint?: string;
  type: FieldType;
  options?: Option[];
  otherValue?: string;
  otherField?: string;
  otherPlaceholder?: string;
  maxSelect?: number;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  visible?: (answers: Answers) => boolean;
};

export type SurveyStep = {
  id: string;
  code: string;
  title?: string;
  description?: string;
  blurb?: string;
  fields: SurveyField[];
  skip?: (answers: Answers) => boolean;
};

export type SurveyDefinition = {
  id: "cliente" | "prestador";
  storageKey: string;
  submitUrl: string;
  intro: {
    kicker: string;
    title: string;
    description: string;
  };
  steps: SurveyStep[];
};
