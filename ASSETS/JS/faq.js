document.addEventListener('DOMContentLoaded', function () {
    // Toggle FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current
            if (!isActive) {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    const searchInput = document.querySelector('input[placeholder="Search for questions..."]');

    // FAQ Category Filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedCategory = this.dataset.category;

            // Update button styles
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-[#C68642]', 'text-white');
                btn.classList.add('bg-white', 'text-[#1E1E1E]', 'hover:bg-[#C68642]', 'hover:text-white');
            });
            this.classList.add('bg-[#C68642]', 'text-white');
            this.classList.remove('bg-white', 'text-[#1E1E1E]', 'hover:bg-[#C68642]', 'hover:text-white');

            // Filter FAQ items by category
            faqItems.forEach(item => {
                const itemCategory = item.dataset.category;
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Search Functionality
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();

            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3')?.textContent.toLowerCase() || '';
                const answer = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
                item.style.display = (question.includes(searchTerm) || answer.includes(searchTerm)) ? 'block' : 'none';
            });
        });
    }
});
