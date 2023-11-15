<?php

namespace App\Controller;

use App\Entity\PlaylistCategory;
use App\Form\PlaylistCategoryType;
use App\Repository\PlaylistCategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/playlist/category')]
class PlaylistCategoryController extends AbstractController
{
    #[Route('/', name: 'app_playlist_category_index', methods: ['GET'])]
    public function index(PlaylistCategoryRepository $playlistCategoryRepository): Response
    {
        $allPlaylistsCategories = $playlistCategoryRepository->findAll();
        return $this->json($allPlaylistsCategories, Response::HTTP_OK);
    }

    #[Route('/new', name: 'app_playlist_category_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
    
        if ($data === null) {
            return $this->json(['message' => 'Invalid JSON'], 400);
        }
    
        $playlistCategory = new PlaylistCategory();
        $playlistCategory->setTitle($data['title']);
        $playlistCategory->setColor($data['color']);
        $entityManager->persist($playlistCategory);
        $entityManager->flush();
    
        return $this->json($playlistCategory, 201);
    }

    #[Route('/{id}', name: 'app_playlist_category_show', methods: ['GET'])]
    public function show(PlaylistCategoryRepository $playlistCategoryRepository, int $id): Response
    {
        $playlistCategory = $playlistCategoryRepository->find($id);
        
        if (!$playlistCategory){
            return $this->json(['message'=> 'PlaylistCategory not found'],404);
        }

        return $this->json($playlistCategory, 200);
    }

    #[Route('/{id}/edit', name: 'app_playlist_category_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, PlaylistCategoryRepository  $playlistCategoryRepository, int $id, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $playlistCategory = $playlistCategoryRepository->find($id);
        if (!$playlistCategory){
            return $this->json(['message'=> 'PlaylistCategory not found'],404);
        }
        $playlistCategory->setTitle($data['title']);
        $playlistCategory->setColor($data['color']);
        $entityManager->flush();
        return $this->json($playlistCategory,200);
    
    }

    #[Route('/{id}', name: 'app_playlist_category_delete', methods: ['POST'])]
    public function delete(PlaylistCategoryRepository $playlistCategoryRepository, EntityManagerInterface $entityManager, int $id): Response
    {
        $playlistCategory = $playlistCategoryRepository->find($id);
        if (!$playlistCategory){
            return $this->json(['message'=> 'PlaylistCategory not found'],404);
        }
        
        $entityManager->remove($playlistCategory);
        $entityManager->flush();
        return $this->json(['message' => 'PlaylistCategory deleted']);
    }
}
