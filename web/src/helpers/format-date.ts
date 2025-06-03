export function formatDate(date: string): string {
    try {
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        return `${formattedDate}`;
    } catch (error) {
        console.error('Erro ao formatar a data:', error);
        return '';
    }
}