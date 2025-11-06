-- CreateTable
CREATE TABLE "public"."permission_pages" (
    "id" SERIAL NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "pageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "permission_pages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."permission_pages" ADD CONSTRAINT "permission_pages_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."permission_pages" ADD CONSTRAINT "permission_pages_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "public"."pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
