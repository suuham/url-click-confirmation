-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_urls" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "url" VARCHAR(256) NOT NULL,
    "deleted_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "base_urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_judgement_urls" (
    "id" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "base_url_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "access_judgement_urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_judgement_url_logs" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_judgement_url_id" TEXT NOT NULL,

    CONSTRAINT "access_judgement_url_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "base_urls_url_key" ON "base_urls"("url");

-- CreateIndex
CREATE UNIQUE INDEX "access_judgement_urls_base_url_id_company_id_key" ON "access_judgement_urls"("base_url_id", "company_id");

-- AddForeignKey
ALTER TABLE "access_judgement_urls" ADD CONSTRAINT "access_judgement_urls_base_url_id_fkey" FOREIGN KEY ("base_url_id") REFERENCES "base_urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_judgement_urls" ADD CONSTRAINT "access_judgement_urls_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_judgement_url_logs" ADD CONSTRAINT "access_judgement_url_logs_access_judgement_url_id_fkey" FOREIGN KEY ("access_judgement_url_id") REFERENCES "access_judgement_urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
