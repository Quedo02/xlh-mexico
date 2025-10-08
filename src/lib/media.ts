import { prisma } from "@/lib/prisma";

export async function getMediaBySlot(slot: string) {
  const s = await prisma.mediaSlot.findUnique({
    where: { slot },
    include: { 
      slotMedias: {
        include: { media: true },
        orderBy: { orden: "asc" }, // opcional, si quieres el primero por orden
      },
    },
  });

  if (!s?.slotMedias?.length) return null;

  const media = s.slotMedias[0].media; // toma el primer media
  return {
    url: media.url,
    alt: s.alt || media.alt || "",
    caption: s.caption || media.caption || "",
  };
}
