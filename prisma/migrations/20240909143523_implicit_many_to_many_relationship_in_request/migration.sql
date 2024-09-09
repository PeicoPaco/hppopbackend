/*
  Warnings:

  - You are about to drop the column `equipment` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the `RequestedEquipment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RequestedEquipment" DROP CONSTRAINT "RequestedEquipment_equipment_id_fkey";

-- DropForeignKey
ALTER TABLE "RequestedEquipment" DROP CONSTRAINT "RequestedEquipment_request_id_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "equipment";

-- DropTable
DROP TABLE "RequestedEquipment";

-- CreateTable
CREATE TABLE "_EquipmentToRequest" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToRequest_AB_unique" ON "_EquipmentToRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToRequest_B_index" ON "_EquipmentToRequest"("B");

-- AddForeignKey
ALTER TABLE "_EquipmentToRequest" ADD CONSTRAINT "_EquipmentToRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToRequest" ADD CONSTRAINT "_EquipmentToRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
