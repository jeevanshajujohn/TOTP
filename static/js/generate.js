function updateTOTP() {
    fetch('/api/generate')
        .then(response => response.json())
        .then(data => {
            document.getElementById('totp-code').textContent = data.code;
            document.getElementById('time-left').textContent = data.time_left;
            // Start countdown
            let timeLeft = data.time_left;
            const countdown = setInterval(() => {
                timeLeft--;
                document.getElementById('time-left').textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    updateTOTP(); // Fetch new code
                }
            }, 1000);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('totp-code').textContent = 'Error';
        });
}

// Initial call
updateTOTP();