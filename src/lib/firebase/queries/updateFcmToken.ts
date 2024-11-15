"use server";

import { supabaseAdmin } from "@/lib/supabase/supabase-admin";

export const updateFcmToken = async (userId: string, token: string) => {
	const { error } = await supabaseAdmin
		.from("user_notification_tokens")
		.upsert({
			user_id: userId,
			token: token,
			device_type: "web",
			provider: "fcm",
			updated_at: new Date().toISOString(),
		}, {
			onConflict: "user_id, provider, device_type, token",
		});
	if (error) throw error;
}
