-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_urls" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "base_urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "read_approved_urls" (
    "id" TEXT NOT NULL,
    "is_viewed" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "base_url_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "read_approved_urls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "read_approved_urls" ADD CONSTRAINT "read_approved_urls_base_url_id_fkey" FOREIGN KEY ("base_url_id") REFERENCES "base_urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "read_approved_urls" ADD CONSTRAINT "read_approved_urls_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
