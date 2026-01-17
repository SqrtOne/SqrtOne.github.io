document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('nowYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});