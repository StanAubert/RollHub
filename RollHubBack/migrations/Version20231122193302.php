<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231122193302 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE info_category_info DROP FOREIGN KEY FK_88DA08C5D8BC1F8');
        $this->addSql('ALTER TABLE info_category_info DROP FOREIGN KEY FK_88DA08CCD7EB71D');
        $this->addSql('DROP TABLE info_category_info');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE info_category_info (info_category_id INT NOT NULL, info_id INT NOT NULL, INDEX IDX_88DA08CCD7EB71D (info_category_id), INDEX IDX_88DA08C5D8BC1F8 (info_id), PRIMARY KEY(info_category_id, info_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE info_category_info ADD CONSTRAINT FK_88DA08C5D8BC1F8 FOREIGN KEY (info_id) REFERENCES info (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE info_category_info ADD CONSTRAINT FK_88DA08CCD7EB71D FOREIGN KEY (info_category_id) REFERENCES info_category (id) ON UPDATE NO ACTION ON DELETE CASCADE');
    }
}
