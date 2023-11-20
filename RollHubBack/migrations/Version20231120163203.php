<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231120163203 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE playlist DROP FOREIGN KEY FK_D782112DF675F31B');
        $this->addSql('ALTER TABLE playlist_video DROP FOREIGN KEY FK_DFDBC36F29C1004E');
        $this->addSql('ALTER TABLE playlist_video DROP FOREIGN KEY FK_DFDBC36F6BBD148');
        $this->addSql('ALTER TABLE playlist_category_playlist DROP FOREIGN KEY FK_1205D557378B1BCD');
        $this->addSql('ALTER TABLE playlist_category_playlist DROP FOREIGN KEY FK_1205D5576BBD148');
        $this->addSql('DROP TABLE playlist');
        $this->addSql('DROP TABLE playlist_video');
        $this->addSql('DROP TABLE video');
        $this->addSql('DROP TABLE playlist_category');
        $this->addSql('DROP TABLE playlist_category_playlist');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE playlist (id INT AUTO_INCREMENT NOT NULL, author_id INT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_D782112DF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE playlist_video (playlist_id INT NOT NULL, video_id INT NOT NULL, INDEX IDX_DFDBC36F6BBD148 (playlist_id), INDEX IDX_DFDBC36F29C1004E (video_id), PRIMARY KEY(playlist_id, video_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE video (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, url LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, duration VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE playlist_category (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, color VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE playlist_category_playlist (playlist_category_id INT NOT NULL, playlist_id INT NOT NULL, INDEX IDX_1205D557378B1BCD (playlist_category_id), INDEX IDX_1205D5576BBD148 (playlist_id), PRIMARY KEY(playlist_category_id, playlist_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE playlist ADD CONSTRAINT FK_D782112DF675F31B FOREIGN KEY (author_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE playlist_video ADD CONSTRAINT FK_DFDBC36F29C1004E FOREIGN KEY (video_id) REFERENCES video (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE playlist_video ADD CONSTRAINT FK_DFDBC36F6BBD148 FOREIGN KEY (playlist_id) REFERENCES playlist (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE playlist_category_playlist ADD CONSTRAINT FK_1205D557378B1BCD FOREIGN KEY (playlist_category_id) REFERENCES playlist_category (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE playlist_category_playlist ADD CONSTRAINT FK_1205D5576BBD148 FOREIGN KEY (playlist_id) REFERENCES playlist (id) ON UPDATE NO ACTION ON DELETE CASCADE');
    }
}
