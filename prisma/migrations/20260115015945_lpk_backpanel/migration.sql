/*
  Warnings:

  - You are about to drop the column `access_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `id_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider_account_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to alter the column `user_id` on the `attendance_records` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `VarChar(255)`.
  - You are about to drop the column `ip_address` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `last_activity` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `payload` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_agent` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `sessions` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email_verified_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `remember_token` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `VarChar(255)`.
  - You are about to drop the `better_auth_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `password_reset_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `accounts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `expires_at` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `attendance_records` DROP FOREIGN KEY `attendance_records_attendance_session_id_foreign`;

-- DropForeignKey
ALTER TABLE `attendance_records` DROP FOREIGN KEY `attendance_records_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `better_auth_sessions` DROP FOREIGN KEY `better_auth_sessions_user_id_fkey`;

-- DropIndex
DROP INDEX `accounts_provider_provider_account_id_key` ON `accounts`;

-- DropIndex
DROP INDEX `sessions_last_activity_index` ON `sessions`;

-- DropIndex
DROP INDEX `sessions_user_id_index` ON `sessions`;

-- AlterTable
ALTER TABLE `accounts` DROP COLUMN `access_token`,
    DROP COLUMN `expires_at`,
    DROP COLUMN `id_token`,
    DROP COLUMN `provider`,
    DROP COLUMN `provider_account_id`,
    DROP COLUMN `refresh_token`,
    DROP COLUMN `session_state`,
    DROP COLUMN `token_type`,
    DROP COLUMN `type`,
    DROP COLUMN `user_id`,
    ADD COLUMN `accessToken` TEXT NULL,
    ADD COLUMN `access_token_expires_at` DATETIME(3) NULL,
    ADD COLUMN `accountId` TEXT NOT NULL,
    ADD COLUMN `idToken` TEXT NULL,
    ADD COLUMN `password` TEXT NULL,
    ADD COLUMN `providerId` TEXT NOT NULL,
    ADD COLUMN `refreshToken` TEXT NULL,
    ADD COLUMN `refresh_token_expires_at` DATETIME(3) NULL,
    ADD COLUMN `userId` VARCHAR(255) NOT NULL,
    MODIFY `scope` TEXT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `attendance_records` MODIFY `user_id` VARCHAR(255) NOT NULL,
    MODIFY `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `attendance_sessions` MODIFY `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `sessions` DROP COLUMN `ip_address`,
    DROP COLUMN `last_activity`,
    DROP COLUMN `payload`,
    DROP COLUMN `user_agent`,
    DROP COLUMN `user_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expires_at` DATETIME(3) NOT NULL,
    ADD COLUMN `ipAddress` TEXT NULL,
    ADD COLUMN `token` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `userAgent` TEXT NULL,
    ADD COLUMN `userId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `email_verified_at`,
    DROP COLUMN `remember_token`,
    ADD COLUMN `email_verified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `id` VARCHAR(255) NOT NULL,
    MODIFY `password` TEXT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL,
    MODIFY `image` TEXT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `better_auth_sessions`;

-- DropTable
DROP TABLE `password_reset_tokens`;

-- DropTable
DROP TABLE `verification_tokens`;

-- CreateTable
CREATE TABLE `verifications` (
    `id` VARCHAR(255) NOT NULL,
    `identifier` TEXT NOT NULL,
    `value` TEXT NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `sessions_token_key` ON `sessions`(`token`);

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_records` ADD CONSTRAINT `attendance_records_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attendance_records` ADD CONSTRAINT `attendance_records_attendance_session_id_fkey` FOREIGN KEY (`attendance_session_id`) REFERENCES `attendance_sessions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `attendance_records` RENAME INDEX `attendance_records_attendance_session_id_foreign` TO `attendance_records_attendance_session_id_idx`;

-- RenameIndex
ALTER TABLE `attendance_records` RENAME INDEX `attendance_records_user_id_foreign` TO `attendance_records_user_id_idx`;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `users_email_unique` TO `users_email_key`;
