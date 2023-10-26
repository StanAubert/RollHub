<?php

namespace App\Controller;

use App\Entity\Spot;
use App\Form\SpotType;
use App\Repository\SpotRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/spot')]
class SpotController extends AbstractController
{
    #[Route('/', name: 'app_spot_index', methods: ['GET'])]
    public function index(SpotRepository $spotRepository): Response
    {
        return $this->render('spot/index.html.twig', [
            'spots' => $spotRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_spot_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $spot = new Spot();
        $form = $this->createForm(SpotType::class, $spot);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($spot);
            $entityManager->flush();

            return $this->redirectToRoute('app_spot_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('spot/new.html.twig', [
            'spot' => $spot,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_spot_show', methods: ['GET'])]
    public function show(Spot $spot): Response
    {
        return $this->render('spot/show.html.twig', [
            'spot' => $spot,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_spot_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Spot $spot, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(SpotType::class, $spot);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_spot_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('spot/edit.html.twig', [
            'spot' => $spot,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_spot_delete', methods: ['POST'])]
    public function delete(Request $request, Spot $spot, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$spot->getId(), $request->request->get('_token'))) {
            $entityManager->remove($spot);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_spot_index', [], Response::HTTP_SEE_OTHER);
    }
}
