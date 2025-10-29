document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('booking-service-overlay');
  const form = document.getElementById('booking-service-form');
  const submitBtn = document.getElementById('bs-submit');
  const gdpr = document.getElementById('bs-gdpr');
  const confirmOverlay = document.getElementById('booking-service-confirm');
  const confirmYes = document.getElementById('bs-confirm-yes');
  const confirmNo = document.getElementById('bs-confirm-no');
  const gdprLink = document.getElementById('bs-gdpr-link');
  const gdprInfoOverlay = document.getElementById('booking-service-gdpr-info');
  const gdprInfoClose = document.querySelector('.booking-service-gdpr-info-close');

document.querySelectorAll('.dropdown-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    const isOpen = target.classList.toggle('open');
    btn.classList.toggle('active', isOpen);
  });
});


gdprLink.addEventListener('click', e => {
  e.preventDefault(); // hindrar default länkbeteendet
  gdprInfoOverlay.style.display = 'block';
});

gdprInfoClose.addEventListener('click', () => {
  gdprInfoOverlay.style.display = 'none';
});

// Optional: klick utanför popup stänger den
gdprInfoOverlay.addEventListener('click', e => {
  if (e.target === gdprInfoOverlay) {
    gdprInfoOverlay.style.display = 'none';
  }
});

  // --- Öppna popup ---
document.querySelectorAll('#bokaLinkSidebar, #bokaLinkNav').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    overlay.style.display = 'block';

    // Koppla validate-events när popupen öppnas
    const textFields = form.querySelectorAll('#bs-name, #bs-phone, #bs-email, #bs-description, #bs-reg');
    textFields.forEach(input => input.addEventListener('input', validate));

    const services = form.querySelectorAll('input[name="service"]');
    services.forEach(cb => cb.addEventListener('change', validate));

    gdpr.addEventListener('change', validate);

    // Kör validate direkt för att uppdatera knapp-status
    validate();
  });
});

  // --- Stäng popup med kryss ---
document.querySelector('.booking-service-close').addEventListener('click', () => {
  // Visa confirm-popup istället för att stänga direkt
  confirmOverlay.style.display = 'block';
  overlay.classList.add('blurred');
});

  // --- Initiera EmailJS ---
  emailjs.init('66lQFUU5otsfLEaYz');

  // --- Validering ---
  function validate() {
    const name = form.user_name.value.trim();
    const phone = form.user_phone.value.trim();
    const email = form.user_email.value.trim();
    const reg = form.user_reg.value.trim();
    const desc = form.user_message.value.trim();
    const gdprChecked = gdpr.checked;
    const servicesChecked = Array.from(form.querySelectorAll('input[name="service"]:checked'));

    const filled = name && phone && email && reg;
    const descValid = desc.split(' ').filter(Boolean).length >= 2;
    const serviceValid = servicesChecked.length > 0;

    const allGood = filled && gdprChecked && (descValid || serviceValid);


    submitBtn.disabled = !allGood;
    submitBtn.classList.toggle('enabled', allGood);
  }

  // --- Event listeners för validering ---
  const textFields = form.querySelectorAll('#bs-name, #bs-phone, #bs-email, #bs-description, #bs-reg');
  textFields.forEach(input => input.addEventListener('input', validate));

  const services = form.querySelectorAll('input[name="service"]');
  services.forEach(cb => cb.addEventListener('change', validate));

  gdpr.addEventListener('change', validate);

  // --- Submit EmailJS ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const serviceList = Array.from(form.querySelectorAll('input[name="service"]:checked'))
                             .map(cb => cb.value)
                             .join(', ');
        
    const extrasList = Array.from(form.querySelectorAll('input[name="extra"]:checked'))
                         .map(cb => cb.value)
                         .join(', ');

    const formData = {
      user_name: form.user_name.value,
      user_phone: form.user_phone.value,
      user_email: form.user_email.value,
      user_reg: form.user_reg.value,
      user_message: form.user_message.value,
      services: serviceList || 'Ingen tjänst vald',
      extra: extrasList || 'Inga extra tillägg',
      gdpr_approved: gdpr.checked ? 'Ja' : 'Nej'
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Skickar...';

    try {
      await emailjs.send('service_nvoy15b', 'template_4wa6osr', formData);
      alert('✅ Din serviceförfrågan har skickats!');
      form.reset();
      submitBtn.textContent = 'Skicka';
      submitBtn.disabled = true;
      overlay.style.display = 'none';
    } catch (err) {
      console.error(err);
      alert('❌ Kunde inte skicka formuläret. Försök igen senare.');
      submitBtn.textContent = 'Skicka';
      submitBtn.disabled = false;
    }
  });

  // --- Confirm-close popup ---
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      confirmOverlay.style.display = 'block';
      overlay.classList.add('blurred');
    }
  });

  confirmOverlay.querySelector('.booking-service-confirm-popup').addEventListener('click', e => {
    e.stopPropagation();
  });

  confirmNo.addEventListener('click', () => {
    confirmOverlay.style.display = 'none';
    overlay.classList.remove('blurred');
  });

  confirmYes.addEventListener('click', () => {
    confirmOverlay.style.display = 'none';
    overlay.style.display = 'none';
    form.reset();
    submitBtn.disabled = true;
    submitBtn.classList.remove('enabled');
    // **Rensa dropdowns**
    const dropdowns = form.querySelectorAll('.dropdown-content');
    dropdowns.forEach(d => d.classList.remove('open'));
    const dropdownButtons = form.querySelectorAll('.dropdown-toggle');
    dropdownButtons.forEach(b => b.classList.remove('active'));
    
    overlay.classList.remove('blurred');
  });
});
