<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\SignupStoreRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;

    /**
     */
    public function login(LoginUserRequest $request): JsonResponse
    {
        $request->validated($request->all());

        if(!Auth::attempt($request->only('email', 'password'))) {
            return $this->error('', 'Invalid login credentials!', 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token of: ' . $user->name)->plainTextToken
        ], 'Login successful!');
    }

    /**
     * Check if the user is authenticated.
     */
    public function check(): JsonResponse
    {
        if(Auth::check())
            return $this->success([], 'User is authenticated!');
        else
            return $this->error([], 'User is not authenticated!', 401);
    }


    /**
     * @param SignupStoreRequest $request
     * @return JsonResponse
     */
    public function register(SignupStoreRequest $request): JsonResponse
    {
        $request->validated($request->all());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token of: ' . $user->name)->plainTextToken
        ],
            'Registration successful!');
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->success([], 'Logout successful!, Your token has been destroyed!');
    }
}