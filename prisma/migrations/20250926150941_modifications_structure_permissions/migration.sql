/*
  Warnings:

  - You are about to drop the `branch_services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `branches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenant_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_permission_modules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."branch_services" DROP CONSTRAINT "branch_services_branchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."branch_services" DROP CONSTRAINT "branch_services_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."branches" DROP CONSTRAINT "branches_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."pages" DROP CONSTRAINT "pages_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tenants" DROP CONSTRAINT "tenants_tenantStatusId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_permission_modules" DROP CONSTRAINT "user_permission_modules_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_permission_modules" DROP CONSTRAINT "user_permission_modules_userPermissionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_permissions" DROP CONSTRAINT "user_permissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_permissions" DROP CONSTRAINT "user_permissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_userStatusId_fkey";

-- DropTable
DROP TABLE "public"."branch_services";

-- DropTable
DROP TABLE "public"."branches";

-- DropTable
DROP TABLE "public"."modules";

-- DropTable
DROP TABLE "public"."pages";

-- DropTable
DROP TABLE "public"."permissions";

-- DropTable
DROP TABLE "public"."services";

-- DropTable
DROP TABLE "public"."tenant_status";

-- DropTable
DROP TABLE "public"."tenants";

-- DropTable
DROP TABLE "public"."user_permission_modules";

-- DropTable
DROP TABLE "public"."user_permissions";

-- DropTable
DROP TABLE "public"."user_status";

-- DropTable
DROP TABLE "public"."users";
