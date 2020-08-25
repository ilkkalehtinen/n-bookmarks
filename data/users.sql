SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bookmarks` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `bookmarks` (`bookmarks`),
  FULLTEXT KEY `bookmarks_2` (`bookmarks`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Initial data for table `users`
-- 
-- Admin password 'admin'.
--

INSERT INTO `users` (`id`, `username`, `password`, `bookmarks`, `admin`) VALUES
(1, 'admin', '$2y$10$XUwxd2N5301tDItULECL0uiU4FI7JuCsMVTvpMBPT8ImQftsoU2s6', '{"bookmarks":[]}', 1);
