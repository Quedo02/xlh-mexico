import { getMediaBySlot } from "@/lib/media";
import NosotrosClient from "./NosotrosClient";

export default async function Nosotros() {
  const hero     = await getMediaBySlot("nosotros.hero");
  const historia = await getMediaBySlot("nosotros.historia");
  const eq1      = await getMediaBySlot("nosotros.equipo.1");
  const eq2      = await getMediaBySlot("nosotros.equipo.2");
  const eq3      = await getMediaBySlot("nosotros.equipo.3");

  return (
    <NosotrosClient hero={hero} historia={historia} eq1={eq1} eq2={eq2} eq3={eq3} />
  );
}
