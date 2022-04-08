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
-- Table structure for table `guestbook`
--

DROP TABLE IF EXISTS `guestbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guestbook` (
  `guestbook_id` bigint NOT NULL AUTO_INCREMENT,
  `guestbook_owner_id` bigint NOT NULL,
  `guestbook_writer_id` bigint NOT NULL COMMENT '방명록 남기는 사람',
  `guestbook_contents` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `guestbook_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`guestbook_id`),
  KEY `FK_userOwner_TO_guestbook` (`guestbook_owner_id`),
  KEY `FK_userVisitor_TO_guestbook` (`guestbook_writer_id`),
  CONSTRAINT `FK_userOwner_TO_guestbook` FOREIGN KEY (`guestbook_owner_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_userVisitor_TO_guestbook` FOREIGN KEY (`guestbook_writer_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guestbook`
--

LOCK TABLES `guestbook` WRITE;
/*!40000 ALTER TABLE `guestbook` DISABLE KEYS */;
INSERT INTO `guestbook` VALUES (1,1,1,'안녕하세요 ',NULL),(2,1,1,'제가 처음인가요?',NULL),(3,1,8,'안녕하세요 처음 방문 해 주셔서 너무 감사합니다!',NULL),(4,1,8,'ㅎㅎ',NULL),(5,1,1,'안녕하세요',NULL),(6,1,1,'안녀ㅛㅇ',NULL),(7,8,8,'안뇽하세요 ',NULL),(8,8,2,'어머 방이 너무 예쁘네요~',NULL),(9,8,9,'통탁오빠 방인가요 ??????? >< 옛날부터 팬이었어요 ~ ~  ~! ! ! ',NULL),(10,8,8,'아아아',NULL),(11,8,8,'ㅇㅇ',NULL),(12,8,8,'하이요!',NULL),(13,10,4,'안녕하세요 :)',NULL),(14,10,10,'방명록이 두가지군요!!',NULL);
/*!40000 ALTER TABLE `guestbook` ENABLE KEYS */;
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
