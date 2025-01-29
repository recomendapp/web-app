import { getProfile } from "@/features/server/users";

export default async function Stats(
  props: {
    params: Promise<{ username: string }>;
  }
) {
  const params = await props.params;
  const user = await getProfile(params.username);
  return <div>Des stats</div>;
}
