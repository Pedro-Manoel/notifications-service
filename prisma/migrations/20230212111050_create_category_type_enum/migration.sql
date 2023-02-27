/*
  Warnings:

  - Changed the type of `category` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('ALERT', 'NEWS', 'UPDATE', 'REMINDER', 'CONFIRMATION');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "category",
ADD COLUMN     "category" "CategoryType" NOT NULL;
