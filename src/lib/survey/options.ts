import type { Option } from "./types";

export const OTHER = "outro";

export const serviceOptions: Option[] = [
  { value: "eletricista", label: "Eletricista" },
  { value: "encanador", label: "Encanador" },
  { value: "pedreiro", label: "Pedreiro" },
  { value: "pintor", label: "Pintor" },
  { value: "montador_moveis", label: "Montador de móveis" },
  { value: "tecnico_informatica", label: "Técnico de informática" },
  { value: "mecanico", label: "Mecânico" },
  { value: "limpeza", label: "Limpeza" },
  { value: "jardinagem", label: "Jardinagem" },
  { value: "manutencao_residencial", label: "Manutenção residencial" },
  { value: "instalacao_equipamentos", label: "Instalação de equipamentos" },
  { value: "servicos_automotivos", label: "Serviços automotivos" },
  { value: "beleza_estetica", label: "Beleza/estética" },
  { value: OTHER, label: "Outro" },
];

export const ageOptions: Option[] = [
  { value: "menos_18", label: "Menos de 18" },
  { value: "18_24", label: "18–24" },
  { value: "25_34", label: "25–34" },
  { value: "35_44", label: "35–44" },
  { value: "45_54", label: "45–54" },
  { value: "55_64", label: "55–64" },
  { value: "65_mais", label: "65+" },
];

export function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}
