"use client";

export default function LogoutButton() {
  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/admin/login";
  };

  return (
    <button className="btn btn-outline-light mt-3 w-100" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}
