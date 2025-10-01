import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseClient();
  const project_id = process.env.NEXT_PUBLIC_VIBES_ENGINEERING_PROJECT_ID!;
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

    // Get existing waitlist array
    const { data: existingData } = await supabase
      .from("kv_store")
      .select("value")
      .eq("project_id", project_id)
      .eq("key", "waitlist")
      .maybeSingle();

    const waitlist = existingData?.value || [];

    // Check if user already exists
    if (waitlist.some((entry: any) => entry.userName === userName)) {
      return NextResponse.json(
        { success: false, error: "You are already on the waitlist" },
        { status: 400 }
      );
    }

    // Add new entry
    const newEntry = {
      userName,
      fid,
      projectIdea,
      prompt,
      createdAt: new Date().toISOString()
    };

    waitlist.push(newEntry);

    // Update the waitlist
    const { error } = await supabase
      .from("kv_store")
      .upsert({
        project_id,
        key: "waitlist",
        value: waitlist
      }, {
        onConflict: 'project_id,key'
      });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: newEntry
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const supabase = getSupabaseClient();
  const project_id = process.env.NEXT_PUBLIC_VIBES_ENGINEERING_PROJECT_ID!;

  try {
    // Get waitlist array
    const { data } = await supabase
      .from("kv_store")
      .select("value")
      .eq("project_id", project_id)
      .eq("key", "waitlist")
      .maybeSingle();

    const waitlist = data?.value || [];

    // Check if this is a request to check for a specific user
    const userName = request.nextUrl.searchParams.get("userName");
    if (userName) {
      const existingEntry = waitlist.find((entry: any) => entry.userName === userName);
      if (existingEntry) {
        return NextResponse.json({
          success: true,
          exists: true,
          projectIdea: existingEntry.projectIdea
        });
      }
      return NextResponse.json({
        success: true,
        exists: false
      });
    }

    // Default: return count
    return NextResponse.json({
      success: true,
      count: Array.isArray(waitlist) ? waitlist.length : 0
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}