"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <button className="btn btn-outline-light mt-3 w-100" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}
