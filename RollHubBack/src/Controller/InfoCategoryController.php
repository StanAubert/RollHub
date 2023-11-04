<?php

namespace App\Controller;

use App\Entity\InfoCategory;
use App\Repository\InfoCategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/info/category')]
class InfoCategoryController extends AbstractController
{
    #[Route('/', name: 'app_info_category_index', methods: ['GET'])]
    public function index(InfoCategoryRepository $infoCategoryRepository): Response
    {
        $allInfoCategories = $infoCategoryRepository->findAll();
        return $this->json($allInfoCategories,Response::HTTP_OK);
    }

    #[Route('/new', name: 'app_info_category_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
    
        if ($data === null) {
            return $this->json(['message' => 'Invalid JSON'], 400);
        }
    
        $infoCategory = new InfoCategory();
        $infoCategory->setTitle($data['title']);
        $infoCategory->setColor($data['color']);
        $entityManager->persist($infoCategory);
        $entityManager->flush();
    
        return $this->json($infoCategory, 201);
    }

    #[Route('/{id}', name: 'app_info_category_show', methods: ['GET'])]
    public function show(InfoCategoryRepository $infoCategoryRepository, int $id): Response
    {
        $infoCategory = $infoCategoryRepository->find($id);
        
        if (!$infoCategory) {
            return $this->json(['message' => 'InfoCategory not found'], 404);
        }

        return $this->json($infoCategory);
    }

    #[Route('/{id}/edit', name: 'app_info_category_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, InfoCategory $infoCategory, int $id ,InfoCategoryRepository $infoCategoryRepository ,EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $infoCategory = $infoCategoryRepository->find($id);

        if (!$infoCategory) {
            return $this->json(['message' => 'InfoCategory not found'], 404);
        }

        $infoCategory->setTitle($data['title'] ?? $infoCategory->getTitle());
        $infoCategory->setColor($data['color'] ?? $infoCategory->getColor());

        $entityManager->flush();

        return $this->json($infoCategory);
    }

    #[Route('/{id}', name: 'app_info_category_delete', methods: ['POST'])]
    public function delete(Request $request, InfoCategory $infoCategory, InfoCategoryRepository $infoCategoryRepository, int $id, EntityManagerInterface $entityManager): Response
    {
        $infoCategory = $infoCategoryRepository->find($id);

        if (!$infoCategory) {
            return $this->json(['message' => 'InfoCategory not found'], 404);
        }

        $entityManager->remove($infoCategory);
        $entityManager->flush();

        return $this->json(['message' => 'InfoCategory deleted']);
    }
    
}
