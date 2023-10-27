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
        return $this->render('info/index.html.twig', [
            'infos' => $infoRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_info_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $info = new Info();
        $info->setTitle($data['title']);
        $info->setContent($data['content']); 
        $entityManager->persist($info);
        $entityManager->flush();

        return $this->json($info, 201);

    }

    #[Route('/{id}', name: 'app_info_show', methods: ['GET'])]
    public function show(Info $info): Response
    {
        return $this->render('info/show.html.twig', [
            'info' => $info,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_info_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Info $info, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(InfoType::class, $info);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_info_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('info/edit.html.twig', [
            'info' => $info,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_info_delete', methods: ['POST'])]
    public function delete(Request $request, Info $info, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$info->getId(), $request->request->get('_token'))) {
            $entityManager->remove($info);
            $entityManager->flush();
        }

        return $this->json(['message' => 'Info supprimée'], 204);
    }
}
