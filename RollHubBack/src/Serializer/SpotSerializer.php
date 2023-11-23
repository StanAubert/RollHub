<?php

namespace App\Serializer;

use App\Entity\Spot;

class SpotSerializer
{
    public static function SerializeOneSpot(Spot $spot) : array
    {
        return[
            'id' => $spot->getId(),
            'name' => $spot->getName(),
            'latitude' => $spot->getLatitude(),
            'longitude' => $spot->getLongitude(),
            'Author' => UserSerializer::serializeOneUserForSpot($spot->getAuthor()),
        ];
    }

    public static function SerializeAllSpots($spots): array
    {
        $response = [];

        foreach ($spots as $spot)
            $response[] = SpotSerializer::SerializeOneSpot($spot);

        return $response;
    }

    public static function SerializeOneSpotForUser(Spot $spot) : array
    {
        return[
            'id' => $spot->getId(),
            'name' => $spot->getName(),
            'latitude' => $spot->getLatitude(),
            'longitude' => $spot->getLongitude(),
            'author' => $spot->getAuthor()->getId(),
        ];
    }

    public static function SerializeAllSpotsForUser($spots): array
    {
        $response = [];

        foreach ($spots as $spot)
            $response[] = SpotSerializer::SerializeOneSpotForUser($spot);

        return $response;
    }
}