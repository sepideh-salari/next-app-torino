"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGetUserData } from "src/core/services/queries";

function AuthProvider({ children }) {
  const router = useRouter();
  const { isPending, data } = useGetUserData();

  useEffect(() => {
    if (!isPending && !data?.data) router.push("/");
  }, [isPending]);

  if (isPending) return <p>Loading...</p>;

  return children;
}

export default AuthProvider;
