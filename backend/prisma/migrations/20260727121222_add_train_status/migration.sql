/*
  Warnings:

  - The `status` column on the `Train` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TrainStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'DELAYED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Train" DROP COLUMN "status",
ADD COLUMN     "status" "TrainStatus" NOT NULL DEFAULT 'ACTIVE';
