// import jsPDF from "jspdf";

// // Helper to add text and handle page overflow (optimized like businessPdf)
// function addTextBlock(
//   doc: jsPDF,
//   text: string | string[] | undefined,
//   x: number,
//   y: number,
//   options: any = {},
//   maxY?: number
// ) {
//   if (!text) return y; // skip if nothing passed

//   // Always normalize into string[]
//   let wrapped: string[];
//   if (typeof text === "string") {
//     wrapped = doc.splitTextToSize(text, 180);
//   } else if (Array.isArray(text)) {
//     wrapped = text;
//   } else {
//     wrapped = [String(text)];
//   }

//   // Calculate height using font size
//   const fontSize = doc.internal.getFontSize();
//   const lineHeight = fontSize * 0.3528 + 2; // convert pt → mm + padding
//   let i = 0;
//   // Use dynamic page height
//   let pageHeight = doc.internal.pageSize.getHeight();
//   let effectiveMaxY = typeof maxY === 'number' ? maxY : pageHeight - 20;

//   while (i < wrapped.length) {
//     pageHeight = doc.internal.pageSize.getHeight();
//     effectiveMaxY = typeof maxY === 'number' ? maxY : pageHeight - 20;
//     const linesLeft = Math.floor((effectiveMaxY - y) / lineHeight);
//     if (linesLeft <= 0) {
//       doc.addPage();
//       y = 25;
//       pageHeight = doc.internal.pageSize.getHeight();
//       effectiveMaxY = typeof maxY === 'number' ? maxY : pageHeight - 20;
//       continue;
//     }
//     const chunk = wrapped.slice(i, i + linesLeft);
//     doc.text(chunk, x, y, options);
//     y += chunk.length * lineHeight;
//     i += chunk.length;
//   }
//   return y;
// }

// export function generateCitizenPDF(data: any) {
//   const doc = new jsPDF();
//   let y = 20; // Top padding
//   const maxY = 350;

//   // Header
//   doc.setFontSize(20).setTextColor(28, 35, 90).setFont("helvetica", "bold");
//   y = addTextBlock(doc, "Know Your Terms", 14, y, {});
//   y += 2;
//   doc.setFontSize(14).setTextColor(80, 80, 80).setFont("helvetica", "normal");
//   y = addTextBlock(doc, "Citizen Contract Summary", 14, y, {});
//   y += 2;

//   // Title
//   if (data.title) {
//     doc.setFontSize(15).setTextColor(40, 40, 40).setFont("helvetica", "bold");
//     y = addTextBlock(doc, data.title, 105, y, { align: "center" });
//     y += 4;
//   }

//   // Divider
//   doc.setDrawColor(180, 180, 180);
//   doc.line(14, y, 196, y);
//   y += 8;

//   // About
//   doc.setFontSize(13).setTextColor(33, 33, 33).setFont("helvetica", "bold");
//   y = addTextBlock(doc, "About", 14, y, {});
//   y += 2;
//   doc.setFontSize(11).setTextColor(70, 70, 70).setFont("helvetica", "normal");
//   y = addTextBlock(doc, data.about, 18, y, {});
//   y += 8;

//   // Benefits & Risks in a single row with extra space and N/A separation
//   const leftX = 18;
//   const rightX = 128; // More space between columns
//   doc.setFontSize(12).setTextColor(22, 163, 74).setFont("helvetica", "bold");
//   doc.text('Benefits:', leftX - 4, y);
//   doc.setFontSize(12).setTextColor(220, 38, 38).setFont("helvetica", "bold");
//   doc.text('Risks:', rightX - 4, y);
//   y += 2;
//   doc.setFontSize(11).setTextColor(60, 60, 60).setFont("helvetica", "normal");
//   const maxLen = Math.max(
//     data.benefits && data.benefits.length ? data.benefits.length : 0,
//     data.risks && data.risks.length ? data.risks.length : 0,
//     1
//   );
//   for (let i = 0; i < maxLen; i++) {
//     const benefit = data.benefits && data.benefits[i] ? `- ${data.benefits[i]}` : (i === 0 && (!data.benefits || data.benefits.length === 0) ? 'N/A' : '');
//     const risk = data.risks && data.risks[i] ? `- ${data.risks[i]}` : (i === 0 && (!data.risks || data.risks.length === 0) ? 'N/A' : '');
//     if (benefit)
//       doc.text(benefit, leftX, y);
//     if (risk)
//       doc.text(risk, rightX, y);
//     y += 8;
//   }
//   y += 2;

//   // Divider
//   doc.setDrawColor(220, 220, 220);
//   doc.line(14, y, 196, y);
//   y += 8;

//   // Scores (side by side like website UI)
//   doc.setFontSize(12).setTextColor(34, 64, 123).setFont("helvetica", "bold");
//   y = addTextBlock(doc, "Scores", 14, y, {});
//   y += 2;

//   const clarityText = `Clarity: ${data.clarity.score}/10 – ${data.clarity.comment}`;
//   const fairnessText = `Fairness: ${data.fairness.score}/10 – ${data.fairness.comment}`;

//   doc.setFontSize(11).setTextColor(60, 60, 60).setFont("helvetica", "normal");
//   // Draw both scores side by side, but check for overflow
//   let scoreY = y;
//   scoreY = addTextBlock(doc, clarityText, 18, scoreY, { maxWidth: 85 });
//   scoreY = addTextBlock(doc, fairnessText, 110, y, { maxWidth: 85 });
//   y = Math.max(scoreY, y + 18);
//   y += 6;

//   // Divider
//   doc.setDrawColor(220, 220, 220);
//   doc.line(14, y, 196, y);
//   y += 8;

//   // Repayment
//   doc.setFontSize(12).setTextColor(88, 28, 135).setFont("helvetica", "bold");
//   y = addTextBlock(doc, "Repayment Details", 14, y, {});
//   y += 2;
//   doc.setFontSize(11).setTextColor(60, 60, 60).setFont("helvetica", "normal");
//   const repaymentText = `EMI: ${data.repaymentDetails.emiAmount}\nTotal: ${data.repaymentDetails.totalRepayment}\nInterest: ${data.repaymentDetails.interestExtra}\nNote: ${data.repaymentDetails.note}`;
//   y = addTextBlock(doc, repaymentText, 18, y, {});
//   y += 8;

//   // Suggestions (header always present, N/A default)
//   doc.setFontSize(12).setTextColor(202, 138, 4).setFont("helvetica", "bold");
//   y = addTextBlock(doc, "Suggestions", 14, y, {});
//   y += 2;
//   doc.setDrawColor(180, 180, 180);
//   doc.line(14, y, 196, y);
//   y += 4;
//   if (data.suggestions && data.suggestions.length > 0) {
//     data.suggestions.forEach((s: string, index: number) => {
//       if (y > maxY - 20) {
//         doc.addPage();
//         y = 25;
//       }
//       doc.setFontSize(11).setTextColor(60, 60, 60).setFont("helvetica", "normal");
//       y = addTextBlock(doc, `${index + 1}. ${s}`, 18, y, {});
//       y += 2;
//     });
//   } else {
//     y = addTextBlock(doc, 'N/A', 18, y, {});
//   }
//   y += 6;

//   // If near bottom, add a new page for analogy and footer
//   if (y > maxY - 20) {
//     doc.addPage();
//     y = 25;
//   }

//   // Analogy
//   doc.setFontSize(11).setTextColor(80, 80, 80).setFont("helvetica", "italic");
//   y = addTextBlock(doc, `“${data.analogy}”`, 14, y, { maxWidth: 180 });
//   y += 8;

//   // Footer (right-aligned for professional look)
//   doc.setFontSize(10).setTextColor(120, 120, 120).setFont("helvetica", "normal");
//   y = addTextBlock(doc, "Generated by Know Your Terms", 196, y, { align: "right" });
//   y += 1;
//   addTextBlock(doc, "With regards,\nThe Know Your Terms Team", 196, y, { align: "right" });

//   doc.save("CitizenSummary.pdf");
// }











import jsPDF from "jspdf";

// Helper to add text and handle page overflow
function addTextBlock(doc: jsPDF, text: string | string[], x: number, y: number, options: any = {}, maxY = 350) {
  const wrapped = typeof text === 'string' ? doc.splitTextToSize(text, 180) : text;
  const height = doc.getTextDimensions(wrapped).h;
  if (y + height > maxY) {
    doc.addPage();
    y = 25;
  }
  doc.text(wrapped, x, y, options);
  return y + height;
}

export function generateCitizenPDF(data: any) {
  const doc = new jsPDF();
  let y = 20; // Top padding
  const maxY = 350;

  // Header
  doc.setFontSize(20).setTextColor(34, 64, 123).setFont('helvetica', 'bold');
  y = addTextBlock(doc, "Know Your Terms", 14, y, {});
  y += 2;
  doc.setFontSize(14).setTextColor(60, 60, 60).setFont('helvetica', 'normal');
  y = addTextBlock(doc, "Citizen Contract Summary", 14, y, {});
  y += 2;

  // Title
  doc.setFontSize(15).setTextColor(40, 40, 40).setFont('helvetica', 'bold');
  y = addTextBlock(doc, data.title, 105, y, { align: "center" });
  y += 2;

  // Section divider
  doc.setDrawColor(180, 180, 180);
  doc.line(14, y, 196, y);
  y += 5;

  // About
  doc.setFontSize(12).setTextColor(33, 33, 33).setFont('helvetica', 'bold');
  y = addTextBlock(doc, "About:", 14, y, {});
  y += 2;
  doc.setFontSize(11).setTextColor(60, 60, 60).setFont('helvetica', 'normal');
  y = addTextBlock(doc, data.about, 14, y, {});
  y += 6;

  // Section divider
  doc.setDrawColor(220, 220, 220);
  doc.line(14, y, 196, y);
  y += 5;

  // Benefits
  doc.setFontSize(12).setTextColor(22, 163, 74).setFont('helvetica', 'bold');
  y = addTextBlock(doc, "Benefits:", 14, y, {});
  y += 2;
  doc.setFontSize(11).setTextColor(60, 60, 60).setFont('helvetica', 'normal');
  data.benefits.forEach((b: string) => {
    y = addTextBlock(doc, `- ${b}`, 18, y, {});
    y += 1;
  });
  y += 4;

  // Risks
  doc.setFontSize(12).setTextColor(220, 38, 38).setFont('helvetica', 'bold');
  y = addTextBlock(doc, "Risks:", 14, y, {});
  y += 2;
  doc.setFontSize(11).setTextColor(60, 60, 60).setFont('helvetica', 'normal');
  data.risks.forEach((r: string) => {
    y = addTextBlock(doc, `- ${r}`, 18, y, {});
    y += 1;
  });
  y += 6;

  // Section divider
  doc.setDrawColor(220, 220, 220);
  doc.line(14, y, 196, y);
  y += 5;

  // Scores (side by side like website UI)
  doc.setFontSize(12).setTextColor(34, 64, 123).setFont('helvetica', 'bold');
  y = addTextBlock(doc, "Scores:", 14, y, {});
  y += 2;

  const clarityText = `Clarity: ${data.clarity.score}/10 – ${data.clarity.comment}`;
  const fairnessText = `Fairness: ${data.fairness.score}/10 – ${data.fairness.comment}`;

  doc.setFontSize(11).setTextColor(60, 60, 60).setFont('helvetica', 'normal');
  // Draw both scores side by side, but check for overflow
  let scoreY = y;
  scoreY = addTextBlock(doc, clarityText, 18, scoreY, { maxWidth: 85 });
  scoreY = addTextBlock(doc, fairnessText, 110, y, { maxWidth: 85 });
  y = Math.max(scoreY, y + 18);
  y += 6;

  // Section divider
  doc.setDrawColor(220, 220, 220);
  doc.line(14, y, 196, y);
  y += 5;

  // Repayment
  doc.setFontSize(12).setTextColor(88, 28, 135).setFont('helvetica', 'bold');
  y = addTextBlock(doc, "Repayment Details:", 14, y, {});
  y += 2;
  doc.setFontSize(11).setTextColor(60, 60, 60).setFont('helvetica', 'normal');
  const repaymentText = `EMI: ${data.repaymentDetails.emiAmount}\nTotal: ${data.repaymentDetails.totalRepayment}\nInterest: ${data.repaymentDetails.interestExtra}\nNote: ${data.repaymentDetails.note}`;
  y = addTextBlock(doc, repaymentText, 18, y, {});
  y += 6;

  // Suggestions
  // Always show only one 'Suggestions:' header, never 'Suggestions (contd.):'
  if (data.suggestions && data.suggestions.length > 0) {
    doc.setFontSize(12).setTextColor(202, 138, 4).setFont('helvetica', 'bold');
    y = addTextBlock(doc, "Suggestions:", 14, y, {});
    y += 2;
    doc.setDrawColor(180, 180, 180);
    doc.line(14, y, 196, y);
    y += 4;
    data.suggestions.forEach((s: string, index: number) => {
      // Check for page overflow for each suggestion
      if (y > maxY - 20) {
        doc.addPage();
        y = 25;
      }
      doc.setFontSize(11).setTextColor(60, 60, 60).setFont('helvetica', 'normal');
      y = addTextBlock(doc, `${index + 1}. ${s}`, 18, y, {});
      y += 2;
    });
    y += 4;
  }

  // If near bottom, add a new page for analogy and footer
  if (y > maxY - 20) {
    doc.addPage();
    y = 25;
  }

  // Analogy
  doc.setFontSize(11).setTextColor(80, 80, 80).setFont('helvetica', 'italic');
  y = addTextBlock(doc, `“${data.analogy}”`, 14, y, { maxWidth: 180 });
  y += 8;

  // Footer (right-aligned for professional look)
  doc.setFontSize(10).setTextColor(120, 120, 120).setFont('helvetica', 'normal');
  y = addTextBlock(doc, "Generated by Know Your Terms", 196, y, { align: "right" });
  y += 1;
  addTextBlock(doc, "With regards,\nThe Know Your Terms Team", 196, y, { align: "right" });

  doc.save("CitizenSummary.pdf");
}

