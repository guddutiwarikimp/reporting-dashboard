-- CreateTable
CREATE TABLE "public"."EmailTemplateLog" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "templateId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'sent',
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),
    "openedAt" TIMESTAMP(3),
    "clickedAt" TIMESTAMP(3),
    "repliedAt" TIMESTAMP(3),
    "bouncedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "metadata" JSONB DEFAULT '{}',
    "orgId" INTEGER,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailTemplateLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmailTemplateLog_email_idx" ON "public"."EmailTemplateLog"("email");

-- CreateIndex
CREATE INDEX "EmailTemplateLog_status_idx" ON "public"."EmailTemplateLog"("status");

-- CreateIndex
CREATE INDEX "EmailTemplateLog_orgId_idx" ON "public"."EmailTemplateLog"("orgId");

-- CreateIndex
CREATE INDEX "EmailTemplateLog_templateId_idx" ON "public"."EmailTemplateLog"("templateId");

-- CreateIndex
CREATE INDEX "EmailTemplateLog_createdAt_idx" ON "public"."EmailTemplateLog"("createdAt");
