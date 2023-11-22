<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\SpotRepository;
use App\Repository\UserRepository;
use App\Serializer\UserSerializer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/users')]
class UserController extends AbstractController
{
    public function __construct(private readonly EntityManagerInterface $entityManager, private UserPasswordHasherInterface $hasher, private UserRepository $userRepository, private SpotRepository $spotRepository)
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


    #[Route('/', name: 'getAllUsers', methods: ['GET'])]
    public function getAllUsers(): Response
    {
        $users = $this->userRepository->findAll();
        return $this->makeJsonResponse($users, Response::HTTP_OK);
    }


    #[Route('/register', name: 'app_user_new', methods: ['POST'])]
    public function new(Request $request): Response
    {
        $user = new User();
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);

        $validKeys = ["email", "password","pseudo"];
        foreach ($data as $key => $value) {
            if ($key == "email") {
                $userExists = $this->userRepository->findOneBy(['email' => $value]);
                if($userExists){
                    return new Response("Email already exists", Response::HTTP_BAD_REQUEST);
                }
                $user->setEmail($value);
            }
            if ($key == "password") {
                $user->setPassword($this->hasher->hashPassword($user, $value));
            }
            if ($key == "pseudo") {
                $userExists = $this->userRepository->findOneBy(['pseudo' => $value]);
                if($userExists){
                    return new Response("Pseudo already exists", Response::HTTP_BAD_REQUEST);
                }
                $user->setPseudo($value);
            }
            if (!in_array($key, $validKeys)) {
                return new Response("Invalid data", Response::HTTP_BAD_REQUEST);
            }
        }
        $this->persistUser($user);
        return $this->makeJsonResponse($user, Response::HTTP_CREATED);

    }
    #[Route('/{id}', name: 'app_user_show', methods: ['GET'])]
    public function show(int $id): Response
    {
        $user = $this->userRepository->findOneBy(['id' => $id]);
        return $this->makeJsonResponse($user, Response::HTTP_OK);
    }

    #[Route('/{id}/edit', name: 'app_user_edit', methods: ['PUT', 'PATCH'])]
    public function edit(Request $request, int $id): Response
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->userRepository->find($id);

        if(!$user){
            return $this->json(['message' => 'User not found'],Response::HTTP_NOT_FOUND);
        }
        $validKeys = ["email", "password","pseudo", "firstName", "lastName","roles", "spots"];
        foreach ($data as $key => $value){
            if ($key == "email") {
                $userExist = $this->userRepository->findOneBy(['email' => $value]);
                if($userExist && ($value !== $user->getEmail())){
                    return new Response("Email aleready exist", Response::HTTP_BAD_REQUEST);
                }
                $user->setEmail($value ?? $user->getEmail());
            }
            if ($key == "password") {
                $user->setPassword($this->hasher->hashPassword($user, $value));
            }
            if ($key == "pseudo") {
                $userExist = $this->userRepository->findOneBy(['pseudo' => $value]);
                if($userExist && ($value !== $user->getPseudo())){
                    return new Response("Pseudo aleready exist", Response::HTTP_BAD_REQUEST);
                }
                $user->setPseudo($value ?? $user->getPseudo());
            }
            if($key == "firstName"){
                $user->setFirstName($value ?? $user->getFirstName());
            }
            if($key == 'lastName'){
                $user->setLastName($value ?? $user->getLastName());
            }
            if($key == 'roles'){
                $user->setRoles($value ?? $user->getRoles());
            }
            if($key == 'spots'){
                $spotsToRemove = [];
                foreach ($user->getSpots() as $existingSpot){
                    $spotId = $existingSpot->getId();
                    if(!in_array($spotId, $value)){
                        $spotsToRemove[] = $existingSpot;
                    }
                }
                foreach ($spotsToRemove as $spotToRemove){
                    $user->removeSpot($spotToRemove);
                }

                foreach ($value as $v){
                    $spot = $this->spotRepository->find($v);
                    if(!$spot){
                        return new Response("No spot found", Response::HTTP_NOT_FOUND);
                    }
                    if(!$user->getSpots()->contains($spot)){
                        $user->addSpot($spot);
                        $spot->setAuthor($user);
                    }
                }
                $user->addSpot($value);
            }
            if (!in_array($key, $validKeys)) {
                return new Response("Invalid data", Response::HTTP_BAD_REQUEST);
            }
        }
        $this->persistUser($user);

        return $this->makeJsonResponse($user, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_user_delete', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        $user = $this->userRepository->find($id);
        if(!$user){
            return new Response('User not found', Response::HTTP_NOT_FOUND);
        }
        $this->entityManager->remove($user);
        $this->entityManager->flush();

        return new Response("User deleted", Response::HTTP_OK);
    }
}
