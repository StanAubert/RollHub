<?php

namespace App\Controller;

use App\Entity\Spot;
use App\Repository\SpotRepository;
use App\Repository\UserRepository;
use App\Serializer\SpotSerializer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/spot')]
class SpotController extends AbstractController
{

    public function __construct(private readonly EntityManagerInterface $entityManager,private SpotRepository $spotRepository, private UserRepository $userRepository)
    {

    }


    private function makeJsonResponse($spot, int $statusCode): Response
    {
        $response = new Response();
        $jsonContent = is_array($spot) ? SpotSerializer::SerializeAllSpots($spot) : SpotSerializer::SerializeOneSpot($spot);
        $response->setContent(json_encode($jsonContent, JSON_THROW_ON_ERROR));
        $response->headers->set("Content-Type", "application/json");
        $response->setStatusCode($statusCode);
        return $response;
    }

    private function persistSpot(Spot $spot)
    {
        $this->entityManager->persist($spot);
        $this->entityManager->flush();
    }
    #[Route('/', name: 'app_spot_index', methods: ['GET'])]
    public function index(): Response
    {
        $spots =  $this->spotRepository->findAll();
        return $this->makeJsonResponse($spots, Response::HTTP_OK);
    }

    #[Route('/new', name: 'app_spot_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $spot = new Spot();
        $data = json_decode($request->getContent(), true, 512,JSON_THROW_ON_ERROR);
        $validKeys = ['name', 'latitude', 'longitude', 'author'];
        foreach ($data as $key => $value){
            if($key == 'name'){
                $spotExists = $this->spotRepository->findOneBy(['name' => $value]);
                if($spotExists){
                    return new Response("SpotName already exists", Response::HTTP_BAD_REQUEST);
                }
                $spot->setName($value);
            }
            if($key == 'latitude'){
                $spot->setLatitude($value);
            }
            if($key == 'longitude'){
                $spot->setLongitude($value);
            }
            if($key == 'author'){
                $author = $this->userRepository->find($value);
                if(!$author){
                    return new Response('Nos user found', Response::HTTP_NOT_FOUND);
                }
                $spot->setAuthor($author);
            }
            if (!in_array($key, $validKeys)) {
                return new Response("Invalid data", Response::HTTP_BAD_REQUEST);
            }
        }
        if(array_key_exists('latitude', $data) && array_key_exists('longitude', $data) ){
            $latExists = $this->spotRepository->findOneBy(['latitude'=> $spot->getLatitude()]);
            $longExists = $this->spotRepository->findOneBy(['longitude' => $spot->getLongitude()]);

            if($latExists && $longExists){
                return new Response("Spot Already exists", Response::HTTP_BAD_REQUEST);
            }
        }
        $this->persistSpot($spot);
        return $this->makeJsonResponse($spot, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_spot_show', methods: ['GET'])]
    public function show(int$id): Response
    {
        $spot = $this->spotRepository->find($id);
        return $this->makeJsonResponse($spot, Response::HTTP_OK);
    }

    #[Route('/{id}/edit', name: 'app_spot_edit', methods: ['PUT', 'PATCH'])]
    public function edit(Request $request,int $id): Response
    {
        $data = json_decode($request->getContent(), true, 512,JSON_THROW_ON_ERROR);
        $spot = $this->spotRepository->find($id);

        if(!$spot){
            return new Response("Spot not found", Response::HTTP_NOT_FOUND);
        }
        $validKeys = ['name', 'latitude', 'longitude'];
        foreach ($data as $key => $value){
            if($key == 'name'){
                $spotExists = $this->spotRepository->findOneBy(['name' => $value]);
                if($spotExists && ($value !== $spot->getName())){
                    return new Response("SpotName already exists", Response::HTTP_BAD_REQUEST);
                }
                $spot->setName($value);
            }
            if($key == 'latitude'){
                $spot->setLatitude($value);
            }
            if($key == 'longitude'){
                $spot->setLongitude($value);
            }
            if (!in_array($key, $validKeys)) {
                return new Response("Invalid data", Response::HTTP_BAD_REQUEST);
            }
        }
        if(array_key_exists('latitude', $data) && array_key_exists('longitude', $data) ){
            $latExists = $this->spotRepository->findOneBy(['latitude'=> $spot->getLatitude()]);
            $longExists = $this->spotRepository->findOneBy(['longitude'=> $spot->getLongitude()]);

            if($latExists && $longExists){
                return new Response("Spot Already exists", Response::HTTP_BAD_REQUEST);
            }
        }
        $this->persistSpot($spot);
        return $this->makeJsonResponse($spot, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_spot_delete', methods: ['DELETE'])]
    public function delete(int $id,): Response
    {
        $spot = $this->spotRepository->find($id);
        if(!$spot){
            return new Response("Spot not found", Response::HTTP_NOT_FOUND);
        }
        $this->entityManager->remove($spot);
        $this->entityManager->flush();
        return $this->json(['message' => 'Spot deleted'], Response::HTTP_OK);
    }
}
