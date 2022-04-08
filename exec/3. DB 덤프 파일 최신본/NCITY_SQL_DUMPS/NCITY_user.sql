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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `auth_id` bigint DEFAULT NULL,
  `user_address` varchar(50) COLLATE utf8mb4_bin NOT NULL COMMENT 'Unique',
  `user_role` varchar(15) COLLATE utf8mb4_bin NOT NULL DEFAULT 'ROLE_NEW',
  `user_nick` varchar(10) COLLATE utf8mb4_bin DEFAULT 'noname',
  `user_description` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `user_img_url` varchar(300) COLLATE utf8mb4_bin DEFAULT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `user_email_confirm` bit(1) DEFAULT NULL,
  `user_token_request` bit(1) DEFAULT b'0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_address` (`user_address`),
  KEY `FK_authentication_TO_user` (`auth_id`),
  CONSTRAINT `FK_authentication_TO_user` FOREIGN KEY (`auth_id`) REFERENCES `authentication` (`auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'0x6a1b34800a7b88fef41117afdf916c6762eb5519','ROLE_ADMIN','하이현홍','저에요 저 임현홍이요','https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/0a9f3291-a1f0-459a-84d6-0d15793f9fca.gif','bbnerino@gmail.com',_binary '\0',NULL),(2,NULL,'0xd974604feb1260bf365cd42dcf628ffd5b214580','ROLE_ARTIST','딩가딩가','진줘부레두','https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/4b84b089-7049-4665-a7f4-a36aeb24ac4e.png','jya3392@naver.com',_binary '',_binary '\0'),(3,NULL,'0x8c5323ab5eeaab8d4dafad7f5ccabc8c4c29a79f','ROLE_USER','noname',NULL,NULL,NULL,_binary '\0',NULL),(4,NULL,'0xd5caa9177e8b168e24abe9ddaf8a491a96ff1458','ROLE_USER','sac','Hi Hello~~ :)','https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/d07956bc-abac-49d7-bc77-5f0311f95a35.jpeg','cys3362@naver.com',_binary '',_binary '\0'),(5,NULL,'0xc497d00444da8c98470f4e10582f6cffe1d2504c','ROLE_USER','noname',NULL,NULL,NULL,_binary '\0',NULL),(6,NULL,'0xb9af1ee9228befd6f19c623441614c74cf766b0b','ROLE_USER','noname',NULL,NULL,NULL,_binary '\0',NULL),(7,NULL,'0x0b8360be1da812ac879e6f38a21ce1cf57511d6e','ROLE_ADMIN','noname',NULL,NULL,NULL,_binary '\0',NULL),(8,2,'0xf1e220bb5d8b72a31d3a578d0424f7a10c76a382','ROLE_INFLUENCER','동탁이에요','안녕하세요\n동도로동동 동탁입니다!! ><\n','','qkrehdwns96@naver.com',_binary '',NULL),(9,NULL,'0x82fdb0e9502b793a9de5fde289ed8fb78fcbae48','ROLE_USER','noname',NULL,NULL,NULL,_binary '\0',NULL),(10,NULL,'0xcb44ba6e90a8f57ee9442f24245874bbbd2c57f7','ROLE_INFLUENCER','Simon','강시몬 컨설턴트입니다.','','mstkang@gmail.com',_binary '',_binary '\0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 11:47:41
