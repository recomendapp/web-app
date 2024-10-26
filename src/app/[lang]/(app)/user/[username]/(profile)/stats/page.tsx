import { getProfile } from "../../_components/getProfile";

export default async function Stats({
  params,
}: {
  params: { username: string };
}) {
  const user = await getProfile(params.username);
  return <div>Des stats</div>;
}
