document.addEventListener('DOMContentLoaded', () => {
    // Carrega os IDs salvos no navegador ou cria uma lista vazia
    const readBooks = JSON.parse(localStorage.getItem('tolkien_read_books')) || [];

    const cards = document.querySelectorAll('.card[data-book-id]');

    cards.forEach(card => {
        const bookId = card.dataset.bookId;
        const button = card.querySelector('.read-btn');

        if (!button) return;

        // Aplica o estado inicial se já estiver salvo
        if (readBooks.includes(bookId)) {
            card.classList.add('is-read');
            button.textContent = '✓ Lido';
        }

        // Ação de clique no botão
        button.addEventListener('click', () => {
            const isAlreadyRead = card.classList.contains('is-read');

            if (isAlreadyRead) {
                // Desmarcar
                card.classList.remove('is-read');
                button.textContent = 'Marcar como lido';
                const index = readBooks.indexOf(bookId);
                if (index > -1) {
                    readBooks.splice(index, 1);
                }
            } else {
                // Marcar
                card.classList.add('is-read');
                button.textContent = '✓ Lido';
                readBooks.push(bookId);
            }

            // Salva a lista atualizada no navegador
            localStorage.setItem('tolkien_read_books', JSON.stringify(readBooks));
        });
    });
});