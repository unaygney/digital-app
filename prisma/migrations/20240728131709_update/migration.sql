-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "name" TEXT,
ALTER COLUMN "size" DROP NOT NULL;
