<?php

namespace ContainerDYXg2xh;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_8m6pZACService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.8m6pZAC' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.8m6pZAC'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService ??= $container->getService(...), [
            'playlistCategoryRepository' => ['privates', 'App\\Repository\\PlaylistCategoryRepository', 'getPlaylistCategoryRepositoryService', true],
        ], [
            'playlistCategoryRepository' => 'App\\Repository\\PlaylistCategoryRepository',
        ]);
    }
}
