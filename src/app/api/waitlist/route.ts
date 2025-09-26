import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClientWithToken } from "~/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { projectIdea, prompt, userName, fid } = await request.json();

    if (!projectIdea || !prompt || !userName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (projectIdea.length > 50) {
      return NextResponse.json(
        { success: false, error: "Project idea must be 50 characters or less" },
        { status: 400 }
      );
    }

    // Fetch JWT token from backend
    const jwtResponse = await fetch(new URL("/api/get-jwt", request.url));
    if (!jwtResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch JWT token" },
        { status: 400 }
      );
    }
    const { token } = await jwtResponse.json();
    const supabase = createSupabaseClientWithToken(token);

    // Use key-value store pattern with Supabase
    const tableName = `waitlist-${process.env.NEXT_PUBLIC_VIBES_ENGINEERING_PROJECT_ID}`;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from(tableName)
      .select("*")
      .eq("user_name", userName)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "You are already on the waitlist" },
        { status: 400 }
      );
    }

    // Insert new waitlist entry
    const { data, error } = await supabase
      .from(tableName)
      .insert({
        user_name: userName,
        fid: fid,
        project_idea: projectIdea,
        prompt: prompt,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Fetch JWT token from backend
    const jwtResponse = await fetch(new URL("/api/get-jwt", request.url));
    if (!jwtResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch JWT token" },
        { status: 400 }
      );
    }
    const { token } = await jwtResponse.json();
    const supabase = createSupabaseClientWithToken(token);

    const tableName = `waitlist-${process.env.NEXT_PUBLIC_VIBES_ENGINEERING_PROJECT_ID}`;

    // Get count of waitlist entries
    const { count, error } = await supabase
      .from(tableName)
      .select("*", { count: "exact", head: true });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      count: count || 0
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}