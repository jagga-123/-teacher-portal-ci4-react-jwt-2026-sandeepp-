<?php

namespace App\Filters;

use App\Libraries\JwtService;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class JwtAuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $authorization = $request->getHeaderLine('Authorization');

        if (! preg_match('/Bearer\s(\S+)/', $authorization, $matches)) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON(['message' => 'Unauthorized: Missing Bearer token']);
        }

        $payload = JwtService::decodeToken($matches[1]);

        if ($payload === null) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON(['message' => 'Unauthorized: Invalid or expired token']);
        }

        return null;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}
