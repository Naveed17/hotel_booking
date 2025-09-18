import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get('email');
  const name = formData.get('name');

  await new Promise(resolve => setTimeout(resolve, 100));

  if (!email) {
    return NextResponse.json({
      status: false,
      message: "Email is required"
    }, { status: 400 });
  }

  return NextResponse.json({
    status: true,
    message: "Successfully subscribed to newsletter",
    data: { email, name }
  });
}