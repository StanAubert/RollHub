<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerDYXg2xh\App_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerDYXg2xh/App_KernelDevDebugContainer.php') {
    touch(__DIR__.'/ContainerDYXg2xh.legacy');

    return;
}

if (!\class_exists(App_KernelDevDebugContainer::class, false)) {
    \class_alias(\ContainerDYXg2xh\App_KernelDevDebugContainer::class, App_KernelDevDebugContainer::class, false);
}

return new \ContainerDYXg2xh\App_KernelDevDebugContainer([
    'container.build_hash' => 'DYXg2xh',
    'container.build_id' => '4dd4a09e',
    'container.build_time' => 1698323802,
], __DIR__.\DIRECTORY_SEPARATOR.'ContainerDYXg2xh');
