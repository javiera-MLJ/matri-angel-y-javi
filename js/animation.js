document.addEventListener("DOMContentLoaded", function () {
    // === ANIMACIONES FADE-IN ===
    const faders = document.querySelectorAll(".fade-in");

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Dejar de observar después de la animación
            }
        });
    }, { threshold: 0.2 });

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    // === FORMULARIO DE CANCIONES ===
    const songForm = document.getElementById('song-form');
    const songSuccessMessage = document.getElementById('song-success-message');

    if (songForm) {
        songForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(songForm);

            fetch(songForm.action, {
                method: songForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    songSuccessMessage.style.display = 'block';
                    songForm.reset();
                    setTimeout(() => songSuccessMessage.style.display = 'none', 5000);
                } else {
                    alert("Hubo un error al enviar el formulario de canciones. Inténtalo de nuevo.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al enviar el formulario de canciones.");
            });
        });
    }


    // === FORMULARIO RSVP ===
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpSuccessMessage = document.getElementById('rsvp-success-message');
    const rsvpErrorMessage = document.getElementById('rsvp-error-message');
    const rsvpSubmitButton = rsvpForm ? rsvpForm.querySelector('button[type="submit"]') : null;

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Mostrar estado de carga
            if (rsvpSubmitButton) {
                rsvpSubmitButton.textContent = "Enviando...";
                rsvpSubmitButton.disabled = true;
            }

            const formData = new FormData(rsvpForm);

            fetch(rsvpForm.action, {
                method: rsvpForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    rsvpSuccessMessage.style.display = 'block';
                    rsvpErrorMessage.style.display = 'none';
                    rsvpForm.reset();
                    setTimeout(() => rsvpSuccessMessage.style.display = 'none', 5000);
                } else {
                    throw new Error('Error en respuesta');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                rsvpErrorMessage.style.display = 'block';
                rsvpSuccessMessage.style.display = 'none';
            })
            .finally(() => {
                if (rsvpSubmitButton) {
                    rsvpSubmitButton.textContent = "Enviar Confirmación";
                    rsvpSubmitButton.disabled = false;
                }
            });
        });
    }
});
