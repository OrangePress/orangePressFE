fetch("/layout/navbar.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("sidebar-container").innerHTML = html;

    // =============================
    // TOKEN & ROLE
    // =============================
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/auth/login.html";
      return;
    }

    const decoded = decodeToken(token);

    if (!decoded || !decoded.role) {
      localStorage.clear();
      window.location.href = "/auth/login.html";
      return;
    }

    const role = decoded.role;
    console.log("ROLE USER:", role);
    console.log(decoded.fullname);

    // =============================
    // FILTER MENU BERDASARKAN ROLE
    // =============================
    document.getElementById("menu-admin").style.display = "none";
    document.getElementById("menu-penulis").style.display = "none";
    document.getElementById("menu-reviewer").style.display = "none";
    document.getElementById("fullname").innerText = decoded.fullname || "User";

    if (role === "admin") {
      document.getElementById("menu-admin").style.display = "block";
    } else if (role === "penulis") {
      document.getElementById("menu-penulis").style.display = "block";
    } else if (role === "reviewer") {
      document.getElementById("menu-reviewer").style.display = "block";
    }

    // =============================
    // AKTIFKAN MENU
    // =============================
    const currentPath = window.location.pathname;
    console.log(currentPath);
    

    document.querySelectorAll(".menu-item").forEach((item) => {
      const targetPath = item.dataset.href;
      // Hanya proses item yang memiliki data-href (abaikan logout)
      if (targetPath && currentPath === targetPath) {
        item.classList.add("active");
      }
    });
  });

// =============================
// DECODE JWT
// =============================
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "/auth/login.html";
}
