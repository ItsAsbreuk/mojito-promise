/*
 Navicat MySQL Data Transfer

 Source Database       : example_db
 File Encoding         : utf-8

 Date: 04/25/2014 00:19:41 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `attendees`
-- ----------------------------
DROP TABLE IF EXISTS `attendees`;
CREATE TABLE `attendees` (
	`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`personid` int(11) DEFAULT NULL,
	`weeknr` int(11) DEFAULT NULL,
	PRIMARY KEY (`id`),
	INDEX `weeknr` (`weeknr`) comment ''
) ENGINE=`InnoDB` AUTO_INCREMENT=4 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ROW_FORMAT=COMPACT COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Records of `attendees`
-- ----------------------------
BEGIN;
INSERT INTO `attendees` VALUES ('1', '1', '17'), ('2', '2', '17'), ('3', '3', '17');
COMMIT;

-- ----------------------------
--  Table structure for `hangouts`
-- ----------------------------
DROP TABLE IF EXISTS `hangouts`;
CREATE TABLE `hangouts` (
	`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`title` varchar(255) DEFAULT NULL,
	`weeknr` int(11) DEFAULT NULL,
	PRIMARY KEY (`id`),
	INDEX `weeknr` (`weeknr`) comment ''
) ENGINE=`InnoDB` AUTO_INCREMENT=2 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ROW_FORMAT=COMPACT COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Records of `hangouts`
-- ----------------------------
BEGIN;
INSERT INTO `hangouts` VALUES ('1', '\"Using Promises in Mojito\"', '17');
COMMIT;

-- ----------------------------
--  Table structure for `newsitems`
-- ----------------------------
DROP TABLE IF EXISTS `newsitems`;
CREATE TABLE `newsitems` (
	`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`title` varchar(255) DEFAULT NULL,
	`news` text DEFAULT NULL,
	`route` varchar(255) DEFAULT NULL,
	`date` date DEFAULT NULL,
	PRIMARY KEY (`id`),
	INDEX `route` (`route`) comment '',
	INDEX `route_2` (`route`, `date`) comment ''
) ENGINE=`InnoDB` AUTO_INCREMENT=3 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ROW_FORMAT=COMPACT COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Records of `newsitems`
-- ----------------------------
BEGIN;
INSERT INTO `newsitems` VALUES ('1', 'Lyrid Meteor Shower Peaks Tonight', 'The Lyrid meteor shower peaks tonight (April 21) and if Mother Nature spoils your \"shooting stars\" display with bad weather, you can watch the celestial light show live online with two webcasts.', '/page2.html', '2014-04-21'), ('2', 'How did teen stowaway survive 5-1/2 hour flight to Hawaii in wheel well?', 'Aviation experts are stunned by the story of a teenager who climbed into the wheel well of a Hawaiian Airlines flight in San Jose, Calif., and woke up hours later in Maui, unharmed.', '/page2.html', '2014-04-20');
COMMIT;

-- ----------------------------
--  Table structure for `pages`
-- ----------------------------
DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
	`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`pagecontent` text DEFAULT NULL,
	`route` varchar(255) DEFAULT NULL,
	PRIMARY KEY (`id`),
	INDEX `route` (`route`) comment ''
) ENGINE=`InnoDB` AUTO_INCREMENT=4 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ROW_FORMAT=COMPACT COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Records of `pages`
-- ----------------------------
BEGIN;
INSERT INTO `pages` VALUES ('1', 'Example of how to use Promises in Mojito', '/'), ('2', '<h1>News of the world</h1>This samplepage retrieves some newsitems from <a href=\"http://news.yahoo.com\">http://news.yahoo.com</a>', '/page2.html'), ('3', '<h1>Hangout</h1>', '/page3.html');
COMMIT;

-- ----------------------------
--  Table structure for `persons`
-- ----------------------------
DROP TABLE IF EXISTS `persons`;
CREATE TABLE `persons` (
	`id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`firstname` varchar(255) DEFAULT NULL,
	`lastname` varchar(255) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=4 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ROW_FORMAT=COMPACT COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Records of `persons`
-- ----------------------------
BEGIN;
INSERT INTO `persons` VALUES ('1', 'Clarence', 'Leung'), ('2', 'Andrew', 'Wooldridge'), ('3', 'Marco', 'Asbreuk');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
