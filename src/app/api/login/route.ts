import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { user_id, password } = await req.json();
    
    if (user_id === 'admin' && password === 'demo123') {
        return NextResponse.json({ ok: true }, { status: 200 });
    }
    return NextResponse.json({ error: "Invalid Credentials "}, { status: 200 });
}