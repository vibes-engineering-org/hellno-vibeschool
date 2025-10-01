import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export const kv = {
  get: async (key: string): Promise<any> => {
    const supabase = getSupabaseClient();
    const project_id = process.env.NEXT_PUBLIC_VIBES_ENGINEERING_PROJECT_ID!;
    const { data } = await supabase
      .from("kv_store")
      .select("value")
      .eq("project_id", project_id)
      .eq("key", key)
      .maybeSingle();
    return data?.value ?? null;
  },

  set: async (key: string, value: any): Promise<void> => {
    const supabase = getSupabaseClient();
    const project_id = process.env.NEXT_PUBLIC_VIBES_ENGINEERING_PROJECT_ID!;
    const { error } = await supabase
      .from("kv_store")
      .upsert({
        project_id,
        key,
        value,
      }, {
        onConflict: 'project_id,key'
      });
    if (error) throw error;
  },

  incr: async (key: string, delta = 1): Promise<number> => {
    const supabase = getSupabaseClient();
    const project_id = process.env.NEXT_PUBLIC_VIBES_ENGINEERING_PROJECT_ID!;
    // Read current value
    const { data } = await supabase
      .from("kv_store")
      .select("value")
      .eq("project_id", project_id)
      .eq("key", key)
      .maybeSingle();

    const current = typeof data?.value === "number" ? data.value : 0;
    const newValue = current + delta;

    // Write new value
    await supabase
      .from("kv_store")
      .upsert({
        project_id,
        key,
        value: newValue,
      }, {
        onConflict: 'project_id,key'
      });

    return newValue;
  },

  append: async (key: string, elem: any): Promise<any> => {
    const supabase = getSupabaseClient();
    const project_id = process.env.NEXT_PUBLIC_VIBES_ENGINEERING_PROJECT_ID!;
    // Read current array
    const { data } = await supabase
      .from("kv_store")
      .select("value")
      .eq("project_id", project_id)
      .eq("key", key)
      .maybeSingle();

    const current = Array.isArray(data?.value) ? data.value : [];
    current.push(elem);

    // Write updated array
    await supabase
      .from("kv_store")
      .upsert({
        project_id,
        key,
        value: current,
      }, {
        onConflict: 'project_id,key'
      });

    return current;
  },

  merge: async (key: string, patch: object): Promise<any> => {
    const supabase = getSupabaseClient();
    const project_id = process.env.NEXT_PUBLIC_VIBES_ENGINEERING_PROJECT_ID!;
    // Read current object
    const { data } = await supabase
      .from("kv_store")
      .select("value")
      .eq("project_id", project_id)
      .eq("key", key)
      .maybeSingle();

    const current =
      typeof data?.value === "object" && !Array.isArray(data.value)
        ? data.value
        : {};
    const merged = { ...current, ...patch };

    // Write merged object
    await supabase
      .from("kv_store")
      .upsert({
        project_id,
        key,
        value: merged,
      }, {
        onConflict: 'project_id,key'
      });

    return merged;
  },
};
