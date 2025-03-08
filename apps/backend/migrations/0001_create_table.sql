-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME
);

-- CreateTable
CREATE TABLE "base_urls" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "deleted_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "access_judgment_urls" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deleted_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "base_url_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    CONSTRAINT "access_judgment_urls_base_url_id_fkey" FOREIGN KEY ("base_url_id") REFERENCES "base_urls" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "access_judgment_urls_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "access_judgment_url_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_judgment_url_id" TEXT NOT NULL,
    CONSTRAINT "access_judgment_url_logs_access_judgment_url_id_fkey" FOREIGN KEY ("access_judgment_url_id") REFERENCES "access_judgment_urls" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "base_urls_url_key" ON "base_urls"("url");

-- CreateIndex
CREATE UNIQUE INDEX "access_judgment_urls_base_url_id_company_id_key" ON "access_judgment_urls"("base_url_id", "company_id");
