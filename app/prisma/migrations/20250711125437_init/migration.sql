-- CreateTable
CREATE TABLE "pokemon" (
    "pokemon_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("pokemon_id")
);

-- CreateTable
CREATE TABLE "type" (
    "type_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "type_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "pokemon_type" (
    "pokemon_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,

    CONSTRAINT "pokemon_type_pkey" PRIMARY KEY ("pokemon_id","type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_name_key" ON "pokemon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "type_name_key" ON "type"("name");

-- AddForeignKey
ALTER TABLE "pokemon_type" ADD CONSTRAINT "pokemon_type_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon"("pokemon_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_type" ADD CONSTRAINT "pokemon_type_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "type"("type_id") ON DELETE CASCADE ON UPDATE CASCADE;
