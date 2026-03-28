<?php

namespace App\Libraries;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Throwable;

class JwtService
{
    public static function generateToken(array $user): string
    {
        $issuedAt = time();
        $expiresIn = (int) env('JWT_EXPIRES_IN', 3600);

        $payload = [
            'iss' => env('app.baseURL', 'http://localhost:8080/'),
            'iat' => $issuedAt,
            'exp' => $issuedAt + $expiresIn,
            'sub' => $user['id'],
            'email' => $user['email'],
        ];

        return JWT::encode($payload, self::secretKey(), 'HS256');
    }

    public static function decodeToken(string $token): ?array
    {
        try {
            $decoded = JWT::decode($token, new Key(self::secretKey(), 'HS256'));
            return (array) $decoded;
        } catch (Throwable $e) {
            return null;
        }
    }

    private static function secretKey(): string
    {
        return (string) env('JWT_SECRET', 'change_this_to_a_long_random_secret_key');
    }
}
