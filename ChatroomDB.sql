-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 21, 2019 at 09:51 PM
-- Server version: 5.5.54-0+deb8u1
-- PHP Version: 7.1.1-1+0~20170120094658.14+jessie~1.gbp69d416

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `Chatroom`
--

-- --------------------------------------------------------

--
-- Table structure for table `Logs`
--

CREATE TABLE IF NOT EXISTS `Logs` (
  `serverID` int(11) NOT NULL,
  `messages` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Logs`
--

INSERT INTO `Logs` (`serverID`, `messages`) VALUES
(29, '(21:37:51) Bob Lewis: Bienvenue dans mon serveurs les amis.'),
(29, '(21:38:02) Bob Lewis: Aujourd''hui nous allons apprendre le JavaScript!'),
(12, '(9:38:57 PM) LittleMac: Est-ce qu''il y a des frères d''anus dans la salle?'),
(3, '(21:44:55) RandomUser: Bonjour, je suis un RandomUser et je me suis fait ajouter au serveur ''''Général'''' par défaut. '),
(3, '(9:45:11 PM) LittleMac: Bonjour RandomUser!'),
(12, '(21:46:15) UnoBoy: Coucou!');

-- --------------------------------------------------------

--
-- Table structure for table `Server`
--

CREATE TABLE IF NOT EXISTS `Server` (
`id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL DEFAULT 'Anonymous',
  `minAge` int(11) NOT NULL DEFAULT '18',
  `password` varchar(64) DEFAULT NULL,
  `maxUsers` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Server`
--

INSERT INTO `Server` (`id`, `name`, `minAge`, `password`, `maxUsers`) VALUES
(3, 'Général', 18, '', 0),
(12, 'Les frères d''anus', 30, '4654d793972c3b6a1d48fb0ab58d9cb0de46c3d33d605f9222c283dfaa12d420', 30),
(29, 'Serveur de Bob Lewis', 0, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 0);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
`id` int(11) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `sex` enum('male','female') DEFAULT NULL,
  `color` varchar(6) DEFAULT NULL,
  `age` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `username`, `sex`, `color`, `age`) VALUES
(74, 'LittleMac', 'male', 'C82333', 28),
(76, 'Bob Lewis', 'male', '0069D9', 32),
(77, 'RandomUser', 'female', '138496', 33),
(78, 'UnoBoy', 'male', 'E0A800', 99);

-- --------------------------------------------------------

--
-- Table structure for table `UserServer`
--

CREATE TABLE IF NOT EXISTS `UserServer` (
  `userID` int(11) NOT NULL,
  `serverID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `UserServer`
--

INSERT INTO `UserServer` (`userID`, `serverID`) VALUES
(76, 29),
(78, 12),
(77, 3),
(74, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Server`
--
ALTER TABLE `Server`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Server`
--
ALTER TABLE `Server`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=79;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
