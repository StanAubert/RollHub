<?php

namespace App\Entity;

use App\Repository\PlaylistRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlaylistRepository::class)]
class Playlist
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $Name = null;

    #[ORM\ManyToOne(inversedBy: 'playlists')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $author = null;

    #[ORM\ManyToMany(targetEntity: Video::class, inversedBy: 'playlists')]
    private Collection $videos;

    #[ORM\ManyToMany(targetEntity: PlaylistCategory::class, mappedBy: 'playlists')]
    private Collection $playlistCategories;

    public function __construct()
    {
        $this->videos = new ArrayCollection();
        $this->playlistCategories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->Name;
    }

    public function setName(string $Name): static
    {
        $this->Name = $Name;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): static
    {
        $this->author = $author;

        return $this;
    }

    /**
     * @return Collection<int, Video>
     */
    public function getVideos(): Collection
    {
        return $this->videos;
    }

    public function addVideo(Video $video): static
    {
        if (!$this->videos->contains($video)) {
            $this->videos->add($video);
        }

        return $this;
    }

    public function removeVideo(Video $video): static
    {
        $this->videos->removeElement($video);

        return $this;
    }

    /**
     * @return Collection<int, PlaylistCategory>
     */
    public function getPlaylistCategories(): Collection
    {
        return $this->playlistCategories;
    }

    public function addPlaylistCategory(PlaylistCategory $playlistCategory): static
    {
        if (!$this->playlistCategories->contains($playlistCategory)) {
            $this->playlistCategories->add($playlistCategory);
            $playlistCategory->addPlaylist($this);
        }

        return $this;
    }

    public function removePlaylistCategory(PlaylistCategory $playlistCategory): static
    {
        if ($this->playlistCategories->removeElement($playlistCategory)) {
            $playlistCategory->removePlaylist($this);
        }

        return $this;
    }
}
