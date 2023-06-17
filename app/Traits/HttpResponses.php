<?php namespace App\Traits;

trait HttpResponses{
    protected function success($data, $message = null, $code = 200): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => $data,
            'message' => $message
        ], $code);
    }

    protected function error($data, $message = null, $code): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'data' => $data,
            'message' => $message
        ], $code);
    }
}
