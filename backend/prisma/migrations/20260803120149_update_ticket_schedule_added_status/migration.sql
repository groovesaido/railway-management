/*
  Warnings:

  - The `status` column on the `Schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `travelTime` on the `Ticket` table. All the data in the column will be lost.
  - The `status` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `travelDate` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'USED');

-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('SCHEDULED', 'ON_ROUTE', 'DELAYED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "status",
ADD COLUMN     "status" "ScheduleStatus" NOT NULL DEFAULT 'SCHEDULED';

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "travelTime",
ADD COLUMN     "travelDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT 'ACTIVE';
