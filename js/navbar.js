document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("#shared-navbar");
    if (!header) return;

    const links = [
        { text: "Workshops", href: "workshop-list.html" },
        { text: "Reservations", href: "reservation.html" }
    ];

    const wrapper = document.createElement("div");
    wrapper.className = "container dflex ai-c gap-24";

    const logoWrapper = document.createElement("div");
    const logoLink = document.createElement("a");
    logoLink.href = "workshop-list.html";

    const logo = document.createElement("img");
    logo.className = "logo";
    logo.src = "../assets/images/logo-festiwind.svg";
    logo.alt = "Return to workshops page";

    logoLink.append(logo);
    logoWrapper.append(logoLink);

    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Main navigation");

    const ul = document.createElement("ul");

    links.forEach(link => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = link.href;
        a.className = "color-w nav-btn";

        const currentPage = window.location.pathname.split("/").pop();

        const activePage = [
            "workshop-details.html",
            "add-workshop.html"
        ].includes(currentPage)
            ? "workshop-list.html"
            : currentPage;

        if (activePage === link.href) {
            a.classList.add("active");
            a.setAttribute("aria-current", "page");
        }

        a.textContent = link.text;

        li.append(a);
        ul.append(li);
    });

    nav.append(ul);

    const logout = document.createElement("div");
    logout.className = "logout";

    const logoutButton = document.createElement("button");
    logoutButton.type = "button";
    logoutButton.id = "logout-btn";
    logoutButton.setAttribute("aria-label", "Logout");

    const logoutImage = document.createElement("img");
    logoutImage.className = "logo-logout";
    logoutImage.src = "../assets/images/logo-logout.svg";
    logoutImage.alt = "Logout";

    logoutButton.append(logoutImage);
    logout.append(logoutButton);

    wrapper.append(logoWrapper, nav, logout);
    header.append(wrapper);

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "../index.html";
    });
});
