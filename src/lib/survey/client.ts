import { ageOptions, OTHER, serviceOptions } from "./options";
import type { SurveyDefinition } from "./types";

const skipIfNeverHired = (answers: { hiredBefore?: unknown }) =>
  answers.hiredBefore === "nunca";

export const clientSurvey: SurveyDefinition = {
  id: "cliente",
  storageKey: "pesquisa-cliente",
  submitUrl: "/api/respostas/cliente",
  intro: {
    kicker: "Pesquisa de campo",
    title: "Pesquisa sobre contratação de serviços",
    description:
      "Estamos realizando uma pesquisa para entender como as pessoas encontram e contratam profissionais para serviços do dia a dia, como manutenção, instalação, limpeza, beleza, assistência técnica, entre outros.\n\nA pesquisa é rápida e leva aproximadamente 3 minutos. As respostas serão utilizadas exclusivamente para fins de pesquisa e desenvolvimento de uma possível solução para esse mercado.",
  },
  steps: [
    {
      id: "hiredBefore",
      code: "OS-01",
      fields: [
        {
          name: "hiredBefore",
          label: "Você já precisou contratar algum profissional para realizar um serviço?",
          type: "single",
          options: [
            { value: "varias", label: "Sim, várias vezes" },
            { value: "algumas", label: "Sim, algumas vezes" },
            { value: "poucas", label: "Sim, poucas vezes" },
            { value: "nunca", label: "Nunca" },
          ],
        },
      ],
    },
    {
      id: "services",
      code: "OS-02",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "services",
          label: "Que tipo de serviço você já contratou?",
          hint: "Pode marcar quantos quiser.",
          type: "multi",
          options: serviceOptions,
          otherValue: OTHER,
          otherField: "servicesOther",
          otherPlaceholder: "Qual outro serviço?",
        },
      ],
    },
    {
      id: "searchChannels",
      code: "OS-03",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "searchChannels",
          label:
            "Quando você precisa contratar alguém para realizar um serviço, onde normalmente procura?",
          hint: "Pode marcar mais de uma opção.",
          type: "multi",
          options: [
            { value: "indicacao", label: "Indicação de amigos/familiares" },
            { value: "whatsapp", label: "WhatsApp" },
            { value: "google", label: "Google" },
            { value: "instagram", label: "Instagram" },
            { value: "facebook", label: "Facebook" },
            { value: "olx", label: "OLX" },
            { value: "marketplace", label: "Marketplace" },
            { value: "sites_especializados", label: "Sites especializados" },
            { value: "grupos_whatsapp", label: "Grupos de WhatsApp" },
            { value: "grupos_facebook", label: "Grupos de Facebook" },
            { value: "profissional_confianca", label: "Já tenho um profissional de confiança" },
            { value: OTHER, label: "Outro" },
          ],
          otherValue: OTHER,
          otherField: "searchChannelsOther",
          otherPlaceholder: "Onde mais você procura?",
        },
      ],
    },
    {
      id: "mainDifficulty",
      code: "OS-04",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "mainDifficulty",
          label: "Qual é a principal dificuldade que você encontra ao procurar um profissional?",
          type: "single",
          options: [
            { value: "nao_sei_onde", label: "Não sei onde encontrar" },
            { value: "confiavel", label: "É difícil saber se o profissional é confiável" },
            { value: "comparar_precos", label: "Tenho dificuldade para comparar preços" },
            { value: "demora_orcamento", label: "Demoro para conseguir orçamento" },
            { value: "nao_respondem", label: "Muitos profissionais não respondem" },
            { value: "preco_varia", label: "O preço varia muito" },
            { value: "medo_sem_referencia", label: "Tenho medo de contratar alguém sem referência" },
            { value: "qualidade_antes", label: "Não consigo saber a qualidade do serviço antes de contratar" },
            { value: "ja_tive_problemas", label: "Já tive problemas com profissionais" },
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
      id: "decisionFactors",
      code: "OS-05",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "decisionFactors",
          label: "O que mais influencia sua decisão ao escolher um profissional?",
          hint: "Escolha até 3.",
          type: "multi",
          maxSelect: 3,
          options: [
            { value: "preco", label: "Preço" },
            { value: "avaliacoes", label: "Avaliações de outros clientes" },
            { value: "indicacao", label: "Indicação de alguém conhecido" },
            { value: "experiencia", label: "Experiência" },
            { value: "fotos", label: "Fotos de trabalhos anteriores" },
            { value: "tempo_atuacao", label: "Tempo de atuação" },
            { value: "perfil_completo", label: "Perfil profissional completo" },
            { value: "garantia", label: "Garantia do serviço" },
            { value: "prazo", label: "Prazo para realização" },
            { value: "comunicacao", label: "Facilidade de comunicação" },
            { value: "pagamento", label: "Forma de pagamento" },
            { value: OTHER, label: "Outro" },
          ],
          otherValue: OTHER,
          otherField: "decisionFactorsOther",
          otherPlaceholder: "O que mais influencia?",
        },
      ],
    },
    {
      id: "problems",
      code: "OS-06",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "hadProblem",
          label: "Você já teve algum problema ao contratar um profissional?",
          type: "single",
          options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" },
          ],
        },
        {
          name: "problemTypes",
          label: "Que tipo de problema você teve?",
          hint: "Pode marcar mais de uma opção.",
          type: "multi",
          visible: (answers) => answers.hadProblem === "sim",
          options: [
            { value: "mal_executado", label: "Serviço mal executado" },
            { value: "nao_apareceu", label: "Profissional não apareceu" },
            { value: "atraso", label: "Atraso" },
            { value: "preco_diferente", label: "Preço diferente do combinado" },
            { value: "cobranca_indevida", label: "Cobrança indevida" },
            { value: "dificil_encontrar_depois", label: "Dificuldade para encontrar o profissional novamente" },
            { value: "nao_terminou", label: "Profissional não terminou o serviço" },
            { value: "falta_garantia", label: "Falta de garantia" },
            { value: OTHER, label: "Outro" },
          ],
          otherValue: OTHER,
          otherField: "problemTypesOther",
          otherPlaceholder: "Qual outro problema?",
        },
      ],
    },
    {
      id: "quotes",
      code: "OS-07",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "howGetsQuote",
          label:
            "Quando você precisa de um serviço cujo preço não conhece, como normalmente consegue um orçamento?",
          type: "single",
          options: [
            { value: "conhecidos", label: "Pergunto para conhecidos" },
            { value: "pergunto_individual", label: "Procuro profissionais e pergunto individualmente" },
            { value: "google", label: "Pesquiso no Google" },
            { value: "grupos", label: "Pergunto em grupos de WhatsApp/Facebook" },
            { value: "instagram", label: "Procuro no Instagram" },
            { value: "nao_peco", label: "Não costumo pedir orçamento" },
            { value: OTHER, label: "Outro" },
          ],
          otherValue: OTHER,
          otherField: "howGetsQuoteOther",
          otherPlaceholder: "Como você consegue o orçamento?",
        },
        {
          name: "professionalsConsulted",
          label: "Normalmente, quantos profissionais você consulta antes de contratar?",
          type: "single",
          options: [
            { value: "1", label: "Apenas 1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4_mais", label: "4 ou mais" },
            { value: "nao_comparo", label: "Não costumo comparar" },
          ],
        },
      ],
    },
    {
      id: "proposals",
      code: "OS-08",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "proposalsUsefulness",
          label:
            "Se você pudesse enviar uma solicitação de serviço e receber propostas de diferentes profissionais para comparar, isso seria útil para você?",
          type: "single",
          options: [
            { value: "muito_util", label: "Muito útil" },
            { value: "util", label: "Útil" },
            { value: "pouco_util", label: "Pouco útil" },
            { value: "sem_diferenca", label: "Não faria diferença" },
            { value: "nao_util", label: "Não seria útil" },
          ],
        },
      ],
    },
    {
      id: "payment",
      code: "OS-09",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "paymentMethods",
          label: "Como você normalmente paga por serviços contratados?",
          hint: "Pode marcar mais de uma opção.",
          type: "multi",
          options: [
            { value: "pix", label: "PIX" },
            { value: "dinheiro", label: "Dinheiro" },
            { value: "credito", label: "Cartão de crédito" },
            { value: "debito", label: "Cartão de débito" },
            { value: "transferencia", label: "Transferência" },
            { value: OTHER, label: "Outro" },
          ],
          otherValue: OTHER,
          otherField: "paymentMethodsOther",
          otherPlaceholder: "Qual outra forma de pagamento?",
        },
        {
          name: "platformPaymentSafer",
          label:
            "Você se sentiria mais seguro pagando por uma plataforma que registrasse a contratação e o pagamento do serviço?",
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
      id: "reviews",
      code: "OS-10",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "looksForReviews",
          label:
            "Antes de contratar um profissional que você não conhece, você costuma procurar avaliações ou referências?",
          type: "single",
          options: [
            { value: "sempre", label: "Sempre" },
            { value: "as_vezes", label: "Às vezes" },
            { value: "raramente", label: "Raramente" },
            { value: "nunca", label: "Nunca" },
          ],
        },
        {
          name: "reviewsInfluence",
          label: "O quanto as avaliações de outros clientes influenciam sua decisão?",
          type: "scale",
          options: [
            { value: "1", label: "1 — Quase nada" },
            { value: "2", label: "2 — Pouco" },
            { value: "3", label: "3 — Mais ou menos" },
            { value: "4", label: "4 — Bastante" },
            { value: "5", label: "5 — Decisivo" },
          ],
        },
      ],
    },
    {
      id: "lastExperience",
      code: "OS-11",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "lastExperience",
          label:
            "Conte a última vez que você precisou contratar um profissional para realizar um serviço. Como encontrou essa pessoa e como foi a experiência?",
          type: "textarea",
          rows: 6,
          placeholder: "Onde encontrou, o que aconteceu, o que funcionou ou não…",
        },
      ],
    },
    {
      id: "solution",
      code: "OS-12",
      skip: skipIfNeverHired,
      blurb:
        "Imagine uma plataforma onde você pudesse encontrar profissionais, visualizar avaliações e serviços oferecidos, solicitar orçamentos, comparar propostas, contratar e acompanhar o serviço em um único lugar.",
      fields: [
        {
          name: "solutionUsefulness",
          label: "O quanto uma solução como essa seria útil para você?",
          type: "scale",
          options: [
            { value: "1", label: "1 — Nada útil" },
            { value: "2", label: "2 — Pouco útil" },
            { value: "3", label: "3 — Indiferente" },
            { value: "4", label: "4 — Útil" },
            { value: "5", label: "5 — Muito útil" },
          ],
        },
      ],
    },
    {
      id: "adoption",
      code: "OS-13",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "wouldUseReasons",
          label: "O que mais faria você utilizar uma plataforma assim?",
          hint: "Pode marcar mais de uma opção.",
          type: "multi",
          options: [
            { value: "profissionais_proximos", label: "Encontrar profissionais próximos" },
            { value: "avaliacoes_verificadas", label: "Avaliações verificadas" },
            { value: "comparar_propostas", label: "Comparar propostas" },
            { value: "varios_orcamentos", label: "Receber vários orçamentos" },
            { value: "pagamento_seguro", label: "Pagamento seguro" },
            { value: "garantia", label: "Garantia do serviço" },
            { value: "acompanhamento", label: "Acompanhamento da contratação" },
            { value: "historico", label: "Histórico dos serviços" },
            { value: "facilidade", label: "Facilidade para encontrar profissionais" },
            { value: OTHER, label: "Outro" },
          ],
          otherValue: OTHER,
          otherField: "wouldUseReasonsOther",
          otherPlaceholder: "O que mais faria você usar?",
        },
        {
          name: "wouldNotUse",
          label: "O que faria você NÃO utilizar uma plataforma assim?",
          type: "textarea",
          rows: 4,
          placeholder: "Taxa, desconfiança, costume de indicar, falta de profissionais na sua cidade…",
        },
      ],
    },
    {
      id: "fee",
      code: "OS-14",
      skip: skipIfNeverHired,
      fields: [
        {
          name: "wouldPayFee",
          label:
            "Se uma plataforma trouxesse mais segurança para a contratação, você aceitaria pagar alguma taxa adicional pelo serviço?",
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
      id: "demographics",
      code: "OS-15",
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
        {
          name: "hireFrequency",
          label: "Com que frequência você costuma contratar serviços?",
          type: "single",
          options: [
            { value: "menos_1_ano", label: "Menos de uma vez por ano" },
            { value: "1_3_ano", label: "1–3 vezes por ano" },
            { value: "4_6_ano", label: "4–6 vezes por ano" },
            { value: "mais_6_ano", label: "Mais de 6 vezes por ano" },
          ],
        },
      ],
    },
  ],
};
