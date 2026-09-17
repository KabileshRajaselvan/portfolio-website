"use client";

import { useEffect, useState } from "react";

type Stats = {
  public_repos: number;
  followers: number;
};

export default function GithubStats({ username }: { username: string }) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) {
          setStats({
            public_repos: data.public_repos,
            followers: data.followers,
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [username]);

  if (!stats) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
      <p className="flex items-baseline gap-2">
        <span className="text-2xl font-black text-strong">
          {stats.public_repos}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-graphite-500">
          Public Repos
        </span>
      </p>
      <p className="flex items-baseline gap-2">
        <span className="text-2xl font-black text-strong">
          {stats.followers}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-graphite-500">
          Followers
        </span>
      </p>
    </div>
  );
}
