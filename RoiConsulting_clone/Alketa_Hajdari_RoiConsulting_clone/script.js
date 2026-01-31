  document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                company: document.getElementById('company').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            console.log('Form submitted:', formData);
            alert('Faleminderit! Aplikimi juaj u dërgua me sukses.');
            this.reset();
        });