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
            "spots" => SpotSerializer::SerializeAllSpotsForUser($user->getSpots())
        ];
    }

    public static function serializeAllUsers($users): array
    {
        $response = [];

        foreach ($users as $u) {
            $response[] = UserSerializer::serializeOneUser($u);
        }

        return $response;
    }

    public static function serializeOneUserForSpot(User $user): array
    {
        return [
            "id" => $user->getId(),
            "email" => $user->getEmail(),
            "roles" => $user->getRoles(),
            "firstName" => $user->getFirstName(),
            "lastName" => $user->getLastName(),
            "pseudo" => $user->getPseudo(),
        ];
    }

    public static function serializeAllUsersForSpot($users): array
    {
        $response = [];

        foreach ($users as $u) {
            $response[] = UserSerializer::serializeOneUserForSpot($u);
        }

        return $response;
    }
}
