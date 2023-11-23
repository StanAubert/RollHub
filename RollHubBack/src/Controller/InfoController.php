<?php

namespace App\Controller;
use App\Entity\Info;
use App\Repository\InfoCategoryRepository;
use App\Repository\InfoRepository;
use App\Serializer\InfoSerializer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/info')]
class InfoController extends AbstractController
{

    public function __construct(private readonly EntityManagerInterface $entityManager,private InfoRepository $infoRepository, private InfoCategoryRepository $infoCategoryRepository )
    {

    }


    private function makeJsonResponse($info, int $statusCode): Response
    {
        $response = new Response();
        $jsonContent = is_array($info) ? InfoSerializer::serializeAllInfos($info) : InfoSerializer::serializeOneInfo($info);
        $response->setContent(json_encode($jsonContent, JSON_THROW_ON_ERROR));
        $response->headers->set("Content-Type", "application/json");
        $response->setStatusCode($statusCode);
        return $response;
    }

    private function persistInfo(Info $info)
    {
        $this->entityManager->persist($info);
        $this->entityManager->flush();
    }
    #[Route('/', name: 'app_info_index', methods: ['GET'])]
    public function index(): Response
    {
        $infos = $this->infoRepository->findAll();
        return $this->makeJsonResponse($infos, Response::HTTP_OK);
    }

    #[Route('/new', name: 'app_info_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            return $this->json(['message' => 'Invalid JSON'], 400);
        }
        $info = new Info();
        $validKeys = ['title', 'content', 'category'];

        foreach ($data as $key => $value){
            if($key == "title"){
                $infoExists = $this->infoRepository->findOneBy(['title' => $value]);
                if($infoExists){
                    return new Response("Info already exists");
                }
                $info->setTitle($value);
            }
            if($key == "content"){
                $info->setContent($value);
            }
            if($key == "category"){
                $category =  $this->infoCategoryRepository->find($value);
                if(!$category){
                    return new Response("Category Not Found", Response::HTTP_NOT_FOUND);
                }
                $info->setInfoCategory($category);
            }
            if (!in_array($key, $validKeys)) {
                return new Response("Invalid data", Response::HTTP_BAD_REQUEST);
            }
        }
        $this->persistInfo($info);

        return $this->makeJsonResponse($info, Response::HTTP_CREATED);

    }

    #[Route('/{id}', name: 'app_info_show', methods: ['GET'])]
    public function show(int $id): Response
    {
        $info = $this->infoRepository->find($id);
        
        if (!$info) {
            return $this->json(['message' => 'Infos not found'], 404);
        }

        return $this->makeJsonResponse($info, Response::HTTP_OK);
    }

    #[Route('/{id}/edit', name: 'app_info_edit', methods: ['PUT', 'PATCH'])]
    public function edit(Request $request, int $id): Response
    {
        $data = json_decode($request->getContent(), true);
        $info = $this->infoRepository->find($id);

        if (!$info) {
            return $this->json(['message' => 'InfoCategory not found'], 404);
        }

        $validKeys = ['title', 'content', 'category'];

        foreach ($data as $key => $value){
            if($key == "title"){
                $infoExists = $this->infoRepository->findOneBy(['title' => $value]);
                if($infoExists && ($value !== $info->getTitle())){
                    return new Response("Info already exists");
                }
                $info->setTitle($value);
            }
            if($key == "content"){
                $info->setContent($value);
            }
            if($key == "category"){
                $category =  $this->infoCategoryRepository->find($value);
                if(!$category){
                    return new Response("Category Not Found", Response::HTTP_NOT_FOUND);
                }
                $info->setInfoCategory($category);
            }
            if (!in_array($key, $validKeys)) {
                return new Response("Invalid data", Response::HTTP_BAD_REQUEST);
            }
        }
        $this->persistInfo($info);

        $this->persistInfo($info);

        return $this->makeJsonResponse($info, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_info_delete', methods: ['DELETE'])]
    public function delete(int $id , EntityManagerInterface $entityManager): Response
    {
        $info = $this->infoRepository->find($id);

        if (!$info) {
            return $this->json(['message' => 'info not found'], 404);
        }

        $entityManager->remove($info);
        $entityManager->flush();

        return $this->json(['message' => 'Info deleted']);
    }
}
