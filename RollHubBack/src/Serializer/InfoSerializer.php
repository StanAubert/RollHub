<?php

namespace App\Serializer;

use App\Entity\Info;

class InfoSerializer
{
    public static function serializeOneInfo(Info $info): array
    {
        return [
            "id" => $info->getId(),
            "title" => $info->getTitle(),
            "content" => $info->getContent(),
            "categories" => InfoCategorySerializer::SerializeAllInfoCategories($info->getInfoCategories())
        ];
    }

    public static function serializeAllInfos($infos): array
    {
        $response = [];

        foreach ($infos as $info){
            array_push($response, InfoSerializer::serializeOneInfo($info));
        }

        return $response;
    }
}