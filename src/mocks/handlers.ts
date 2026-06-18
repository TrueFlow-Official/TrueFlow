import { http, HttpResponse } from "msw";

export const handlers = [
  // Login Handler
  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = (await request.json()) as { email?: string; password?: string };

    if (!email || !password) {
      return HttpResponse.json(
        { message: "لطفا ایمیل و رمز عبور را وارد کنید." },
        { status: 400 }
      );
    }

    // Standard mock user credentials
    if (email === "admin@example.com" && password === "password123") {
      return HttpResponse.json(
        {
          token: "mock-jwt-token-admin",
          user: {
            id: "1",
            name: "سجاد احمدی",
            email: "admin@example.com",
            roles: ["admin"],
            permissions: [
              "users:view",
              "users:manage",
              "org:view",
              "org:manage",
              "settings:view",
              "settings:manage",
            ],
          },
        },
        {
          headers: {
            // Write mock auth token cookie to root path so middleware can read it on routing changes
            "Set-Cookie": "auth_token=mock-jwt-token-admin; Path=/; Max-Age=86400; SameSite=Strict",
          },
        }
      );
    }

    return HttpResponse.json(
      { message: "ایمیل یا رمز عبور اشتباه است. (راهنما: admin@example.com / password123)" },
      { status: 401 }
    );
  }),

  // Register Handler
  http.post("/api/auth/register", async ({ request }) => {
    const { name, email, password } = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name || !email || !password) {
      return HttpResponse.json(
        { message: "اطلاعات وارد شده ناقص است." },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        message: "ثبت‌نام با موفقیت انجام شد. لطفا ایمیل خود را تایید کنید.",
        user: { id: "2", name, email, roles: ["member"], permissions: ["org:view"] },
      },
      { status: 201 }
    );
  }),

  // Forgot Password Handler
  http.post("/api/auth/forgot-password", async ({ request }) => {
    const { email } = (await request.json()) as { email?: string };

    if (!email) {
      return HttpResponse.json(
        { message: "لطفا ایمیل را وارد کنید." },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { message: "لینک بازیابی رمز عبور به ایمیل شما ارسال شد." },
      { status: 200 }
    );
  }),

  // Reset Password Handler
  http.post("/api/auth/reset-password", async ({ request }) => {
    const { password, token } = (await request.json()) as { password?: string; token?: string };

    if (!password || !token) {
      return HttpResponse.json(
        { message: "اطلاعات نامعتبر است." },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { message: "رمز عبور شما با موفقیت تغییر کرد." },
      { status: 200 }
    );
  }),

  // Verify Email Handler
  http.post("/api/auth/verify-email", async ({ request }) => {
    const { token } = (await request.json()) as { token?: string };

    if (!token) {
      return HttpResponse.json(
        { message: "توکن تایید نامعتبر است." },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { message: "ایمیل شما با موفقیت تایید شد." },
      { status: 200 }
    );
  }),

  // Fetch Current Session Profile
  http.get("/api/auth/me", ({ request }) => {
    const cookies = request.headers.get("cookie") || "";
    const hasToken = cookies.includes("auth_token=mock-jwt-token-admin");

    if (!hasToken) {
      return HttpResponse.json(
        { message: "عدم دسترسی. لطفا مجددا وارد شوید." },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      user: {
        id: "1",
        name: "سجاد احمدی",
        email: "admin@example.com",
        roles: ["admin"],
        permissions: [
          "users:view",
          "users:manage",
          "org:view",
          "org:manage",
          "settings:view",
          "settings:manage",
        ],
      },
    });
  }),

  // Logout Handler
  http.post("/api/auth/logout", () => {
    return HttpResponse.json(
      { message: "خروج با موفقیت انجام شد." },
      {
        headers: {
          // Clear cookie on logout
          "Set-Cookie": "auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict",
        },
      }
    );
  }),
];
