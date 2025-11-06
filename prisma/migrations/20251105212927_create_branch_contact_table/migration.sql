/*
  Warnings:

  - You are about to drop the column `isWhatsapp` on the `branches` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `branches` table. All the data in the column will be lost.
  - You are about to drop the `plans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenant_plans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."tenant_plans" DROP CONSTRAINT "tenant_plans_planId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tenant_plans" DROP CONSTRAINT "tenant_plans_tenantId_fkey";

-- AlterTable
ALTER TABLE "public"."branches" DROP COLUMN "isWhatsapp",
DROP COLUMN "phone";

-- DropTable
DROP TABLE "public"."plans";

-- DropTable
DROP TABLE "public"."tenant_plans";

-- CreateTable
CREATE TABLE "public"."branch_contacts" (
    "id" SERIAL NOT NULL,
    "branchId" INTEGER NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "isWhatsapp" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "branch_contacts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."branch_contacts" ADD CONSTRAINT "branch_contacts_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
