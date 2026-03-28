<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;

class Home extends BaseController
{
    public function index(): ResponseInterface
    {
        return $this->response->setJSON([
            'message' => 'Teacher Portal API is running',
        ]);
    }
}
