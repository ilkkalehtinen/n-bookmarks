SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `bookmarks` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `bookmarks` (`bookmarks`),
  FULLTEXT KEY `bookmarks_2` (`bookmarks`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Initial data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `bookmarks`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '{"bookmarks":[]}');
