<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Libraries\JwtService;
use App\Models\AuthUserModel;
use CodeIgniter\HTTP\ResponseInterface;

class AuthController extends BaseController
{
    private AuthUserModel $authUserModel;

    public function __construct()
    {
        $this->authUserModel = new AuthUserModel();
    }

    public function register(): ResponseInterface
    {
        $rules = [
            'email'      => 'required|valid_email|is_unique[auth_user.email]',
            'first_name' => 'required|min_length[2]|max_length[100]',
            'last_name'  => 'required|min_length[2]|max_length[100]',
            'password'   => 'required|min_length[8]',
        ];

        if (! $this->validateData($this->request->getJSON(true) ?? [], $rules)) {
            return $this->response
                ->setStatusCode(422)
                ->setJSON([
                    'message' => 'Validation failed',
                    'errors'  => $this->validator->getErrors(),
                ]);
        }

        $payload = $this->request->getJSON(true);

        $userData = [
            'email'      => strtolower(trim($payload['email'])),
            'first_name' => trim($payload['first_name']),
            'last_name'  => trim($payload['last_name']),
            'password'   => password_hash($payload['password'], PASSWORD_DEFAULT),
        ];

        $userId = $this->authUserModel->insert($userData, true);
        $user = $this->authUserModel->find($userId);

        return $this->response
            ->setStatusCode(201)
            ->setJSON([
                'message' => 'User registered successfully',
                'token'   => JwtService::generateToken($user),
                'user'    => [
                    'id'         => $user['id'],
                    'email'      => $user['email'],
                    'first_name' => $user['first_name'],
                    'last_name'  => $user['last_name'],
                ],
            ]);
    }

    public function login(): ResponseInterface
    {
        $rules = [
            'email'    => 'required|valid_email',
            'password' => 'required',
        ];

        if (! $this->validateData($this->request->getJSON(true) ?? [], $rules)) {
            return $this->response
                ->setStatusCode(422)
                ->setJSON([
                    'message' => 'Validation failed',
                    'errors'  => $this->validator->getErrors(),
                ]);
        }

        $payload = $this->request->getJSON(true);
        $user = $this->authUserModel
            ->where('email', strtolower(trim($payload['email'])))
            ->first();

        if (! $user || ! password_verify($payload['password'], $user['password'])) {
            return $this->response
                ->setStatusCode(401)
                ->setJSON(['message' => 'Invalid email or password']);
        }

        return $this->response->setJSON([
            'message' => 'Login successful',
            'token'   => JwtService::generateToken($user),
            'user'    => [
                'id'         => $user['id'],
                'email'      => $user['email'],
                'first_name' => $user['first_name'],
                'last_name'  => $user['last_name'],
            ],
        ]);
    }
}
