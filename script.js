
const portfolioForm = document.getElementById("portfolioForm");

// Save information from Create page
if (portfolioForm) {
    portfolioForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newItem = {
            id: Date.now().toString() + Math.random().toString(36).slice(2),
            title: document.getElementById("title").value.trim(),
            description: document.getElementById("description").value.trim(),
            skills: document.getElementById("skills").value.trim()
        };

        const items = JSON.parse(
            localStorage.getItem("portfolioItems") || "[]"
        );

        items.push(newItem);

        localStorage.setItem("portfolioItems", JSON.stringify(items));

        window.location.href = "index.html";
    });
}

// Display information and Delete buttons on Home page
const displayInfo = document.getElementById("displayInfo");

function renderItems() {
    if (!displayInfo) return;

    displayInfo.replaceChildren();

    const items = JSON.parse(
        localStorage.getItem("portfolioItems") || "[]"
    );

    items.forEach(function (item) {
        const card = document.createElement("div");
        card.className = "info-card";

        const heading = document.createElement("h2");
        heading.textContent = item.title;

        const description = document.createElement("p");
        description.textContent = item.description;

        const skills = document.createElement("p");
        skills.textContent = "Skills: " + item.skills;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            const confirmed = confirm(
                "Are you sure you want to delete this information?"
            );

            if (!confirmed) return;

            const updatedItems = JSON.parse(
                localStorage.getItem("portfolioItems") || "[]"
            ).filter(function (savedItem) {
                return savedItem.id !== item.id;
            });

            localStorage.setItem(
                "portfolioItems",
                JSON.stringify(updatedItems)
            );

            renderItems();
        });

        card.append(heading, description, skills, deleteBtn);
        displayInfo.appendChild(card);
    });
}

renderItems();

