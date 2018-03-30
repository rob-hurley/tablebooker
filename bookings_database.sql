-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for CYGWIN (x86_64)
--
-- Host: snntest01.shannon.digitalriver.com    Database: bookings
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `bookings`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `bookings` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `bookings`;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `bookingid` int(64) NOT NULL AUTO_INCREMENT,
  `restaurantid` int(16) NOT NULL,
  `customerid` int(32) NOT NULL,
  `bookingdate` date NOT NULL,
  `bookinghour` time NOT NULL,
  `bookingsize` int(11) NOT NULL,
  PRIMARY KEY (`bookingid`),
  UNIQUE KEY `bookingid_UNIQUE` (`bookingid`),
  KEY `FK_CUSTOMERID_idx` (`customerid`),
  KEY `FK_RESTAURANTID_idx` (`restaurantid`),
  CONSTRAINT `FK_CUSTOMERID` FOREIGN KEY (`customerid`) REFERENCES `customers` (`customerid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_RESTAURANTID` FOREIGN KEY (`restaurantid`) REFERENCES `restaurants` (`restaurantid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1,14,'2014-12-18','14:00:00',10),(2,1,13,'2014-12-18','14:00:00',10),(3,1,12,'2014-12-18','14:00:00',10),(4,1,12,'2014-12-18','15:00:00',10),(5,2,9,'2014-12-18','14:00:00',50),(6,2,9,'2014-12-18','14:00:00',50);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `customerid` int(32) NOT NULL AUTO_INCREMENT,
  `customeremail` varchar(60) NOT NULL,
  `customerpassword` varchar(200) NOT NULL,
  PRIMARY KEY (`customerid`),
  UNIQUE KEY `customerid_UNIQUE` (`customerid`),
  UNIQUE KEY `customeremail_UNIQUE` (`customeremail`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'rob@thehurleys.net','changeme'),(2,'rob@thehurleys.netz','changeme'),(4,'rob@thehurleys.netzer','changeme'),(5,'delli@ali.com','secrethandshake'),(6,'delli@alli.com','secrethandshake'),(7,'delli@allli.com','secrethandshake'),(8,'delli@alllli.com','secrethandshake'),(9,'rob@thehurleys.netzerz','changeme'),(10,'rob@thehurleys.1','changeme'),(11,'rob@thehurleys.2','changeme'),(12,'rob@thehurleys.3','changeme'),(13,'rob@thehurleys.4','changeme'),(14,'rob@thehurleys.5','changeme'),(15,'rob@thehurleys.6','changeme');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `owners` (
  `ownerid` int(16) NOT NULL AUTO_INCREMENT,
  `owneremail` varchar(60) NOT NULL,
  `ownerpassword` varchar(200) NOT NULL,
  PRIMARY KEY (`ownerid`),
  UNIQUE KEY `ownerid_UNIQUE` (`ownerid`),
  UNIQUE KEY `owneremail_UNIQUE` (`owneremail`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,'tod@grimshaw.net','corrie'),(2,'bob@thehurleys.net','changemetoo'),(3,'raymears@thetree.org','chamgemetoo'),(4,'thetribe@thetree.org','chamgemetoo'),(5,'theothertribe@thetree.org','chamgemetoo'),(6,'a@b.com','chamgemetoo'),(7,'a@c.com','chamgemetoo'),(8,'a@d.com','chamgemetoo'),(9,'a@e.com','chamgemetoo'),(10,'a@esds.com','chamgemetoo'),(26,'me@zingg.com','chamgemetoo'),(31,'me@zingg.comm','chamgemetoo'),(33,'rob@thehurleys.netttttt','changeme'),(35,'rob@thehurleys.netz','changeme');
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurants` (
  `restaurantid` int(16) NOT NULL AUTO_INCREMENT,
  `restaurantname` varchar(60) NOT NULL,
  `restaurantaddress` varchar(200) NOT NULL,
  `restaurantphone` varchar(45) NOT NULL,
  `restaurantcapacity` int(11) NOT NULL,
  `restaurantimage` varchar(45) DEFAULT NULL,
  `ownerid` int(16) NOT NULL,
  PRIMARY KEY (`restaurantid`),
  UNIQUE KEY `restaurantid_UNIQUE` (`restaurantid`),
  UNIQUE KEY `restaurantname_UNIQUE` (`restaurantname`),
  KEY `FK_OWNERID_idx` (`ownerid`),
  CONSTRAINT `FK_OWNERID` FOREIGN KEY (`ownerid`) REFERENCES `owners` (`ownerid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'McDs','Main Street','112',150,'a.jpg',1),(2,'Arches','Side Street','112',100,'b.jpg',1),(3,'asd','asd','123123',244,'1.jpg',1),(4,'The Lobster Pot','Henry Street','300001',20,'pots.jpg',1),(5,'The Lobster Pots','Henry Street','300001',25,'pots.jpg',1),(6,'Siam','OcOnnell Street','300002',100,'siam.jpg',1),(7,'The George','OcOnnell Street','300003',500,'george.jpg',1),(8,'Cafe Cotto','Thomas Street','302006',25,'cotto.jpg',1),(9,'The Bedford Row','Bedford Row','320000',39,'bedford.jpg',1),(10,'The Fox','Patrick Street','320008',45,'fox.jpg',1),(28,'Burger King','OConnell Street','320012',123,'bk.jpg',1);
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `view_bookings`
--

DROP TABLE IF EXISTS `view_bookings`;
/*!50001 DROP VIEW IF EXISTS `view_bookings`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `view_bookings` (
  `restaurantid` tinyint NOT NULL,
  `bookingdate` tinyint NOT NULL,
  `bookinghour` tinyint NOT NULL,
  `bookings` tinyint NOT NULL,
  `capacity` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `bookings`
--

USE `bookings`;

--
-- Final view structure for view `view_bookings`
--

/*!50001 DROP TABLE IF EXISTS `view_bookings`*/;
/*!50001 DROP VIEW IF EXISTS `view_bookings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_bookings` AS select `b`.`restaurantid` AS `restaurantid`,`b`.`bookingdate` AS `bookingdate`,`b`.`bookinghour` AS `bookinghour`,sum(`b`.`bookingsize`) AS `bookings`,`r`.`restaurantcapacity` AS `capacity` from (`restaurants` `r` join `bookings` `b` on((`r`.`restaurantid` = `b`.`restaurantid`))) group by `r`.`restaurantid`,`b`.`bookingdate`,`b`.`bookinghour` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-30 14:31:50
