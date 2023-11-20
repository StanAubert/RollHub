<?php

namespace App\Serializer;

use App\Entity\User;

class UserSerializer
{
    public static function serializeOneUser(User $user): array
    {
        return [
            "id" => $user->getId(),
            "email" => $user->getEmail(),
            "roles" => $user->getRoles(),
            "firstName" => $user->getFirstName(),
            "lastName" => $user->getLastName(),
            "pseudo" => $user->getPseudo(),
            "spots" => SpotSerializer::SerializeAllSpots($user->getSpots())
        ];
    }

    public static function serializeAllUsers($users): array
    {
        $response = [];

        foreach ($users as $u) {
            array_push($response, UserSerializer::serializeOneUser($u));
        }

        return $response;
    }
}
