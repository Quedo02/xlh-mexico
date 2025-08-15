// NO "use client"
import { prisma } from "@/lib/prisma";

export async function getMediaBySlot(slot: string) {
  const s = await prisma.mediaSlot.findUnique({
    where: { slot },
    include: { media: true },
  });
  if (!s?.media) return null;
  return {
    url: s.media.url,
    alt: s.alt || s.media.alt || "",
    caption: s.caption || s.media.caption || "",
  };
}
