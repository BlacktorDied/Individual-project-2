-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Facility" (
    "facility_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "logo" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SCP" (
    "scp_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "photo" TEXT,
    "name" TEXT,
    "objectClass" TEXT,
    "containment" TEXT,
    "description" TEXT,
    "facility_id" INTEGER NOT NULL,
    CONSTRAINT "SCP_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "Facility" ("facility_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "facility_id" INTEGER NOT NULL,
    CONSTRAINT "Employee_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "Facility" ("facility_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
