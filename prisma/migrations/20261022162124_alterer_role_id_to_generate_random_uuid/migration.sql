/*
  Warnings:

  - You are about to drop the column `permissionId` on the `accounts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_permissionId_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "permissionId";

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
