-- ------------------------------------------------------------------------------
-- Logical Data Model
-- Modèle logique des données pour le projet Scriptura.js
-- ------------------------------------------------------------------------------
-- @note le choix du vocabulaire des colonnes est inspiré de schema.org

-- création d'une base de donnée
CREATE DATABASE IF NOT EXISTS test DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
-- utf8mb4_general_ci

-- base de donnée de référence pour les commandes qui suivront
USE test;


CREATE TABLE IF NOT EXISTS `_config` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `date_created` DATETIME NULL,
    `manager_id` BIGINT UNSIGNED NULL,
    `style` TINYINT(2) UNSIGNED NULL,
    `logo_id` BIGINT UNSIGNED NULL,
    `favicon` VARCHAR(255) NULL,
    `background_id` BIGINT NULL,
    `default_thumbnail` BIGINT NULL,
    `snowstorm` TINYINT(1) UNSIGNED NULL,
    `google_analytics_api_key` VARCHAR(16) NULL,
    `google_maps_api_key` VARCHAR(16) NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_web_account` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(32) NOT NULL,
    `password` CHAR(40)CHARACTER SET ASCII NOT NULL,
    `email` VARCHAR(128) NULL,
    `status` TINYINT(11) UNSIGNED NOT NULL,
    `display_name` VARCHAR(64) NOT NULL,
    `language` VARCHAR(5) NULL,
    `visibility` TINYINT(1) UNSIGNED NOT NULL,
    `community` VARCHAR(40) NULL,
    `site_style` TINYINT(1) UNSIGNED NULL,
    `time_zone` CHAR(32) NULL,
    `summer_time` TINYINT(1) UNSIGNED NULL,
    `private_message` TINYINT(1) UNSIGNED NULL,
    `date_created` DATETIME NOT NULL,
    `date_modified` DATETIME NULL,
    `last_login` DATETIME NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_person` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `web_account_id` BIGINT UNSIGNED NULL,
    `gender` TINYINT(1) UNSIGNED NULL,
    `given_name` VARCHAR(32) NULL,
    `family_name` VARCHAR(32) NULL,
    `additional_name` VARCHAR(32) NULL,
    `honorific_prefix` VARCHAR(5) NULL,
    `honorific_suffix` VARCHAR(10) NULL,
    `birth_date` DATETIME NULL,
    `birth_place_id` BIGINT UNSIGNED NULL,
    `death_date` DATETIME NULL,
    `death_place_id` BIGINT UNSIGNED NULL,
    `nationality` VARCHAR(32) NULL,
    `place_id` BIGINT UNSIGNED NULL,
    `telephone` VARCHAR(32) NULL,
    `telephone2` VARCHAR(32) NULL,
    `email` VARCHAR(128) NULL,
    `fax` VARCHAR(32) NULL,
    `url` VARCHAR(255) NULL,
    `occupation` VARCHAR(30) NULL,
    `bias` VARCHAR(30) NULL,
    `hobby` VARCHAR(64) NULL,
    `organization_id` BIGINT UNSIGNED NULL,
    `award` VARCHAR(128) NULL,
    `media_id` BIGINT UNSIGNED NULL,
    `signature` VARCHAR(100) NULL,
    `description` TEXT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_organization` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `type` VARCHAR(30) NULL,
    `purpose` VARCHAR(30) NULL,
    `duns` INT(9) NULL,
    `siret` INT(14) NULL,
    `brand` VARCHAR(255) NULL,
    `place_id` BIGINT NULL,
    `email` VARCHAR(128) NULL,
    `telephone` VARCHAR(30) NULL,
    `telephone_2` VARCHAR(30) NULL,
    `fax` VARCHAR(30) NULL,
    `url` VARCHAR(255) NULL,
    `media_id` BIGINT UNSIGNED NULL,
    `person_id` VARCHAR(255) NULL,
    `parent_id` BIGINT UNSIGNED NULL,
    `lft` BIGINT UNSIGNED NULL,
    `rgt` BIGINT UNSIGNED NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_place` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) NULL,
    `street` VARCHAR(60) NULL,
    `postal_code` VARCHAR(16) NULL,
    `locality` VARCHAR(64) NULL,
    `region` VARCHAR(64) NULL,
    `country` VARCHAR(64) NULL,
    `latitude` FLOAT(10,6) NULL,
    `longitude` FLOAT(10,6) NULL,
    `elevation` FLOAT(10,6) NULL,
    `type` VARCHAR(30) NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_post` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `content` TEXT NULL,
    `date_created` DATETIME NOT NULL,
    `date_modified` DATETIME NULL,
    `date_published` DATETIME NULL,
    `type` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `canonical_url` VARCHAR(255) NULL,
    `meta_title` VARCHAR(255) NULL,
    `meta_description` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `excerpt` VARCHAR(255) NULL,
    `author_id` BIGINT UNSIGNED NOT NULL,
    `contributors_id` VARCHAR(255) NULL,
    `status` TINYINT(1) UNSIGNED NOT NULL,
    `comments_status` TINYINT(1) UNSIGNED NOT NULL,
    `comments_count` SMALLINT UNSIGNED NULL,
    `keywords_id` VARCHAR(255) NULL,
    `medias_id` VARCHAR(255) NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_media` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `date_created` DATETIME NOT NULL,
    `date_modified` DATETIME NULL,
    `type` VARCHAR(255) NULL,
    `url` VARCHAR(255) NULL,
    `posts_id` BIGINT UNSIGNED NULL,
    `description` VARCHAR(255) NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_comment` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `date_created` DATETIME NOT NULL,
    `date_modified` DATETIME NULL,
    `author_id` SMALLINT UNSIGNED NOT NULL,
    `posts` SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_keyword` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `slug` VARCHAR(255) NULL,
    `parent_id` BIGINT UNSIGNED NULL,
    `lft` BIGINT UNSIGNED NULL,
    `rgt` BIGINT UNSIGNED NULL,
    `value` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_product` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `price` SMALLINT NULL,
    `iso` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `keywords_id` VARCHAR(255) NULL,
    `medias` BIGINT UNSIGNED NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_invoice` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` BIGINT UNSIGNED NOT NULL,
    `client_id` BIGINT UNSIGNED NOT NULL,
    `organization_id` BIGINT UNSIGNED NOT NULL,
    `list` VARCHAR(255) NULL,
    `date_created` DATETIME NOT NULL,
    `date_modified` DATETIME NULL,
    `purchase` DATETIME NULL,
    `billing_id` BIGINT UNSIGNED NULL,
    `description` TEXT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_event` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `begin` DATETIME NOT NULL,
    `end` DATETIME NULL,
    `description` TEXT NULL,
    `date_created` DATETIME NOT NULL,
    `date_modified` DATETIME NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `_number_option` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `value` INT NULL,
    PRIMARY KEY (id)
)  ENGINE=MYISAM;


CREATE TABLE IF NOT EXISTS `_text_option` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `value` TEXT NULL,
    PRIMARY KEY (id)
)  ENGINE=MYISAM;

