<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

$routes->get('/', 'Home::index');

$routes->group('api', ['filter' => 'cors'], static function ($routes): void {
    $routes->options('', 'Api\PreflightController::index');
    $routes->options('(:any)', 'Api\PreflightController::index');

    $routes->post('auth/register', 'Api\AuthController::register');
    $routes->post('auth/login', 'Api\AuthController::login');

    $routes->group('', ['filter' => 'jwt'], static function ($routes): void {
        $routes->post('teachers', 'Api\TeacherController::createWithUser');
        $routes->get('users', 'Api\UserController::index');
        $routes->get('teachers', 'Api\TeacherController::index');
    });
});
