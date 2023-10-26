<?php

namespace App\Entity;

use App\Repository\InfoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InfoRepository::class)]
class Info
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $content = null;

    #[ORM\ManyToMany(targetEntity: InfoCategory::class, mappedBy: 'infos')]
    private Collection $infoCategories;

    public function __construct()
    {
        $this->infoCategories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    /**
     * @return Collection<int, InfoCategory>
     */
    public function getInfoCategories(): Collection
    {
        return $this->infoCategories;
    }

    public function addInfoCategory(InfoCategory $infoCategory): static
    {
        if (!$this->infoCategories->contains($infoCategory)) {
            $this->infoCategories->add($infoCategory);
            $infoCategory->addInfo($this);
        }

        return $this;
    }

    public function removeInfoCategory(InfoCategory $infoCategory): static
    {
        if ($this->infoCategories->removeElement($infoCategory)) {
            $infoCategory->removeInfo($this);
        }

        return $this;
    }
}
