<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class PreflightController extends BaseController
{
    public function index(): ResponseInterface
    {
        return $this->response->setStatusCode(204);
    }
}
