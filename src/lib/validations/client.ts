import { z } from "zod";

import {
  arrayOrNull,
  emptyToNull,
  scaleToNumber,
  yesNoToBoolean,
} from "@/lib/survey/engine";

const optionalText = z.string().optional();
const optionalList = z.array(z.string()).optional();

export const clientPayloadSchema = z
  .object({
    hiredBefore: z.enum(["varias", "algumas", "poucas", "nunca"]),
    services: optionalList,
    servicesOther: optionalText,
    searchChannels: optionalList,
    searchChannelsOther: optionalText,
    mainDifficulty: optionalText,
    mainDifficultyOther: optionalText,
    decisionFactors: optionalList,
    decisionFactorsOther: optionalText,
    hadProblem: z.enum(["sim", "nao"]).optional(),
    problemTypes: optionalList,
    problemTypesOther: optionalText,
    howGetsQuote: optionalText,
    howGetsQuoteOther: optionalText,
    professionalsConsulted: optionalText,
    proposalsUsefulness: optionalText,
    paymentMethods: optionalList,
    paymentMethodsOther: optionalText,
    platformPaymentSafer: optionalText,
    looksForReviews: optionalText,
    reviewsInfluence: optionalText,
    lastExperience: optionalText,
    solutionUsefulness: optionalText,
    wouldUseReasons: optionalList,
    wouldUseReasonsOther: optionalText,
    wouldNotUse: optionalText,
    wouldPayFee: optionalText,
    ageRange: z.string().min(1),
    cityState: z.string().trim().min(1),
    hireFrequency: z.string().min(1),
  })
  .superRefine((data, ctx) => {
    if (data.hiredBefore === "nunca") {
      return;
    }

    const requiredText: Array<keyof typeof data> = [
      "mainDifficulty",
      "howGetsQuote",
      "professionalsConsulted",
      "proposalsUsefulness",
      "platformPaymentSafer",
      "looksForReviews",
      "reviewsInfluence",
      "lastExperience",
      "solutionUsefulness",
      "wouldNotUse",
      "wouldPayFee",
      "hadProblem",
    ];

    for (const key of requiredText) {
      if (!String(data[key] ?? "").trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório",
          path: [key],
        });
      }
    }

    const requiredLists: Array<keyof typeof data> = [
      "services",
      "searchChannels",
      "decisionFactors",
      "paymentMethods",
      "wouldUseReasons",
    ];

    for (const key of requiredLists) {
      const value = data[key];
      if (!Array.isArray(value) || value.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório",
          path: [key],
        });
      }
    }

    if (data.hadProblem === "sim" && (!data.problemTypes || data.problemTypes.length === 0)) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obrigatório",
        path: ["problemTypes"],
      });
    }
  });

export type ClientPayload = z.infer<typeof clientPayloadSchema>;

export function toClientResponseData(payload: ClientPayload) {
  const neverHired = payload.hiredBefore === "nunca";

  return {
    hiredBefore: payload.hiredBefore,
    services: neverHired ? undefined : arrayOrNull(payload.services),
    servicesOther: neverHired ? null : emptyToNull(payload.servicesOther),
    searchChannels: neverHired ? undefined : arrayOrNull(payload.searchChannels),
    searchChannelsOther: neverHired ? null : emptyToNull(payload.searchChannelsOther),
    mainDifficulty: neverHired ? null : emptyToNull(payload.mainDifficulty),
    mainDifficultyOther: neverHired ? null : emptyToNull(payload.mainDifficultyOther),
    decisionFactors: neverHired ? undefined : arrayOrNull(payload.decisionFactors),
    decisionFactorsOther: neverHired ? null : emptyToNull(payload.decisionFactorsOther),
    hadProblem: neverHired ? null : yesNoToBoolean(payload.hadProblem),
    problemTypes:
      neverHired || payload.hadProblem !== "sim"
        ? undefined
        : arrayOrNull(payload.problemTypes),
    problemTypesOther:
      neverHired || payload.hadProblem !== "sim" ? null : emptyToNull(payload.problemTypesOther),
    howGetsQuote: neverHired ? null : emptyToNull(payload.howGetsQuote),
    howGetsQuoteOther: neverHired ? null : emptyToNull(payload.howGetsQuoteOther),
    professionalsConsulted: neverHired ? null : emptyToNull(payload.professionalsConsulted),
    proposalsUsefulness: neverHired ? null : emptyToNull(payload.proposalsUsefulness),
    paymentMethods: neverHired ? undefined : arrayOrNull(payload.paymentMethods),
    paymentMethodsOther: neverHired ? null : emptyToNull(payload.paymentMethodsOther),
    platformPaymentSafer: neverHired ? null : emptyToNull(payload.platformPaymentSafer),
    looksForReviews: neverHired ? null : emptyToNull(payload.looksForReviews),
    reviewsInfluence: neverHired ? null : scaleToNumber(payload.reviewsInfluence),
    lastExperience: neverHired ? null : emptyToNull(payload.lastExperience),
    solutionUsefulness: neverHired ? null : scaleToNumber(payload.solutionUsefulness),
    wouldUseReasons: neverHired ? undefined : arrayOrNull(payload.wouldUseReasons),
    wouldUseReasonsOther: neverHired ? null : emptyToNull(payload.wouldUseReasonsOther),
    wouldNotUse: neverHired ? null : emptyToNull(payload.wouldNotUse),
    wouldPayFee: neverHired ? null : emptyToNull(payload.wouldPayFee),
    ageRange: payload.ageRange,
    cityState: payload.cityState.trim(),
    hireFrequency: payload.hireFrequency,
  };
}
