-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 23 nov. 2023 à 16:09
-- Version du serveur : 8.0.32
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rollhub`
--

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20231027083433', '2023-10-27 08:34:48', 265),
('DoctrineMigrations\\Version20231120163203', '2023-11-20 16:32:10', 143),
('DoctrineMigrations\\Version20231122193302', '2023-11-22 19:33:07', 60),
('DoctrineMigrations\\Version20231122194245', '2023-11-22 19:42:52', 87);

-- --------------------------------------------------------

--
-- Structure de la table `info`
--

CREATE TABLE `info` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `info_category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `info`
--

INSERT INTO `info` (`id`, `title`, `content`, `info_category_id`) VALUES
(4, 'Création du roller', 'L\'invention date de 1863 !', 1),
(6, 'Parfois la taille ça compte !', 'Plus vos roues seront grande plus les obstacles seront facile à franchir, par contre vous y perdrez en contrôle ! à vous de trouver votre équilibre.', 11),
(7, 'Les chutes c\'est meilleur pour les blagues qu\'à roller', 'Les chutes à roller ça fait mal (même sans roller d\'ailleurs)', 3);

-- --------------------------------------------------------

--
-- Structure de la table `info_category`
--

CREATE TABLE `info_category` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `info_category`
--

INSERT INTO `info_category` (`id`, `title`, `color`) VALUES
(1, 'Histoire', '#c70202'),
(2, 'Insolite', '#d859ff'),
(3, 'Actualités', '#4fa7ff'),
(6, 'Tech', '#2d32d2'),
(7, 'Media', '#707070'),
(11, 'Astuces', '#2bb319');

-- --------------------------------------------------------

--
-- Structure de la table `map`
--

CREATE TABLE `map` (
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `spot`
--

CREATE TABLE `spot` (
  `id` int NOT NULL,
  `author_id` int NOT NULL,
  `map_id` int DEFAULT NULL,
  `latitude` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `longitude` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `spot`
--

INSERT INTO `spot` (`id`, `author_id`, `map_id`, `latitude`, `longitude`, `name`) VALUES
(5, 2, NULL, '45.77985553532', '4.8545783758163', 'spot magique'),
(9, 2, NULL, '45.746526030683', '4.8537200689316', 'Initiation Roller'),
(11, 2, NULL, '45.782709933468', '4.870730638504', 'La doua'),
(13, 2, NULL, '45.771218474674', '4.8310712604988', 'Grosse descentes de croix rousse');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pseudo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `first_name`, `last_name`, `pseudo`) VALUES
(1, 'test@test.com', '[\"ROLE_USER\"]', '$2y$13$PH/Abu0R9YqNaqXdwDNxKOSOZ.70JlaG4XPS83rBP0vaYu./oKHyS', 'Michel', 'Dorado De La Mancha', 'test'),
(2, 'admin@rollhub.fr', '[\"ROLE_ADMIN\", \"ROLE_USER\"]', '$2y$13$s2/nXQouA7JRzoK2vsg8AursSx2k6jrYYLSCwyy9YB5MaN7EgTTPi', 'RollHub', NULL, 'rollhub'),
(3, 'nouveau@nouveau.com', '[\"ROLE_ADMIN\", \"ROLE_USER\"]', '$2y$13$xWDwA2cGz.ZIbOfOYP67keVzrFGJBcUn2NIAooI.ffu0eec74W7F.', 'Jean', 'Bono', 'nouveau'),
(6, 'user.test@test.com', '[]', '$2y$13$PEpIxfKdvQa49axTYQ.Is.vXtGHwvFnXqt9TBiWgA25MVHYkNbdxG', NULL, NULL, 'UserTest');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_CB893157CD7EB71D` (`info_category_id`);

--
-- Index pour la table `info_category`
--
ALTER TABLE `info_category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `spot`
--
ALTER TABLE `spot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_B9327A73F675F31B` (`author_id`),
  ADD KEY `IDX_B9327A7353C55F64` (`map_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `info`
--
ALTER TABLE `info`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `info_category`
--
ALTER TABLE `info_category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `map`
--
ALTER TABLE `map`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `spot`
--
ALTER TABLE `spot`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `info`
--
ALTER TABLE `info`
  ADD CONSTRAINT `FK_CB893157CD7EB71D` FOREIGN KEY (`info_category_id`) REFERENCES `info_category` (`id`);

--
-- Contraintes pour la table `spot`
--
ALTER TABLE `spot`
  ADD CONSTRAINT `FK_B9327A7353C55F64` FOREIGN KEY (`map_id`) REFERENCES `map` (`id`),
  ADD CONSTRAINT `FK_B9327A73F675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
