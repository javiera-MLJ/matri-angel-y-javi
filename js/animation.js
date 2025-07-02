document.addEventListener("DOMContentLoaded", function () {

    // === ANIMACIONES FADE-IN ===
    const faders = document.querySelectorAll(".fade-in");

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // main.js

document.addEventListener("DOMContentLoaded", function () {
    // === ANIMACIONES FADE-IN ===
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    // === FORMULARIO DE CANCIONES ===
    const form = document.getElementById('song-form');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    successMessage.style.display = 'block';
                    form.reset();
                    setTimeout(() => successMessage.style.display = 'none', 5000);
                } else {
                    alert("Hubo un error al enviar el formulario. Inténtalo de nuevo.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al enviar el formulario.");
            });
        });
    }
});


    // === FORMULARIO RSVP ===
    const form = document.getElementById('rsvp-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitButton = form.querySelector('button[type="submit"]');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Mostrar estado de carga
            submitButton.textContent = "Enviando...";
            submitButton.disabled = true;

            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    form.reset();
                    setTimeout(() => successMessage.style.display = 'none', 5000);
                } else {
                    throw new Error('Error en respuesta');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            })
            .finally(() => {
                submitButton.textContent = "Enviar Confirmación";
                submitButton.disabled = false;
            });
        });
    }

});