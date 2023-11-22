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
            "category" => $info->getInfoCategory() ? InfoCategorySerializer::SerializeOneInfoCategoryForInfo($info->getInfoCategory()) : null,
        ];
    }

    public static function serializeAllInfos($infos): array
    {
        $response = [];

        foreach ($infos as $info){
            $response[] = InfoSerializer::serializeOneInfo($info);
        }

        return $response;
    }
}