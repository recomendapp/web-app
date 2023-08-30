'use client';

export default function FollowersCount({
  followersCount,
}: {
  followersCount: number;
}) {
  return <div>{followersCount} followers</div>;
}
