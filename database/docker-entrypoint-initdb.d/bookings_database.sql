-- MySQL dump 10.13  Distrib 8.0.11, for Linux (x86_64)
--
-- Host: localhost    Database: bookings
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
  CONSTRAINT `FK_CUSTOMERID` FOREIGN KEY (`customerid`) REFERENCES `customers` (`customerid`),
  CONSTRAINT `FK_RESTAURANTID` FOREIGN KEY (`restaurantid`) REFERENCES `restaurants` (`restaurantid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1,2,'2014-12-18','14:00:00',10),(2,1,1,'2014-12-18','14:00:00',10),(3,1,2,'2014-12-18','14:00:00',10),(4,1,2,'2014-12-18','15:00:00',10);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
INSERT INTO `customers` VALUES (1,'anonymous@example.com','changeme'),(2,'rob.hurley@mycit.ie','changeme');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
INSERT INTO `owners` VALUES (1,'admin@example.com','changeme'),(2,'admin@mycit.ie','changeme');
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
  CONSTRAINT `FK_OWNERID` FOREIGN KEY (`ownerid`) REFERENCES `owners` (`ownerid`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'McDs','Main Street','112',150,'a.jpg',1),(2,'Arches','Side Street','112',100,'b.jpg',1),(3,'asd','asd','123123',244,'1.jpg',1),(4,'The Lobster Pot','Henry Street','300001',20,'pots.jpg',2),(5,'The Lobster Pots','Henry Street','300001',25,'pots.jpg',2),(6,'Siam','OcOnnell Street','300002',100,'siam.jpg',2),(7,'The George','OcOnnell Street','300003',500,'george.jpg',2);
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_bookings`
--

DROP TABLE IF EXISTS `view_bookings`;
/*!50001 DROP VIEW IF EXISTS `view_bookings`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `view_bookings` AS SELECT 
 1 AS `restaurantid`,
 1 AS `bookingdate`,
 1 AS `bookinghour`,
 1 AS `bookings`,
 1 AS `capacity`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_bookings`
--

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

-- Dump completed on 2018-05-07 21:37:54
