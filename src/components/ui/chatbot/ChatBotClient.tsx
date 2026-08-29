"use client";

import dynamic from "next/dynamic";

export const ChatBot = dynamic(
  () => import("./ChatBot").then((m) => m.ChatBot),
  { ssr: false }
);
