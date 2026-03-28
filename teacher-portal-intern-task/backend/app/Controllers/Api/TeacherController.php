<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\TeacherModel;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Database;
use Throwable;

class TeacherController extends BaseController
{
    private TeacherModel $teacherModel;

    public function __construct()
    {
        $this->teacherModel = new TeacherModel();
    }

    public function createWithUser(): ResponseInterface
    {
        $payload = $this->request->getJSON(true) ?? [];

        $rules = [
            'email'           => 'required|valid_email|is_unique[auth_user.email]',
            'first_name'      => 'required|min_length[2]|max_length[100]',
            'last_name'       => 'required|min_length[2]|max_length[100]',
            'password'        => 'required|min_length[8]',
            'university_name' => 'required|min_length[2]|max_length[150]',
            'gender'          => 'required|in_list[male,female,other]',
            'year_joined'     => 'required|integer|greater_than_equal_to[1980]|less_than_equal_to[2100]',
        ];

        if (! $this->validateData($payload, $rules)) {
            return $this->response
                ->setStatusCode(422)
                ->setJSON([
                    'message' => 'Validation failed',
                    'errors'  => $this->validator->getErrors(),
                ]);
        }

        $db = Database::connect();
        $db->transBegin();

        try {
            $db->table('auth_user')->insert([
                'email'      => strtolower(trim($payload['email'])),
                'first_name' => trim($payload['first_name']),
                'last_name'  => trim($payload['last_name']),
                'password'   => password_hash($payload['password'], PASSWORD_DEFAULT),
            ]);
            $userId = (int) $db->insertID();

            $db->table('teachers')->insert([
                'user_id'         => $userId,
                'university_name' => trim($payload['university_name']),
                'gender'          => strtolower($payload['gender']),
                'year_joined'     => (int) $payload['year_joined'],
            ]);
            $teacherId = (int) $db->insertID();

            if ($db->transStatus() === false) {
                $db->transRollback();
                return $this->response
                    ->setStatusCode(500)
                    ->setJSON(['message' => 'Failed to create records']);
            }

            $db->transCommit();

            return $this->response
                ->setStatusCode(201)
                ->setJSON([
                    'message' => 'User and teacher created successfully',
                    'data'    => [
                        'user_id'    => $userId,
                        'teacher_id' => $teacherId,
                    ],
                ]);
        } catch (Throwable $e) {
            $db->transRollback();
            return $this->response
                ->setStatusCode(500)
                ->setJSON([
                    'message' => 'Server error while creating teacher',
                    'error'   => $e->getMessage(),
                ]);
        }
    }

    public function index(): ResponseInterface
    {
        $teachers = $this->teacherModel
            ->select('teachers.id, teachers.user_id, teachers.university_name, teachers.gender, teachers.year_joined, auth_user.email, auth_user.first_name, auth_user.last_name')
            ->join('auth_user', 'auth_user.id = teachers.user_id')
            ->orderBy('teachers.id', 'DESC')
            ->findAll();

        return $this->response->setJSON([
            'message' => 'Teachers fetched successfully',
            'data'    => $teachers,
        ]);
    }
}
