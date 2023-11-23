<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231122194245 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE info ADD info_category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE info ADD CONSTRAINT FK_CB893157CD7EB71D FOREIGN KEY (info_category_id) REFERENCES info_category (id)');
        $this->addSql('CREATE INDEX IDX_CB893157CD7EB71D ON info (info_category_id)');
        $this->addSql('ALTER TABLE info_category DROP FOREIGN KEY FK_117962AB544A4CCA');
        $this->addSql('DROP INDEX IDX_117962AB544A4CCA ON info_category');
        $this->addSql('ALTER TABLE info_category DROP infos_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE info DROP FOREIGN KEY FK_CB893157CD7EB71D');
        $this->addSql('DROP INDEX IDX_CB893157CD7EB71D ON info');
        $this->addSql('ALTER TABLE info DROP info_category_id');
        $this->addSql('ALTER TABLE info_category ADD infos_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE info_category ADD CONSTRAINT FK_117962AB544A4CCA FOREIGN KEY (infos_id) REFERENCES info (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_117962AB544A4CCA ON info_category (infos_id)');
    }
}
