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
            'Author' => UserSerializer::serializeOneUser($spot->getAuthor()),
        ];
    }

    public static function SerializeAllSpots($spots): array
    {
        $response = [];

        foreach ($spots as $spot)
        {
            array_push($response, SpotSerializer::SerializeOneSpot($spot));
        }

        return $response;
    }
}