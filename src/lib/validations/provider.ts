import { z } from "zod";

import { arrayOrNull, emptyToNull } from "@/lib/survey/engine";

const optionalText = z.string().optional();
const optionalList = z.array(z.string()).optional();

export const providerPayloadSchema = z
  .object({
    workType: z.enum(["autonomo", "empresa", "complementar", "nao"]),
    serviceOffered: optionalText,
    clientAcquisition: optionalList,
    clientAcquisitionOther: optionalText,
    mainDifficulty: optionalText,
    mainDifficultyOther: optionalText,
    sendsQuotes: optionalText,
    newClientsPerMonth: optionalText,
    wouldUsePlatform: optionalText,
    wouldPayCommission: optionalText,
    commissionModel: optionalText,
    commissionModelOther: optionalText,
    ageRange: optionalText,
    cityState: optionalText,
  })
  .superRefine((data, ctx) => {
    if (data.workType === "nao") {
      return;
    }

    const requiredText: Array<keyof typeof data> = [
      "serviceOffered",
      "mainDifficulty",
      "sendsQuotes",
      "newClientsPerMonth",
      "wouldUsePlatform",
      "wouldPayCommission",
      "ageRange",
      "cityState",
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

    if (!data.clientAcquisition || data.clientAcquisition.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obrigatório",
        path: ["clientAcquisition"],
      });
    }

    if (data.wouldPayCommission === "sim" || data.wouldPayCommission === "talvez") {
      if (!String(data.commissionModel ?? "").trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório",
          path: ["commissionModel"],
        });
      }
    }
  });

export type ProviderPayload = z.infer<typeof providerPayloadSchema>;

export function toProviderResponseData(payload: ProviderPayload) {
  const notProvider = payload.workType === "nao";
  const skipCommission =
    notProvider || payload.wouldPayCommission === "nao" || !payload.wouldPayCommission;

  return {
    workType: payload.workType,
    serviceOffered: notProvider ? null : emptyToNull(payload.serviceOffered),
    clientAcquisition: notProvider ? undefined : arrayOrNull(payload.clientAcquisition),
    clientAcquisitionOther: notProvider ? null : emptyToNull(payload.clientAcquisitionOther),
    mainDifficulty: notProvider ? null : emptyToNull(payload.mainDifficulty),
    mainDifficultyOther: notProvider ? null : emptyToNull(payload.mainDifficultyOther),
    sendsQuotes: notProvider ? null : emptyToNull(payload.sendsQuotes),
    newClientsPerMonth: notProvider ? null : emptyToNull(payload.newClientsPerMonth),
    wouldUsePlatform: notProvider ? null : emptyToNull(payload.wouldUsePlatform),
    wouldPayCommission: notProvider ? null : emptyToNull(payload.wouldPayCommission),
    commissionModel: skipCommission ? null : emptyToNull(payload.commissionModel),
    commissionModelOther: skipCommission ? null : emptyToNull(payload.commissionModelOther),
    ageRange: notProvider ? null : emptyToNull(payload.ageRange),
    cityState: notProvider ? null : emptyToNull(payload.cityState),
  };
}
