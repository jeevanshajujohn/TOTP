document.getElementById('validate-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const code = document.getElementById('totp-input').value;
    fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `code=${encodeURIComponent(code)}`
    })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.className = `alert ${data.success ? 'alert-success' : 'alert-danger'} mt-3`;
            resultDiv.textContent = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            const resultDiv = document.getElementById('result');
            resultDiv.className = 'alert alert-danger mt-3';
            resultDiv.textContent = 'An error occurred';
        });
});