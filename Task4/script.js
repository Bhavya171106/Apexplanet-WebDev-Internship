document.addEventListener('DOMContentLoaded', () => {
    const alertButton = document.getElementById('alert-button');
    if (alertButton) {
        alertButton.addEventListener('click', () => {
            alert('Fact: JavaScript was created in 10 days by Brendan Eich!');
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            console.log('--- Form Submission Data Logged ---');
            alert(`Thank you, ${name}! Your message has been "sent".`);
            contactForm.reset();
        });
    }

    const projectButtons = document.querySelectorAll('.project-button');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.project-card');
            const url = card.getAttribute('data-url');
            
            if (url) {
                window.open(url, '_blank');
            } else {
                console.error("Project URL not found for this card.");
            }
        });
    });
});