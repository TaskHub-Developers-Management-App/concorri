import PDFDocument from 'pdfkit'
import fs from 'fs';

interface CouponPayload {
    customerName: string;
    customerPhone: string;
    id: string
}

interface LotteryConfig {
    storeName: string;
    lotteryName: string;
}

export function generateRafflePDF(configs: LotteryConfig, couponData: CouponPayload[], outputPath: string) {
    const doc = new PDFDocument({ size: 'A4', margin: 20 });

    doc.pipe(fs.createWriteStream(outputPath));

    const larguraQuadrante = doc.page.width - 40;
    const alturaQuadrante = 100;

    couponData.forEach((coupon, index) => {
        const quadranteIndex = index % 8;

        if (quadranteIndex === 0 && index !== 0) {
            doc.addPage();
        }

        const y = 20 + quadranteIndex * alturaQuadrante;

        // Desenhar borda
        doc.rect(20, y, larguraQuadrante, alturaQuadrante).stroke();

        // Inserir textos
        doc.fontSize(12).text(`Loja: ${configs.storeName}`, 30, y + 10);
        doc.text(`Sorteio: ${configs.lotteryName}`, 30, y + 25);
        doc.text(`Nome: ${coupon.customerName}`, 30, y + 40);
        doc.text(`Telefone: ${coupon.customerPhone}`, 30, y + 55);
        doc.text(`Cupom ID: ${coupon.id}`, 30, y + 70);
    });

    doc.end();
    console.log(`PDF gerado em: ${outputPath}`);
}