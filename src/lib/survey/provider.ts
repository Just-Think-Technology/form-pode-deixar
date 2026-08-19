import { ageOptions, OTHER } from "./options";
import type { SurveyDefinition } from "./types";

const skipIfNotProvider = (answers: { workType?: unknown }) =>
  answers.workType === "nao";

export const providerSurvey: SurveyDefinition = {
  id: "prestador",
  storageKey: "pesquisa-prestador",
  submitUrl: "/api/respostas/prestador",
  intro: {
    kicker: "Pesquisa de campo",
    title: "Pesquisa para quem presta serviços",
    description:
      "Queremos entender como profissionais encontram clientes, enviam orçamentos e lidam com o dia a dia da prestação de serviços.\n\nA pesquisa é rápida e leva aproximadamente 3 minutos. As respostas serão utilizadas exclusivamente para fins de pesquisa.",
  },
  steps: [
    {
      id: "workType",
      code: "OS-01",
      fields: [
        {
          name: "workType",
          label: "Você trabalha oferecendo algum tipo de serviço profissional?",
          type: "single",
          options: [
            { value: "autonomo", label: "Sim, como autônomo" },
            { value: "empresa", label: "Sim, tenho uma empresa/equipe" },
            { value: "complementar", label: "Sim, como renda complementar" },
            { value: "nao", label: "Não" },
          ],
        },
      ],
    },
    {
      id: "notProvider",
      code: "OS-00",
      skip: (answers) => answers.workType !== "nao",
      blurb:
        "Esta pesquisa é para quem oferece serviços profissionais. Se você contrata serviços, há um outro formulário na página inicial.",
      fields: [],
    },
    {
      id: "serviceOffered",
      code: "OS-02",
      skip: skipIfNotProvider,
      fields: [
        {
          name: "serviceOffered",
          label: "Qual serviço você oferece?",
          type: "text",
          placeholder: "Ex.: encanador, limpeza, estética, assistência técnica…",
        },
      ],
    },
    {
      id: "clientAcquisition",
      code: "OS-03",
      skip: skipIfNotProvider,
      fields: [
        {
          name: "clientAcquisition",
          label: "Como atualmente consegue novos clientes?",
          hint: "Pode marcar mais de uma opção.",
          type: "multi",
          options: [
            { value: "indicacao", label: "Indicação" },
            { value: "whatsapp", label: "WhatsApp" },
            { value: "instagram", label: "Instagram" },
            { value: "facebook", label: "Facebook" },
            { value: "google", label: "Google" },
            { value: "olx", label: "OLX" },
            { value: "marketplace", label: "Marketplace" },
            { value: "clientes_antigos", label: "Clientes antigos" },
            { value: "divulgacao_propria", label: "Divulgação própria" },
            { value: OTHER, label: "Outro" },
          ],
          otherValue: OTHER,
          otherField: "clientAcquisitionOther",
          otherPlaceholder: "Como mais você consegue clientes?",
        },
      ],
    },
    {
      id: "mainDifficulty",
      code: "OS-04",
      skip: skipIfNotProvider,
      fields: [
        {
          name: "mainDifficulty",
          label: "Qual é sua maior dificuldade para conseguir novos clientes?",
          type: "single",
          options: [
            { value: "encontrar", label: "Encontrar novos clientes" },
            { value: "recorrentes", label: "Conseguir clientes recorrentes" },
            { value: "preco", label: "Concorrer por preço" },
            { value: "divulgar", label: "Divulgar meu trabalho" },
            { value: "confianca", label: "Passar confiança para novos clientes" },
            { value: "pagamentos", label: "Receber pagamentos" },
            { value: "organizar", label: "Organizar meus serviços" },
            { value: "orcamento_aprovado", label: "Conseguir orçamento aprovado" },
            { value: "sem_dificuldade", label: "Não tenho dificuldade" },
            { value: OTHER, label: "Outro" },
          ],
          otherValue: OTHER,
          otherField: "mainDifficultyOther",
          otherPlaceholder: "Qual outra dificuldade?",
        },
      ],
    },
    {
      id: "quotes",
      code: "OS-05",
      skip: skipIfNotProvider,
      fields: [
        {
          name: "sendsQuotes",
          label: "Você costuma enviar orçamentos antes de realizar um serviço?",
          type: "single",
          options: [
            { value: "sempre", label: "Sempre" },
            { value: "frequentemente", label: "Frequentemente" },
            { value: "as_vezes", label: "Às vezes" },
            { value: "raramente", label: "Raramente" },
            { value: "nunca", label: "Nunca" },
          ],
        },
        {
          name: "newClientsPerMonth",
          label: "Quantos novos clientes você consegue aproximadamente por mês?",
          type: "single",
          options: [
            { value: "0_2", label: "0–2" },
            { value: "3_5", label: "3–5" },
            { value: "6_10", label: "6–10" },
            { value: "11_20", label: "11–20" },
            { value: "mais_20", label: "Mais de 20" },
          ],
        },
      ],
    },
    {
      id: "platform",
      code: "OS-06",
      skip: skipIfNotProvider,
      fields: [
        {
          name: "wouldUsePlatform",
          label:
            "Você utilizaria uma plataforma que pudesse enviar clientes interessados no seu serviço?",
          type: "single",
          options: [
            { value: "sim", label: "Sim" },
            { value: "talvez", label: "Talvez" },
            { value: "nao", label: "Não" },
          ],
        },
      ],
    },
    {
      id: "commission",
      code: "OS-07",
      skip: skipIfNotProvider,
      fields: [
        {
          name: "wouldPayCommission",
          label:
            "Se a plataforma trouxesse um novo cliente para você e a contratação fosse realizada através dela, você aceitaria pagar uma pequena comissão pelo serviço?",
          type: "single",
          options: [
            { value: "sim", label: "Sim" },
            { value: "talvez", label: "Talvez, dependendo da comissão" },
            { value: "nao", label: "Não" },
          ],
        },
        {
          name: "commissionModel",
          label: "Qual modelo seria mais interessante para você?",
          type: "single",
          visible: (answers) =>
            answers.wouldPayCommission === "sim" ||
            answers.wouldPayCommission === "talvez",
          options: [
            { value: "taxa_por_servico", label: "Pagar uma pequena taxa por serviço contratado" },
            { value: "mensalidade", label: "Pagar uma mensalidade fixa" },
            { value: "so_quando_cliente", label: "Pagar somente quando conseguir um cliente" },
            { value: OTHER, label: "Outro" },
          ],
          otherValue: OTHER,
          otherField: "commissionModelOther",
          otherPlaceholder: "Qual outro modelo?",
        },
      ],
    },
    {
      id: "demographics",
      code: "OS-08",
      skip: skipIfNotProvider,
      fields: [
        {
          name: "ageRange",
          label: "Faixa etária",
          type: "single",
          options: ageOptions,
        },
        {
          name: "cityState",
          label: "Cidade/Estado",
          type: "text",
          placeholder: "Ex.: Curitiba, PR",
        },
      ],
    },
  ],
};
