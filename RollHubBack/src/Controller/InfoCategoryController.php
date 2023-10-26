<?php

namespace App\Controller;

use App\Entity\InfoCategory;
use App\Form\InfoCategoryType;
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
        return $this->render('info_category/index.html.twig', [
            'info_categories' => $infoCategoryRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_info_category_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $infoCategory = new InfoCategory();
        $form = $this->createForm(InfoCategoryType::class, $infoCategory);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($infoCategory);
            $entityManager->flush();

            return $this->redirectToRoute('app_info_category_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('info_category/new.html.twig', [
            'info_category' => $infoCategory,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_info_category_show', methods: ['GET'])]
    public function show(InfoCategory $infoCategory): Response
    {
        return $this->render('info_category/show.html.twig', [
            'info_category' => $infoCategory,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_info_category_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, InfoCategory $infoCategory, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(InfoCategoryType::class, $infoCategory);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_info_category_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('info_category/edit.html.twig', [
            'info_category' => $infoCategory,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_info_category_delete', methods: ['POST'])]
    public function delete(Request $request, InfoCategory $infoCategory, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$infoCategory->getId(), $request->request->get('_token'))) {
            $entityManager->remove($infoCategory);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_info_category_index', [], Response::HTTP_SEE_OTHER);
    }
}
