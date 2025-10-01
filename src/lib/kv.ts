import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const project_id = process.env.NEXT_PUBLIC_VIBES_ENGINEERING_PROJECT_ID!;

export const kv = {
  get: async (key: string): Promise<any> => {
    const { data } = await supabase
      .from("kv_store")
      .select("value")
      .eq("project_id", project_id)
      .eq("key", key)
      .maybeSingle();
    return data?.value ?? null;
  },

  set: async (key: string, value: any): Promise<void> => {
    const { error } = await supabase
      .from("kv_store")
      .upsert({
        project_id,
        key,
        value,
      });
    if (error) throw error;
  },

  incr: async (key: string, delta = 1): Promise<number> => {
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
      });

    return newValue;
  },

  append: async (key: string, elem: any): Promise<any> => {
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
      });

    return current;
  },

  merge: async (key: string, patch: object): Promise<any> => {
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
      });

    return merged;
  },
};
