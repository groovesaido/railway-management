/*
  Warnings:

  - The `ticketClass` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TicketClass" AS ENUM ('A', 'B', 'C');

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "ticketClass",
ADD COLUMN     "ticketClass" "TicketClass" NOT NULL DEFAULT 'C';
