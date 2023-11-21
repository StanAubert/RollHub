<?php

namespace App\Controller;

use App\Entity\InfoCategory;
use App\Repository\InfoCategoryRepository;
use App\Serializer\InfoCategorySerializer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/info/category')]
class InfoCategoryController extends AbstractController
{

    public function __construct(private readonly EntityManagerInterface $entityManager, private InfoCategoryRepository $infoCategoryRepository )
    {

    }


    private function makeJsonResponse($infoCategory, int $statusCode): Response
    {
        $response = new Response();
        $jsonContent = is_array($infoCategory) ? InfoCategorySerializer::SerializeAllInfoCategories($infoCategory) : InfoCategorySerializer::SerializeOneInfoCategory($infoCategory);
        $response->setContent(json_encode($jsonContent, JSON_THROW_ON_ERROR));
        $response->headers->set("Content-Type", "application/json");
        $response->setStatusCode($statusCode);
        return $response;
    }

    private function persistInfoCategory(InfoCategory $infoCategory)
    {
        $this->entityManager->persist($infoCategory);
        $this->entityManager->flush();
    }
    #[Route('/', name: 'app_info_category_index', methods: ['GET'])]
    public function index(InfoCategoryRepository $infoCategoryRepository): Response
    {
        $allInfoCategories = $infoCategoryRepository->findAll();
        return $this->makeJsonResponse($allInfoCategories,Response::HTTP_OK);
    }

    #[Route('/new', name: 'app_info_category_new', methods: ['POST'])]
    public function new(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
    
        if ($data === null) {
            return $this->json(['message' => 'Invalid JSON'], 400);
        }
        $infoCategory = new InfoCategory();
        $validKeys = ['title', 'color'];

        foreach ($data as $key => $value){
            if($key == 'title'){
                $infoCategoryExists = $this->infoCategoryRepository->findOneBy(['title' == $value]);
                if($infoCategoryExists){
                    return new Response("Category already exists", Response::HTTP_BAD_REQUEST);
                }
                $infoCategory->setTitle($value);
            }
            if($key == 'color'){
                $infoCategoryExists = $this->infoCategoryRepository->findOneBy(['color' == $value]);
                if($infoCategoryExists){
                    return new Response("Category already exists", Response::HTTP_BAD_REQUEST);
                }
                $infoCategory->setColor($value);
            }

            if (!in_array($key, $validKeys)) {
                return new Response("Invalid data", Response::HTTP_BAD_REQUEST);
            }
        }

        $this->persistInfoCategory($infoCategory);
    
        return $this->makeJsonResponse($infoCategory, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_info_category_show', methods: ['GET'])]
    public function show(InfoCategoryRepository $infoCategoryRepository, int $id): Response
    {
        $infoCategory = $infoCategoryRepository->find($id);
        
        if (!$infoCategory) {
            return $this->json(['message' => 'InfoCategory not found'], 404);
        }

        return $this->makeJsonResponse($infoCategory, Response::HTTP_OK);
    }

    #[Route('/{id}/edit', name: 'app_info_category_edit', methods: ['PUT', 'PATCH'])]
    public function edit(Request $request, InfoCategory $infoCategory, int $id ,InfoCategoryRepository $infoCategoryRepository ,EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $infoCategory = $infoCategoryRepository->find($id);
        $validKeys = ['title', 'color'];

        foreach ($data as $key => $value){
            if($key == 'title'){
                $infoCategoryExists = $this->infoCategoryRepository->findOneBy(['title' == $value]);
                if($infoCategoryExists){
                    return new Response("Category already exists", Response::HTTP_BAD_REQUEST);
                }
                $infoCategory->setTitle($value);
            }
            if($key == 'color'){
                $infoCategoryExists = $this->infoCategoryRepository->findOneBy(['color' == $value]);
                if($infoCategoryExists){
                    return new Response("Category already exists", Response::HTTP_BAD_REQUEST);
                }
                $infoCategory->setColor($value);
            }

            if (!in_array($key, $validKeys)) {
                return new Response("Invalid data", Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->makeJsonResponse($infoCategory, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_info_category_delete', methods: ['DELETE'])]
    public function delete(InfoCategory $infoCategory, InfoCategoryRepository $infoCategoryRepository, int $id, EntityManagerInterface $entityManager): Response
    {
        $infoCategory = $infoCategoryRepository->find($id);

        if (!$infoCategory) {
            return $this->json(['message' => 'InfoCategory not found'], 404);
        }

        $entityManager->remove($infoCategory);
        $entityManager->flush();

        return $this->json(['message' => 'InfoCategory deleted'], Response::HTTP_OK);
    }
    
}
