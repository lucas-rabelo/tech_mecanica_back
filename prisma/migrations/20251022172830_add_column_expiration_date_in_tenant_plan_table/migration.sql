/*
  Warnings:

  - Added the required column `expirationDate` to the `tenant_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tenant_plans" ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL;
