import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get('email');

  await new Promise(resolve => setTimeout(resolve, 150));

  if (!email) {
    return NextResponse.json({
      status: false,
      message: "Email is required"
    }, { status: 400 });
  }

  return NextResponse.json({
    status: true,
    message: "Password reset link sent to your email"
  });
}