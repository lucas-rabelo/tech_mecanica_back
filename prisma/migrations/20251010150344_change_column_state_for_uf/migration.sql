/*
  Warnings:

  - You are about to drop the column `state` on the `branches` table. All the data in the column will be lost.
  - Added the required column `uf` to the `branches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."branches" DROP COLUMN "state",
ADD COLUMN     "uf" VARCHAR(255) NOT NULL;
