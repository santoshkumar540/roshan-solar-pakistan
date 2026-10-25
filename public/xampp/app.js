/**
 * Roshan Solar Pakistan - Vanilla JavaScript Application
 * Handles ROI Calculator, Quote Form Validation, WhatsApp Redirection, and FAQ Accordions.
 */

const WHATSAPP_NUMBER = '923001234567'; // Configurable company WhatsApp number

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initFaqAccordion();
  initQuoteForm();
  initProjectFilters();
});

// 1. Calculator Logic
function initCalculator() {
  const billRange = document.getElementById('calc-bill-range');
  const billDisplay = document.getElementById('calc-bill-display');
  const discoSelect = document.getElementById('calc-disco-select');
  const kwDisplay = document.getElementById('calc-kw-display');
  const savingsDisplay = document.getElementById('calc-savings-display');
  const paybackDisplay = document.getElementById('calc-payback-display');
  const unitsDisplay = document.getElementById('calc-units-display');
  const waBtn = document.getElementById('calc-wa-btn');

  if (!billRange) return;

  function recalculate() {
    const bill = parseInt(billRange.value, 10);
    billDisplay.textContent = 'Rs. ' + bill.toLocaleString();

    const tariff = parseInt(discoSelect.value, 10) || 64;
    const units = Math.round(bill / tariff);
    const recommendedKw = Math.max(3.0, Math.round((units / 125) * 2) / 2);
    const monthlyUnits = Math.round(recommendedKw * 128);
    const monthlySavings = Math.min(Math.round(bill * 0.90), Math.round(monthlyUnits * (tariff - 6)));
    const annualSavings = monthlySavings * 12;
    const estimatedCost = recommendedKw * 195000;
    const payback = (estimatedCost / annualSavings).toFixed(1);

    if (kwDisplay) kwDisplay.textContent = recommendedKw + ' kW';
    if (savingsDisplay) savingsDisplay.textContent = 'Rs. ' + monthlySavings.toLocaleString();
    if (paybackDisplay) paybackDisplay.textContent = '~' + payback + ' Years';
    if (unitsDisplay) unitsDisplay.textContent = monthlyUnits.toLocaleString() + ' kWh';

    if (waBtn) {
      const discoName = discoSelect.options[discoSelect.selectedIndex].text;
      const msg = `Hello Roshan Solar, I used your website calculator:\n\n` +
                  `• Monthly Bill: PKR ${bill.toLocaleString()}\n` +
                  `• DISCO: ${discoName}\n` +
                  `• Recommended Size: ${recommendedKw} kW\n` +
                  `• Est. Monthly Savings: PKR ${monthlySavings.toLocaleString()}\n` +
                  `• Est. Payback: ~${payback} Years\n\n` +
                  `Please provide a formal quote.`;
      waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    }
  }

  billRange.addEventListener('input', recalculate);
  discoSelect.addEventListener('change', recalculate);
  recalculate();
}

// 2. FAQ Accordion
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');
      
      // Close others
      document.querySelectorAll('.faq-item').forEach((f) => f.classList.remove('active'));
      
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });
}

// 3. Quote Form AJAX Validation & Submission
function initQuoteForm() {
  const form = document.getElementById('solar-quote-form');
  if (!form) return;

  const resultBox = document.getElementById('quote-result-box');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = form.querySelector('[name="fullName"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const city = form.querySelector('[name="city"]').value;
    const monthlyBill = parseInt(form.querySelector('[name="monthlyBill"]').value, 10);
    const disco = form.querySelector('[name="disco"]').value;
    const systemType = form.querySelector('[name="systemType"]').value;
    const propertyType = form.querySelector('[name="propertyType"]').value;
    const comments = form.querySelector('[name="comments"]').value.trim();

    // Front-end validation
    if (fullName.length < 3) {
      alert('Please enter your full name (minimum 3 characters).');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid Pakistani mobile number (e.g. 0300-1234567).');
      return;
    }

    if (!monthlyBill || monthlyBill < 5000) {
      alert('Please enter a valid average monthly electricity bill (min PKR 5,000).');
      return;
    }

    const payload = {
      fullName,
      phone,
      city,
      monthlyBill,
      disco,
      systemType,
      propertyType,
      comments
    };

    try {
      const res = await fetch('process-quote.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        if (resultBox) {
          resultBox.style.display = 'block';
          resultBox.innerHTML = `
            <div style="background:#064e3b; border:1px solid #10b981; padding:1.25rem; border-radius:0.5rem; margin-top:1rem;">
              <h4 style="color:#fff; font-weight:700; margin-bottom:0.5rem;">Feasibility Logged! Ref: ${data.referenceNo}</h4>
              <p style="font-size:0.875rem; color:#a7f3d0;">Thank you, ${fullName}. A technical solar engineer for ${city} will contact you shortly.</p>
              <div style="margin-top:1rem;">
                <a href="${data.whatsappUrl}" target="_blank" class="btn-primary" style="display:inline-block;">Send Directly via WhatsApp</a>
              </div>
            </div>
          `;
          form.reset();
        } else {
          window.location.href = data.whatsappUrl;
        }
      } else {
        alert(data.message || 'Validation error. Please verify input.');
      }
    } catch (err) {
      // In static demo mode if server PHP is unreachable, open direct WhatsApp!
      const directMsg = `Hello Roshan Solar, I submitted a quote request on your demo website:\n\n` +
                        `• Name: ${fullName}\n` +
                        `• Phone: ${phone}\n` +
                        `• City: ${city} (${disco})\n` +
                        `• Monthly Bill: PKR ${monthlyBill.toLocaleString()}\n` +
                        `• System: ${systemType}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(directMsg)}`, '_blank');
    }
  });
}

// 4. Project Category Filtering
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
