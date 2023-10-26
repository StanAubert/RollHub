<?php

namespace ContainerI34R33Z;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_QRuIhGService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.QRu_ihG' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.QRu_ihG'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService ??= $container->getService(...), [
            'entityManager' => ['services', 'doctrine.orm.default_entity_manager', 'getDoctrine_Orm_DefaultEntityManagerService', true],
            'playlistCategory' => ['privates', '.errored..service_locator.QRu_ihG.App\\Entity\\PlaylistCategory', NULL, 'Cannot autowire service ".service_locator.QRu_ihG": it needs an instance of "App\\Entity\\PlaylistCategory" but this type has been excluded in "config/services.yaml".'],
        ], [
            'entityManager' => '?',
            'playlistCategory' => 'App\\Entity\\PlaylistCategory',
        ]);
    }
}
