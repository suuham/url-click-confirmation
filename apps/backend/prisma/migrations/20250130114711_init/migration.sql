-- CreateTable
CREATE TABLE "company-view-urls" (
    "id" TEXT NOT NULL,
    "companyName" VARCHAR(256) NOT NULL,
    "is_banned" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company-view-urls_pkey" PRIMARY KEY ("id")
);
