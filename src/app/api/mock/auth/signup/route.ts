import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');

  await new Promise(resolve => setTimeout(resolve, 250));

  if (!email || !password || !name) {
    return NextResponse.json({
      status: false,
      message: "Name, email and password are required"
    }, { status: 400 });
  }

  return NextResponse.json({
    status: true,
    message: "Account created successfully",
    data: {
      id: Date.now(),
      email: email,
      name: name,
      token: "mock-jwt-token"
    }
  });
}