document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. SISTEMA DE CHECKLIST (LIDO / NÃO LIDO) COM LOCALSTORAGE
    // -------------------------------------------------------------
    const readBooks = JSON.parse(localStorage.getItem('tolkien_read_books')) || [];
    const cards = document.querySelectorAll('.card[data-book-id]');

    cards.forEach(card => {
        const bookId = card.dataset.bookId;
        const button = card.querySelector('.read-btn');

        if (!button) return;

        if (readBooks.includes(bookId)) {
            card.classList.add('is-read');
            button.textContent = '✓ Lido';
        }

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const isAlreadyRead = card.classList.contains('is-read');

            if (isAlreadyRead) {
                card.classList.remove('is-read');
                button.textContent = 'Marcar como lido';
                const index = readBooks.indexOf(bookId);
                if (index > -1) readBooks.splice(index, 1);
            } else {
                card.classList.add('is-read');
                button.textContent = '✓ Lido';
                readBooks.push(bookId);
            }

            localStorage.setItem('tolkien_read_books', JSON.stringify(readBooks));
        });
    });

    // -------------------------------------------------------------
    // 2. SISTEMA DE FILTRO POR ERAS DA TERRA-MÉDIA
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const stages = document.querySelectorAll('.stage');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Alterna o botão ativo
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.dataset.filter;

            // Filtra os cards
            cards.forEach(card => {
                const cardEra = card.dataset.era;
                if (filterValue === 'all' || cardEra === filterValue) {
                    card.classList.remove('is-hidden');
                } else {
                    card.classList.add('is-hidden');
                }
            });

            // Oculta a seção inteira se todos os seus cards estiverem escondidos
            stages.forEach(stage => {
                const visibleCards = stage.querySelectorAll('.card:not(.is-hidden)');
                if (visibleCards.length === 0) {
                    stage.classList.add('is-hidden');
                } else {
                    stage.classList.remove('is-hidden');
                }
            });
        });
    });
});