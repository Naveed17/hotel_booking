import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  await new Promise(resolve => setTimeout(resolve, 200));

  if (!email || !password) {
    return NextResponse.json({
      status: false,
      message: "Email and password are required"
    }, { status: 400 });
  }

  if (email === 'test@example.com' && password === 'password') {
    return NextResponse.json({
      status: true,
      message: "Login successful",
      data: {
        id: 1,
        email: email,
        name: "Test User",
        token: "mock-jwt-token"
      }
    });
  }

  return NextResponse.json({
    status: false,
    message: "Invalid credentials"
  }, { status: 401 });
}