<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20|unique:users,phone',
            'password' => 'required|string|min:8|confirmed',
            'user_type' => 'required|in:admin,manager,staff,customer,partner',
        ], [
            'first_name.required' => 'Họ là bắt buộc.',
            'last_name.required' => 'Tên là bắt buộc.',
            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email đã được sử dụng.',
            'phone.required' => 'Số điện thoại là bắt buộc.',
            'phone.unique' => 'Số điện thoại đã được sử dụng.',
            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'password.confirmed' => 'Xác nhận mật khẩu không khớp.',
            'user_type.required' => 'Loại tài khoản là bắt buộc.',
            'user_type.in' => 'Loại tài khoản không hợp lệ.',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type,
            'status' => 'active',
            'is_vip' => false,
            'language' => 'vi',
            'timezone' => 'Asia/Ho_Chi_Minh',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required_without:phone|email',
            'phone' => 'required_without:email|string',
            'password' => 'required|string',
        ], [
            'email.required_without' => 'Email hoặc số điện thoại là bắt buộc.',
            'email.email' => 'Email không hợp lệ.',
            'phone.required_without' => 'Email hoặc số điện thoại là bắt buộc.',
            'password.required' => 'Mật khẩu là bắt buộc.',
        ]);

        $user = User::where('email', $request->email)
            ->orWhere('phone', $request->phone)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages(['password' => ['Thông tin đăng nhập không chính xác.']]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Đăng xuất thành công']);
    }

    public function forgotPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
        ], [
            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ.',
        ]);

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Đường dẫn đặt lại mật khẩu đã được gửi đến email của bạn.'])
            : response()->json(['message' => 'Không thể gửi email đặt lại mật khẩu.'], 400);
    }

    public function resetPassword(Request $request)
    {
        $validated = $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'token.required' => 'Mã token là bắt buộc.',
            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ.',
            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'password.confirmed' => 'Xác nhận mật khẩu không khớp.',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill(['password' => Hash::make($password)])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Mật khẩu đã được đặt lại thành công.'])
            : response()->json(['message' => 'Không thể đặt lại mật khẩu.'], 400);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'first_name' => 'sometimes|string|max:100',
            'last_name' => 'sometimes|string|max:100',
            'phone' => 'sometimes|string|max:20|unique:users,phone,' . $user->id,
            'date_of_birth' => 'sometimes|date',
            'gender' => 'sometimes|in:male,female,other',
            'nationality' => 'sometimes|string|max:100',
            'address' => 'sometimes|text',
            'avatar' => 'sometimes|string|max:255',
            'language' => 'sometimes|string|max:10',
            'timezone' => 'sometimes|string|max:50',
        ], [
            'first_name.string' => 'Họ phải là chuỗi ký tự.',
            'first_name.max' => 'Họ không được vượt quá 100 ký tự.',
            'last_name.string' => 'Tên phải là chuỗi ký tự.',
            'last_name.max' => 'Tên không được vượt quá 100 ký tự.',
            'phone.unique' => 'Số điện thoại đã được sử dụng.',
            'phone.max' => 'Số điện thoại không được vượt quá 20 ký tự.',
            'date_of_birth.date' => 'Ngày sinh không hợp lệ.',
            'gender.in' => 'Giới tính không hợp lệ.',
            'nationality.max' => 'Quốc tịch không được vượt quá 100 ký tự.',
            'avatar.max' => 'URL avatar không được vượt quá 255 ký tự.',
            'language.max' => 'Ngôn ngữ không được vượt quá 10 ký tự.',
            'timezone.max' => 'Múi giờ không được vượt quá 50 ký tự.',
        ]);

        $user->update($request->only([
            'first_name',
            'last_name',
            'phone',
            'date_of_birth',
            'gender',
            'nationality',
            'address',
            'avatar',
            'language',
            'timezone'
        ]));

        return response()->json(['message' => 'Cập nhật hồ sơ thành công', 'user' => $user]);
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->user();
        $this->handleSocialLogin($user, 'google');
    }

    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function handleFacebookCallback()
    {
        $user = Socialite::driver('facebook')->user();
        $this->handleSocialLogin($user, 'facebook');
    }

    protected function handleSocialLogin($socialUser, $provider)
    {
        $user = User::where('email', $socialUser->email)->first();

        if (!$user) {
            $user = User::create([
                'first_name' => explode(' ', $socialUser->name)[0] ?? 'Unknown',
                'last_name' => implode(' ', array_slice(explode(' ', $socialUser->name), 1)) ?? '',
                'email' => $socialUser->email,
                'phone' => null,
                'password' => Hash::make(Str::random(16)),
                'user_type' => 'customer',
                'status' => 'active',
                'is_vip' => false,
                'language' => 'vi',
                'timezone' => 'Asia/Ho_Chi_Minh',
                'provider' => $provider,
                'provider_id' => $socialUser->id,
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user]);
    }
}