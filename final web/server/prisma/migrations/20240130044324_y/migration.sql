/*
  Warnings:

  - A unique constraint covering the columns `[data]` on the table `partidas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "partidas_data_key" ON "partidas"("data");
