/*
  Warnings:

  - Added the required column `email` to the `branch_contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."branch_contacts" ADD COLUMN     "email" VARCHAR(255) NOT NULL;
