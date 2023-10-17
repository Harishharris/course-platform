"use client";

// import { UploadButton } from "@/lib/uploadthing";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <h1>Hello</h1>
    </div>
  );
}
