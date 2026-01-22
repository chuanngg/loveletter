document.addEventListener('DOMContentLoaded', () => {

    // index.html script
    const correctUsername = 'yunhui'; // Replace with the actual correct username
    const correctPassword = 'cutegirl'; // Replace with the actual correct password
    // Sign-in functionality
    if (document.getElementById('sign-in-btn')) {
        document.getElementById('sign-in-btn').addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === correctUsername && password === correctPassword) {
                window.location.href = 'quiz.html';
            } else {
                alert('手滑了，不是密码的错');
            }
        });
    }

    // petition.html script
    const signatureCanvas = document.getElementById('signature-canvas');
    if (signatureCanvas) {
        const signaturePad = new SignaturePad(signatureCanvas);

        document.getElementById('clear-btn').addEventListener('click', () => {
            signaturePad.clear();
        });

        document.getElementById('confirm-btn').addEventListener('click', () => {
            if (signaturePad.isEmpty()) {
                alert('Please provide a signature first.');
            } else {
                const dataURL = signaturePad.toDataURL();
                // Here you can send the dataURL to the server or handle it as needed
                window.location.href = 'closing.html';
            }
        });
    }

    // quiz.html script
    const cards = document.querySelectorAll('.card');
    let currentCardIndex = 0;

    function handleYesButton() {
        const currentCard = cards[currentCardIndex];
        currentCard.style.opacity = '0'; // Hide current card
        currentCard.style.zIndex = -1; // Move current card to back

        if (currentCardIndex < cards.length - 1) {
            currentCardIndex++;
            const nextCard = cards[currentCardIndex];
            nextCard.style.opacity = '1';
            nextCard.style.zIndex = 10;
        } else {
            window.location.href = 'letter.html';
        }
    }

    function handleNoButton(event) {
        const button = event.target;
        const buttonContainer = button.parentElement;
        const container = buttonContainer.parentElement;
        const containerRect = container.getBoundingClientRect();
        const margin = 30; // Margin from the edges of the container

        const newX = margin + Math.random() * (containerRect.width - button.offsetWidth - 2 * margin);
        const newY = margin + Math.random() * (containerRect.height - button.offsetHeight - 2 * margin);

        button.style.position = 'absolute';
        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
    }

    document.querySelectorAll('.yes-btn').forEach(button => {
        button.addEventListener('click', handleYesButton);
    });

    document.querySelectorAll('.no-btn').forEach(button => {
        button.addEventListener('click', handleNoButton);
    });

    // Initialize the first card as visible
    if (cards.length > 0) {
        cards[currentCardIndex].style.opacity = '1';
        cards[currentCardIndex].style.zIndex = 10;
    }



    // Finalize Petition
    function finalizeDocument() {
        alert("Button clicked!"); // Debugging step
    
        const inputs = document.querySelectorAll('#nama, #ttl, #umur, #jenis-kelamin, #pendidikan, #status-perkawinan, #agama, #alamat, #signature');
    
        inputs.forEach(input => {
            input.setAttribute('readonly', true);
            input.classList.add('finalized');
        });
    
        document.querySelector('.finalize-btn').disabled = true;
        document.querySelector('.finalize-btn').textContent = "Finalized";
    }
});