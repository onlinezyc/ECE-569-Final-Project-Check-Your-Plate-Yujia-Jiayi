CREATE TABLE `Dietary Reference Intakes (DRI)`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT INDEX,
    `gender_code` INT NOT NULL,
    `age_group_code` INT NOT NULL,
    `nutrient_code` BIGINT NOT NULL,
    `unit` ENUM('') NOT NULL,
    `RDA` DOUBLE(8, 2) NULL,
    `AI` DOUBLE(8, 2) NULL,
    `UL` DOUBLE(8, 2) NOT NULL,
    PRIMARY KEY(`gender_code`)
);
ALTER TABLE
    `Dietary Reference Intakes (DRI)` ADD PRIMARY KEY(`age_group_code`);
ALTER TABLE
    `Dietary Reference Intakes (DRI)` ADD PRIMARY KEY(`nutrient_code`);
CREATE TABLE `Result-references`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT INDEX,
    `result_id` BIGINT NOT NULL,
    `ref_id` BIGINT NOT NULL,
    PRIMARY KEY(`result_id`)
);
ALTER TABLE
    `Result-references` ADD PRIMARY KEY(`ref_id`);
CREATE TABLE `User-Conditions`(
    `id` BIGINT NOT NULL,
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `condition_id` BIGINT NOT NULL,
    PRIMARY KEY(`condition_id`)
);
ALTER TABLE
    `User-Conditions` ADD INDEX `user_conditions_id_index`(`id`);
CREATE TABLE `References`(
    `ref_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `source_name` VARCHAR(255) NOT NULL,
    `authors` VARCHAR(255) NOT NULL,
    `publication_name` VARCHAR(255) NOT NULL,
    `publication_year` BIGINT NOT NULL
);
CREATE TABLE `Food Items`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `category` ENUM('') NOT NULL
);
CREATE TABLE `User-Allergies`(
    `id` BIGINT NOT NULL,
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `allergen_id` BIGINT NOT NULL,
    PRIMARY KEY(`allergen_id`)
);
ALTER TABLE
    `User-Allergies` ADD INDEX `user_allergies_id_index`(`id`);
CREATE TABLE `Users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `gender` ENUM('') NULL,
    `age_group` ENUM('') NULL,
    `column_7` BIGINT NOT NULL,
    `registrationDate` DATETIME NOT NULL,
    `diet_pref` ENUM('') NULL
);
ALTER TABLE
    `Users` ADD UNIQUE `users_email_unique`(`email`);
CREATE TABLE `Recipe-foods`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT INDEX,
    `recipe_id` INT NOT NULL,
    `food_id` BIGINT NOT NULL,
    `quantity` DOUBLE(8, 2) NOT NULL,
    `unit` ENUM('') NOT NULL,
    PRIMARY KEY(`recipe_id`)
);
ALTER TABLE
    `Recipe-foods` ADD PRIMARY KEY(`food_id`);
CREATE TABLE `Recipes`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` BIGINT NOT NULL,
    `diet_pref` ENUM('') NOT NULL,
    `create_date` TIMESTAMP NOT NULL,
    `last_update` TIMESTAMP NULL,
    `autor` INT NOT NULL,
    `updated_by` INT NULL
);
CREATE TABLE `Substances`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `category` INT NOT NULL,
    `description` VARCHAR(255) NULL,
    `unit` ENUM('') NOT NULL,
    `allergen` TINYINT(1) NOT NULL,
    `toxin` TINYINT(1) NOT NULL,
    `MSC` DOUBLE(8, 2) NULL
);
CREATE TABLE `user-watchlists`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT INDEX,
    `uid` INT NOT NULL,
    `recipe_id` BIGINT NOT NULL
);
CREATE TABLE `Condition Related Substances`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT INDEX,
    `condition_id` INT NOT NULL,
    `sub_id` BIGINT NOT NULL,
    PRIMARY KEY(`condition_id`)
);
ALTER TABLE
    `Condition Related Substances` ADD PRIMARY KEY(`sub_id`);
CREATE TABLE `Food-nutrients`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT INDEX,
    `food_id` BIGINT NOT NULL,
    `sub_id` BIGINT NOT NULL
);
CREATE TABLE `Physical Conditions`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL
);
CREATE TABLE `Food Analytical Results`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `food_id` BIGINT NOT NULL,
    `analysis method` VARCHAR(255) NOT NULL,
    `QC` VARCHAR(255) NOT NULL,
    `mean` BIGINT NOT NULL,
    `N` BIGINT NULL,
    `SEM` BIGINT NULL,
    `Min` BIGINT NULL,
    `Max` BIGINT NULL
);
ALTER TABLE
    `Recipe-foods` ADD CONSTRAINT `recipe_foods_recipe_id_foreign` FOREIGN KEY(`recipe_id`) REFERENCES `Recipes`(`id`);
ALTER TABLE
    `Condition Related Substances` ADD CONSTRAINT `condition related substances_condition_id_foreign` FOREIGN KEY(`condition_id`) REFERENCES `Physical Conditions`(`id`);
ALTER TABLE
    `Recipes` ADD CONSTRAINT `recipes_updated_by_foreign` FOREIGN KEY(`updated_by`) REFERENCES `Users`(`id`);
ALTER TABLE
    `User-Allergies` ADD CONSTRAINT `user_allergies_allergen_id_foreign` FOREIGN KEY(`allergen_id`) REFERENCES `Substances`(`id`);
ALTER TABLE
    `User-Conditions` ADD CONSTRAINT `user_conditions_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `user-watchlists` ADD CONSTRAINT `user_watchlists_recipe_id_foreign` FOREIGN KEY(`recipe_id`) REFERENCES `Recipes`(`id`);
ALTER TABLE
    `Substances` ADD CONSTRAINT `substances_id_foreign` FOREIGN KEY(`id`) REFERENCES `Dietary Reference Intakes (DRI)`(`nutrient_code`);
ALTER TABLE
    `Condition Related Substances` ADD CONSTRAINT `condition related substances_sub_id_foreign` FOREIGN KEY(`sub_id`) REFERENCES `Substances`(`id`);
ALTER TABLE
    `Recipe-foods` ADD CONSTRAINT `recipe_foods_food_id_foreign` FOREIGN KEY(`food_id`) REFERENCES `Food Items`(`id`);
ALTER TABLE
    `user-watchlists` ADD CONSTRAINT `user_watchlists_uid_foreign` FOREIGN KEY(`uid`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Food Analytical Results` ADD CONSTRAINT `food analytical results_food_id_foreign` FOREIGN KEY(`food_id`) REFERENCES `Food Items`(`id`);
ALTER TABLE
    `Users` ADD CONSTRAINT `users_age_group_foreign` FOREIGN KEY(`age_group`) REFERENCES `Dietary Reference Intakes (DRI)`(`age_group_code`);
ALTER TABLE
    `Food-nutrients` ADD CONSTRAINT `food_nutrients_food_id_foreign` FOREIGN KEY(`food_id`) REFERENCES `Food Items`(`id`);
ALTER TABLE
    `User-Allergies` ADD CONSTRAINT `user_allergies_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Food-nutrients` ADD CONSTRAINT `food_nutrients_sub_id_foreign` FOREIGN KEY(`sub_id`) REFERENCES `Substances`(`id`);
ALTER TABLE
    `Users` ADD CONSTRAINT `users_gender_foreign` FOREIGN KEY(`gender`) REFERENCES `Dietary Reference Intakes (DRI)`(`gender_code`);
ALTER TABLE
    `References` ADD CONSTRAINT `references_ref_id_foreign` FOREIGN KEY(`ref_id`) REFERENCES `Result-references`(`ref_id`);
ALTER TABLE
    `Result-references` ADD CONSTRAINT `result_references_result_id_foreign` FOREIGN KEY(`result_id`) REFERENCES `Food Analytical Results`(`id`);
ALTER TABLE
    `User-Conditions` ADD CONSTRAINT `user_conditions_condition_id_foreign` FOREIGN KEY(`condition_id`) REFERENCES `Physical Conditions`(`id`);
ALTER TABLE
    `Recipes` ADD CONSTRAINT `recipes_autor_foreign` FOREIGN KEY(`autor`) REFERENCES `Users`(`id`);