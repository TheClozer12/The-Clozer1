document.addEventListener('DOMContentLoaded', () => {
    const analyzeButton = document.getElementById('analyze-button');
    const businessIdeaTextarea = document.getElementById('business-idea');
    const analysisResultDiv = document.getElementById('analysis-result');
    const themeToggle = document.getElementById('theme-toggle');

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    analyzeButton.addEventListener('click', () => {
        const businessIdea = businessIdeaTextarea.value.trim();

        if (businessIdea === '') {
            analysisResultDiv.innerHTML = '<p style="color: red;">Please enter a business idea.</p>';
            return;
        }

        // Simulate analysis
        analysisResultDiv.innerHTML = '<p>Analyzing your idea...</p>';
        setTimeout(() => {
            const analysis = generateAnalysis(businessIdea);
            analysisResultDiv.innerHTML = analysis;
        }, 2000);
    });

    function generateAnalysis(idea) {
        // This is a mock analysis. In a real application, you would use a more sophisticated method.
        const keywords = ['sustainable', 'tech', 'health', 'education', 'remote'];
        let score = 0;
        let feedback = '<h3>Analysis Results:</h3>';

        keywords.forEach(keyword => {
            if (idea.toLowerCase().includes(keyword)) {
                score++;
                feedback += `<p>✓ Your idea includes the keyword: <strong>${keyword}</strong></p>`;
            }
        });

        if (score >= 3) {
            feedback += '<p style="color: green; font-weight: bold;">High potential! Your idea aligns with several key trends.</p>';
        } else if (score >= 1) {
            feedback += '<p style="color: orange; font-weight: bold;">Medium potential. Your idea has some promising aspects.</p>';
        } else {
            feedback += '<p style="color: red; font-weight: bold;">Low potential. Consider exploring current market trends.</p>';
        }

        return feedback;
    }
});