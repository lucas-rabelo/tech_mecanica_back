-- CreateTable
CREATE TABLE "public"."plans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "maxUsers" INTEGER NOT NULL,
    "maxBranches" INTEGER NOT NULL,
    "price" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tenant_plans" (
    "id" SERIAL NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tenant_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_plans_tenantId_key" ON "public"."tenant_plans"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_plans_planId_key" ON "public"."tenant_plans"("planId");

-- AddForeignKey
ALTER TABLE "public"."tenant_plans" ADD CONSTRAINT "tenant_plans_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tenant_plans" ADD CONSTRAINT "tenant_plans_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
