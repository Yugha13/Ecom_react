-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adminKey" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdminToCourses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_AdminToCourses_AB_unique" ON "_AdminToCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminToCourses_B_index" ON "_AdminToCourses"("B");

-- AddForeignKey
ALTER TABLE "_AdminToCourses" ADD CONSTRAINT "_AdminToCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToCourses" ADD CONSTRAINT "_AdminToCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
