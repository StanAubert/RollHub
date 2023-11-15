<?php

namespace App\Controller;
use App\Entity\Info;
use App\Form\InfoType;
use App\Repository\InfoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/info')]
class InfoController extends AbstractController
{
    #[Route('/', name: 'app_info_index', methods: ['GET'])]
    public function index(InfoRepository $infoRepository): Response
    {
        $infos = $infoRepository->findAll();
        return $this->json($infos, Response::HTTP_OK);
    }

    #[Route('/new', name: 'app_info_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            return $this->json(['message' => 'Invalid JSON'], 400);
        }
        
        $info = new Info();
        $info->setTitle($data['title']);
        $info->setContent($data['content']); 
        $entityManager->persist($info);
        $entityManager->flush();

        return $this->json($info, 201);

    }

    #[Route('/{id}', name: 'app_info_show', methods: ['GET'])]
    public function show(InfoRepository $infoRepository, int $id): Response
    {
        $info = $infoRepository->find($id);
        
        if (!$info) {
            return $this->json(['message' => 'Info not found'], 404);
        }

        return $this->json($info);
    }

    #[Route('/{id}/edit', name: 'app_info_edit', methods: ['PUT', 'PATCH'])]
    public function edit(Request $request, InfoRepository $infoRepository, EntityManagerInterface $entityManager, int $id): Response
    {
        $data = json_decode($request->getContent(), true);
        $info = $infoRepository->find($id);

        if (!$info) {
            return $this->json(['message' => 'InfoCategory not found'], 404);
        }

        $info->setTitle($data['title'] ?? $info->getTitle());
        $info->setContent($data['content'] ?? $info->getContent());

        $entityManager->flush();

        return $this->json($info);
    }

    #[Route('/{id}', name: 'app_info_delete', methods: ['DELETE'])]
    public function delete(InfoRepository $infoRepository,int $id , EntityManagerInterface $entityManager): Response
    {
        $info = $infoRepository->find($id);

        if (!$info) {
            return $this->json(['message' => 'info not found'], 404);
        }

        $entityManager->remove($info);
        $entityManager->flush();

        return $this->json(['message' => 'Info deleted']);
    }
}
