CREATE DATABASE  IF NOT EXISTS `NCITY` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `NCITY`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: j6e106.p.ssafy.io    Database: NCITY
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_file`
--

DROP TABLE IF EXISTS `auth_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_file` (
  `file_id` bigint NOT NULL AUTO_INCREMENT,
  `auth_id` bigint NOT NULL,
  `file_name` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `file_size` float NOT NULL,
  `file_content_type` varchar(300) COLLATE utf8mb4_bin NOT NULL,
  `file_url` varchar(300) COLLATE utf8mb4_bin NOT NULL,
  `reg_dt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`file_id`),
  KEY `FK_authentication_TO_auth_file` (`auth_id`),
  CONSTRAINT `FK_authentication_TO_auth_file` FOREIGN KEY (`auth_id`) REFERENCES `authentication` (`auth_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_file`
--

LOCK TABLES `auth_file` WRITE;
/*!40000 ALTER TABLE `auth_file` DISABLE KEYS */;
INSERT INTO `auth_file` VALUES (1,1,'224d19dd-52e4-4685-a154-742b61dc1a30.pdf',68965,'application/pdf','https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/224d19dd-52e4-4685-a154-742b61dc1a30.pdf','2022-04-07 21:35:47'),(2,2,'7dbaf5f8-f4a7-4f60-8083-dd57badc8bdd.pdf',68965,'application/pdf','https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/7dbaf5f8-f4a7-4f60-8083-dd57badc8bdd.pdf','2022-04-07 21:35:49');
/*!40000 ALTER TABLE `auth_file` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 11:47:39
