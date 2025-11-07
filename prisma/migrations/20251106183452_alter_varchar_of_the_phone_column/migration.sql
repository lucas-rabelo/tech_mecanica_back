/*
  Warnings:

  - You are about to alter the column `phone` on the `branch_contacts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(14)`.

*/
-- AlterTable
ALTER TABLE "public"."branch_contacts" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(14);
