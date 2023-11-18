<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use App\Serializer\UserSerializer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class UserController extends AbstractController
{
    public function __construct(private readonly EntityManagerInterface $entityManager, private UserPasswordHasherInterface $hasher, private UserRepository $userRepository)
    {

    }


    private function makeJsonResponse($user, int $statusCode): Response
    {
        $response = new Response();
        $jsonContent = is_array($user) ? UserSerializer::serializeAllUsers($user) : UserSerializer::serializeOneUser($user);
        $response->setContent(json_encode($jsonContent, JSON_THROW_ON_ERROR));
        $response->headers->set("Content-Type", "application/json");
        $response->setStatusCode($statusCode);
        return $response;
    }

    private function persistUser(User $user)
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }


    #[Route('/users', name: 'getAllUsers', methods: ['GET'])]
    public function getAllUsers(): Response
    {
        $users = $this->userRepository->findAll();
        return $this->makeJsonResponse($users, Response::HTTP_OK);
    }


    #[Route('/users', name: 'app_user_new', methods: ['POST'])]
    public function new(Request $request): Response
    {
        $user = new User();
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);

        $validKeys = ["email", "password","pseudo"];
        foreach ($data as $key => $value) {
            if ($key == "email") {
                $user->setEmail($value);
            }
            if ($key == "password") {
                $user->setPassword($this->hasher->hashPassword($user, $value));
            }
            if ($key == "pseudo") {
                $user->setPseudo($value);
            }
            if (!in_array($key, $validKeys)) {
                return new Response("Invalid data", Response::HTTP_BAD_REQUEST);
            }
        }
        $this->persistUser($user);
        return $this->makeJsonResponse($user, Response::HTTP_OK);

    }

    #[Route('/{id}', name: 'app_user_show', methods: ['GET'])]
    public function show(User $user): Response
    {
        return $this->render('user/show.html.twig', [
            'user' => $user,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_user_edit', methods: ['PUT', 'PATCH'])]
    public function edit(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_user_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('user/edit.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_user_delete', methods: ['POST'])]
    public function delete(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_user_index', [], Response::HTTP_SEE_OTHER);
    }
}
