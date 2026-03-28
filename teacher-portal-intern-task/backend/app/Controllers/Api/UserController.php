<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\AuthUserModel;
use CodeIgniter\HTTP\ResponseInterface;

class UserController extends BaseController
{
    private AuthUserModel $authUserModel;

    public function __construct()
    {
        $this->authUserModel = new AuthUserModel();
    }

    public function index(): ResponseInterface
    {
        $users = $this->authUserModel
            ->select('id, email, first_name, last_name, created_at, updated_at')
            ->orderBy('id', 'DESC')
            ->findAll();

        return $this->response->setJSON([
            'message' => 'Users fetched successfully',
            'data'    => $users,
        ]);
    }
}
