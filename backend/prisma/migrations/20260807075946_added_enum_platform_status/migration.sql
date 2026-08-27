/*
  Warnings:

  - The `status` column on the `Platform` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PlatformStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "status",
ADD COLUMN     "status" "PlatformStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Station" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
