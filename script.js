// Function to handle the reveal animation on scroll
function handleScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 120; // How many pixels are visible before triggering

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    } else {
      // reveal.classList.remove('active'); // Keep active to only animation once
    }
  });
}

// Attach scroll event listener
window.addEventListener('scroll', handleScrollReveal);

// Run initial check (in case some elements are already visible)
window.addEventListener('load', handleScrollReveal);