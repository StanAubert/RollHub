<?php

namespace ContainerDYXg2xh;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_ODZxmGTService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.oDZxmGT' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.oDZxmGT'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService ??= $container->getService(...), [
            'entityManager' => ['services', 'doctrine.orm.default_entity_manager', 'getDoctrine_Orm_DefaultEntityManagerService', true],
            'info' => ['privates', '.errored..service_locator.oDZxmGT.App\\Entity\\Info', NULL, 'Cannot autowire service ".service_locator.oDZxmGT": it needs an instance of "App\\Entity\\Info" but this type has been excluded in "config/services.yaml".'],
        ], [
            'entityManager' => '?',
            'info' => 'App\\Entity\\Info',
        ]);
    }
}
