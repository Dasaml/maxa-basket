// --- MOBILNÍ NAVIGACE ---
const menu = document.querySelector(".maxa-nav-wrap");
const hamburger = document.querySelector(".maxa-hamburger-btn");
const menuItems = document.querySelectorAll(".maxa-nav-link");

if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("showMenu");
        hamburger.classList.toggle("is-active");
    });
    
    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            if (window.innerWidth < 992) {
                menu.classList.remove("showMenu");
                hamburger.classList.remove("is-active");
            }
        });
    });
}


// --- FORMULÁŘ REGISTRACE TIKETU ---
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".play-form");

    if (!form) return;

    const ticketInput = form.querySelector('input[name="ticket_number"]');
    const consentInput = form.querySelector('input[name="consent"]');
    const submitButton = form.querySelector('button[type="submit"]');

    const message = document.createElement("div");
    message.className = "form-message";
    form.appendChild(message);

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        message.textContent = "";
        message.className = "form-message";

        // Kontrola souhlasu
        if (!consentInput.checked) {
            message.textContent = "Pro odeslání formuláře musíte souhlasit se zpracováním osobních údajů a pravidly soutěže.";
            message.classList.add("error");
            return;
        }

        // Kontrola čísla tiketu
        if (!ticketInput.value.trim()) {
            message.textContent = "Zadejte prosím číslo tiketu.";
            message.classList.add("error");
            ticketInput.focus();
            return;
        }

        // Zablokování tlačítka během odesílání
        submitButton.disabled = true;
        submitButton.textContent = "ODESÍLÁNÍ...";

        const formData = new FormData(form);

        fetch(form.action || window.location.href, {
            method: "POST",
            body: formData
        })
        .then((response) => {

            if (!response.ok) {
                throw new Error("Odeslání formuláře se nepodařilo.");
            }

            return response.text();
        })
        .then(() => {

            message.textContent = "Formulář byl úspěšně odeslán.";
            message.classList.add("success");

            form.reset();

            submitButton.disabled = false;
            submitButton.textContent = "ZAREGISTROVAT TIKET";

        })
        .catch(() => {

            message.textContent = "Formulář se nepodařilo odeslat. Zkuste to prosím později.";
            message.classList.add("error");

            submitButton.disabled = false;
            submitButton.textContent = "ZAREGISTROVAT TIKET";

        });

    });

});
