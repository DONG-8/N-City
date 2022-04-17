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
-- Table structure for table `email_auth`
--

DROP TABLE IF EXISTS `email_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_auth` (
  `email_auth_id` bigint NOT NULL AUTO_INCREMENT,
  `email_auth_email` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `email_auth_expire_date` datetime(6) DEFAULT NULL,
  `email_auth_expired` bit(1) DEFAULT NULL,
  `email_auth_token` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `is_email_confirm` bit(1) DEFAULT NULL,
  PRIMARY KEY (`email_auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_auth`
--

LOCK TABLES `email_auth` WRITE;
/*!40000 ALTER TABLE `email_auth` DISABLE KEYS */;
INSERT INTO `email_auth` VALUES (1,'rednerino@naver.com','2022-04-08 03:28:33.833000',_binary '','092a0481-25c7-4b24-a16d-f300d8180c23',1,_binary ''),(2,'rednerino@naver.com','2022-04-08 03:32:23.337000',_binary '','24d0bdd9-97f0-4810-a821-07fee29c6022',1,_binary ''),(3,'jya3392@naver.com','2022-04-08 04:06:35.295000',_binary '','b98a1b5d-ff79-4adc-a98d-ffad3ed919e9',2,_binary ''),(4,'bbnerino@gmail.com','2022-04-08 04:55:44.700000',_binary '','0851b516-2187-4160-b786-4404ed2dbd10',1,_binary ''),(5,'bbnerino@gmail.com','2022-04-08 04:57:05.055000',_binary '','8aa03042-57a1-475d-ba00-30b53a435a92',1,_binary ''),(6,'qkrehdwns96@naver.com','2022-04-08 06:39:10.248000',_binary '','6c9f9671-6c04-4315-b605-8e71aa514cef',8,_binary ''),(7,'rednerino@naver.com','2022-04-08 07:58:39.273000',_binary '','34a4ebc2-a797-4ff5-b7ef-3b09e35ecaa7',1,_binary ''),(8,'djwodud@gmail.com','2022-04-08 07:58:57.252000',_binary '\0','8bc7221d-d3a9-409c-abcd-8770d69a9a79',2,_binary '\0'),(9,'rednerino@naver.com','2022-04-08 07:59:54.993000',_binary '','0efd0243-02ca-46da-bf15-5d05e3886b32',1,_binary ''),(10,'cys3362@naver.com','2022-04-08 08:47:26.688000',_binary '','ddcb7f2e-55fb-4b47-8b18-b87dac9cd526',4,_binary ''),(11,'mstkang@gmail.com','2022-04-08 09:18:29.732000',_binary '','0a1d5704-1da8-429f-9db6-077cbd114164',10,_binary '');
/*!40000 ALTER TABLE `email_auth` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 11:47:38
