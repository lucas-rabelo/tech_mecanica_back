/*
  Warnings:

  - A unique constraint covering the columns `[subdomain]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."tenants" ADD COLUMN     "subdomain" VARCHAR(255) NOT NULL DEFAULT 'test';

-- CreateIndex
CREATE UNIQUE INDEX "tenants_subdomain_key" ON "public"."tenants"("subdomain");
