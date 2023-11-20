<?php

namespace App\Serializer;

use App\Entity\InfoCategory;

class InfoCategorySerializer
{
    public static function SerializeOneInfoCategory(InfoCategory $infoCategory) :array
    {
        return [
            "id" => $infoCategory->getId(),
            "title" => $infoCategory->getTitle(),
            "color" => $infoCategory->getColor(),
            "infos" => InfoSerializer::serializeAllInfos($infoCategory->getInfos())
        ];
    }

    public static function SerializeAllInfoCategories($infoCategories) : array
    {
        $response = [];

        foreach ($infoCategories as $ic){
            array_push($response, InfoCategorySerializer::SerializeOneInfoCategory($ic));
        }
        return $response;
    }
}