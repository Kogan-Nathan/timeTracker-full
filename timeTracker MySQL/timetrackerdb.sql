-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: timetrackerdb
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `admintable`
--

DROP TABLE IF EXISTS `admintable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admintable` (
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admintable`
--

LOCK TABLES `admintable` WRITE;
/*!40000 ALTER TABLE `admintable` DISABLE KEYS */;
INSERT INTO `admintable` VALUES ('admin','time123123','timeAdmin@zangula.com');
/*!40000 ALTER TABLE `admintable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `projectName` varchar(45) NOT NULL,
  `projectClient` varchar(45) NOT NULL,
  `projectStatus` time DEFAULT NULL,
  `projectManager` varchar(45) NOT NULL,
  `projectDate` date NOT NULL,
  `projectCost` tinyint NOT NULL,
  `projectID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`projectID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('Matah','Matah Ba\'am','79:12:00','Matah manager','2020-08-11',0,1),('Bamba','Bamba Ba\'am','79:30:00','Bamba manager','2020-08-11',0,2),('Clockify','Clockify Ba\'am','32:33:00','Clockify manager','2020-08-11',0,3),('BlueHawk','BlueHawk Ba\'am','25:52:00','BlueHawk manager','2020-08-11',0,4),('gsfs','fsfs','00:00:00','fsfs','2020-08-26',0,9),('שגשגש','גשגשג','00:00:00','שגשגש','2020-08-26',0,11);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(45) NOT NULL,
  `UserId` int NOT NULL,
  `ProjectName` varchar(45) NOT NULL,
  `ProjectId` int NOT NULL,
  `Status` time NOT NULL,
  `Date` date NOT NULL,
  `From` time NOT NULL,
  `To` time NOT NULL,
  `Description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,'Nicky',1,'Matah',1,'08:00:00','2020-07-14','09:30:00','17:30:00',NULL),(2,'Nicky',1,'Matah',1,'06:00:00','2020-07-22','10:30:00','16:30:00',NULL),(3,'Nicky',1,'Bamba',2,'09:15:00','2020-08-01','09:15:00','18:30:00',NULL),(4,'Nicky',1,'Bamba',2,'09:15:00','2020-08-07','09:15:00','18:30:00',NULL),(5,'Nicky',1,'Bamba',2,'09:00:00','2020-08-11','09:30:00','18:15:00',NULL),(6,'Nathan',2,'BlueHawk',4,'10:00:00','2020-07-28','08:32:00','18:32:00',NULL),(7,'Nathan',2,'BlueHawk',4,'09:50:00','2020-08-01','09:32:00','19:22:00',NULL),(8,'Nathan',2,'Clockify',3,'08:45:00','2020-08-06','08:30:00','17:15:00',NULL),(9,'Nathan',2,'Clockify',3,'10:45:00','2020-08-11','12:30:00','23:15:00',NULL),(10,'Yoni',4,'BlueHawk',4,'06:02:00','2020-08-11','12:14:00','18:17:00','check'),(11,'Yoni',4,'Matah',1,'04:01:00','2020-08-01','14:16:00','18:17:00','check'),(12,'Nicky',1,'Matah',1,'03:02:00','2020-08-11','12:02:00','15:04:00',NULL),(13,'Nicky',1,'Matah',1,'21:02:00','2020-08-11','14:07:00','11:09:00',NULL),(14,'Nicky',1,'Bamba',2,'06:00:00','2020-08-05','06:17:00','12:17:00',NULL),(15,'Nicky',1,'Bamba',2,'06:00:00','2020-07-05','06:17:00','12:17:00',NULL),(16,'Nicky',1,'Matah',1,'07:00:00','2020-08-17','08:29:00','15:29:00',NULL),(17,'Nicky',1,'Clockify',3,'06:00:00','2020-08-18','11:18:00','17:18:00','my first note'),(18,'Nicky',1,'Bamba',2,'08:00:00','2020-08-17','11:34:00','19:34:00',NULL),(19,'Nicky',1,'Bamba',2,'08:00:00','2020-08-17','11:34:00','19:34:00',NULL),(20,'Nicky',1,'Bamba',2,'08:00:00','2020-08-17','11:34:00','19:34:00',NULL),(21,'Nicky',1,'Bamba',2,'08:00:00','2020-08-17','11:34:00','19:34:00',NULL),(22,'Nicky',1,'Bamba',2,'08:00:00','2020-08-17','11:34:00','19:34:00',NULL),(23,'Nicky',1,'Matah',1,'08:00:00','2020-08-17','11:34:00','19:34:00',NULL),(24,'Nicky',1,'Matah',1,'08:00:00','2020-08-18','11:34:00','19:34:00',NULL),(25,'Nicky',1,'Clockify',3,'01:59:00','2020-08-16','16:36:00','18:35:00',NULL),(26,'Nicky',1,'Clockify',3,'05:04:00','2020-08-18','16:39:00','21:43:00','desciptiom 11'),(27,'Nicky',1,'Matah',1,'06:06:00','2020-08-24','09:18:00','15:24:00',NULL),(28,'Nathan',2,'Matah',1,'08:01:00','2020-08-24','08:39:00','16:40:00',NULL);
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `status` time NOT NULL DEFAULT '00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nicky','$2b$10$m0uolmQgcOLyfF5XXmTwOOPKKUT7Crfux5exxnL4SRVonth7Oi3vW','nickymirz@gmail.com','0505997071','159:43:00'),(2,'Nathan','$2b$10$X4agUSVm.1/ifpHgXdzcUuqLJ79N6fwYyrUGsEqDgQFg/qQQm3eeu','kogannathan@gmail.com','0507544709','47:21:00'),(7,'Michael','$2b$10$oFQM3a3.H.Qqo4.iXzb9QeVc0qtGRxPS3wSbEuW4pg9J.duAFC9Vm','michael@gmail.cm','0500000000','00:00:00'),(8,'edan','$2b$10$wn4hTY1eKlXjrFPJj3pp3.mnOu035O6qNHrhP6dMuu0HViVnJB5Ye','edan@gmail.com','0500000000','00:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31  9:54:27
