-- CreateTable
CREATE TABLE "client_responses" (
    "id" TEXT NOT NULL,
    "hiredBefore" TEXT NOT NULL,
    "services" JSONB,
    "servicesOther" TEXT,
    "searchChannels" JSONB,
    "searchChannelsOther" TEXT,
    "mainDifficulty" TEXT,
    "mainDifficultyOther" TEXT,
    "decisionFactors" JSONB,
    "decisionFactorsOther" TEXT,
    "hadProblem" BOOLEAN,
    "problemTypes" JSONB,
    "problemTypesOther" TEXT,
    "howGetsQuote" TEXT,
    "howGetsQuoteOther" TEXT,
    "professionalsConsulted" TEXT,
    "proposalsUsefulness" TEXT,
    "paymentMethods" JSONB,
    "paymentMethodsOther" TEXT,
    "platformPaymentSafer" TEXT,
    "looksForReviews" TEXT,
    "reviewsInfluence" INTEGER,
    "lastExperience" TEXT,
    "solutionUsefulness" INTEGER,
    "wouldUseReasons" JSONB,
    "wouldUseReasonsOther" TEXT,
    "wouldNotUse" TEXT,
    "wouldPayFee" TEXT,
    "ageRange" TEXT,
    "cityState" TEXT,
    "hireFrequency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_responses" (
    "id" TEXT NOT NULL,
    "workType" TEXT NOT NULL,
    "serviceOffered" TEXT,
    "clientAcquisition" JSONB,
    "clientAcquisitionOther" TEXT,
    "mainDifficulty" TEXT,
    "mainDifficultyOther" TEXT,
    "sendsQuotes" TEXT,
    "newClientsPerMonth" TEXT,
    "wouldUsePlatform" TEXT,
    "wouldPayCommission" TEXT,
    "commissionModel" TEXT,
    "commissionModelOther" TEXT,
    "ageRange" TEXT,
    "cityState" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "provider_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "client_responses_createdAt_idx" ON "client_responses"("createdAt");

-- CreateIndex
CREATE INDEX "client_responses_hiredBefore_idx" ON "client_responses"("hiredBefore");

-- CreateIndex
CREATE INDEX "provider_responses_createdAt_idx" ON "provider_responses"("createdAt");

-- CreateIndex
CREATE INDEX "provider_responses_workType_idx" ON "provider_responses"("workType");
