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
        return $this->render('playlist_category/index.html.twig', [
            'playlist_categories' => $playlistCategoryRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_playlist_category_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $playlistCategory = new PlaylistCategory();
        $form = $this->createForm(PlaylistCategoryType::class, $playlistCategory);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($playlistCategory);
            $entityManager->flush();

            return $this->redirectToRoute('app_playlist_category_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('playlist_category/new.html.twig', [
            'playlist_category' => $playlistCategory,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_playlist_category_show', methods: ['GET'])]
    public function show(PlaylistCategory $playlistCategory): Response
    {
        return $this->render('playlist_category/show.html.twig', [
            'playlist_category' => $playlistCategory,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_playlist_category_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, PlaylistCategory $playlistCategory, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(PlaylistCategoryType::class, $playlistCategory);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_playlist_category_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('playlist_category/edit.html.twig', [
            'playlist_category' => $playlistCategory,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_playlist_category_delete', methods: ['POST'])]
    public function delete(Request $request, PlaylistCategory $playlistCategory, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$playlistCategory->getId(), $request->request->get('_token'))) {
            $entityManager->remove($playlistCategory);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_playlist_category_index', [], Response::HTTP_SEE_OTHER);
    }
}
