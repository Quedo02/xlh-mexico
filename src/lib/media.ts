import { prisma } from "@/lib/prisma";

export async function getMediaBySlot(slot: string) {
  const s = await prisma.mediaSlot.findUnique({
    where: { slot },
    include: {
      slotMedias: {
        include: {
          media: true, 
        },
      },
    },
  });

  if (!s || !s.slotMedias.length) return null;

  // Toma el primer media (puedes ajustar si quieres varios)
  const m = s.slotMedias[0].media;

  return {
    url: m.url,
    alt: s.alt || m.alt || "",
    caption: s.caption || m.caption || "",
  };
}
