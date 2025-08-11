document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.createElement("div");
    overlay.id = "loadingOverlay";
    overlay.className = "loading-overlay hidden";
    overlay.innerHTML = `
        <div class="spinner"></div>
        <p>Loading...</p>
    `;
    document.body.appendChild(overlay);

    document.querySelectorAll("a[href]").forEach(link => {
        const href = link.getAttribute("href");

        // Ignore internal pages, anchors, or empty links
        if (
            !href ||
            href.startsWith("#") ||
            href.endsWith(".html") ||
            href.endsWith(".php") ||
            href.startsWith(window.location.origin) ||
            href.startsWith("./") ||
            href.startsWith("/")
        ) {
            return;
        }

        link.addEventListener("click", async e => {
            e.preventDefault();

            overlay.classList.remove("hidden");

            // Simulate network check (optional)
            let delay = 1000; // default 1 sec
            try {
                const start = performance.now();
                await fetch("https://via.placeholder.com/30", { cache: "no-store" });
                const end = performance.now();
                delay = Math.min(Math.max((end - start) * 2, 1000), 5000);
            } catch (err) {
                console.warn("Speed test failed — using default delay.");
            }

            setTimeout(() => {
                window.open(href, "_blank");
                overlay.classList.add("hidden");
            }, delay);
        });
    });
});