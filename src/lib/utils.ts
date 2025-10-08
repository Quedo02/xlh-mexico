export function getFotoUrl(foto: string | null) {
  if (!foto) return "/img/default.jpg"; // fallback si no hay foto
  if (foto.startsWith("/img/") || foto.startsWith("/uploads/") || foto.startsWith("http")) {
    return foto;
  }
  // Por defecto, las fotos "nuevas" que no tengan prefijo van a /uploads/
  return `/uploads/${foto}`;
}
