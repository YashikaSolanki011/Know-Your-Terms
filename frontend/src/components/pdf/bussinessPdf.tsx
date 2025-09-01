import jsPDF from "jspdf";

// Helper to add text and handle page overflow

function addTextBlock(
  doc: jsPDF,
  text: string | string[] | undefined,
  x: number,
  y: number,
  options: any = {},
  maxY?: number
) {
  if (!text) return y; // skip if nothing passed

  // Always normalize into string[]
  let wrapped: string[];
  if (typeof text === "string") {
    wrapped = doc.splitTextToSize(text, 180);
  } else if (Array.isArray(text)) {
    wrapped = text;
  } else {
    wrapped = [String(text)];
  }

  // Calculate height using font size
  const fontSize = doc.internal.getFontSize();
  const lineHeight = fontSize * 0.3528 + 2; // convert pt → mm + padding
  let i = 0;
  // Use dynamic page height
  let pageHeight = doc.internal.pageSize.getHeight();
  let effectiveMaxY = typeof maxY === 'number' ? maxY : pageHeight - 20;

  while (i < wrapped.length) {
    // How many lines fit on this page?
    pageHeight = doc.internal.pageSize.getHeight();
    effectiveMaxY = typeof maxY === 'number' ? maxY : pageHeight - 20;
    const linesLeft = Math.floor((effectiveMaxY - y) / lineHeight);
    if (linesLeft <= 0) {
      doc.addPage();
      y = 25;
      pageHeight = doc.internal.pageSize.getHeight();
      effectiveMaxY = typeof maxY === 'number' ? maxY : pageHeight - 20;
      continue;
    }
    const chunk = wrapped.slice(i, i + linesLeft);
    doc.text(chunk, x, y, options);
    y += chunk.length * lineHeight;
    i += chunk.length;
  }
  return y;
}


export function generateBusinessPDF(data: any) {
  const doc = new jsPDF();
  let y = 20; // Top padding
  const maxY = 350;

  // Header
  doc.setFontSize(20).setTextColor(28, 35, 90).setFont("helvetica", "bold");
  y = addTextBlock(doc, "Know Your Terms", 14, y, {});
  y += 2;
  doc.setFontSize(14).setTextColor(80, 80, 80).setFont("helvetica", "normal");
  y = addTextBlock(doc, "Business Owner Contract Summary", 14, y, {});
  y += 2;

  // Title
  doc.setFontSize(15).setTextColor(40, 40, 40).setFont("helvetica", "bold");
  y = addTextBlock(doc, data.title, 105, y, { align: "center" });
  y += 4;

  // Divider
  doc.setDrawColor(180, 180, 180);
  doc.line(14, y, 196, y);
  y += 8;

  // About
  doc.setFontSize(13).setTextColor(33, 33, 33).setFont("helvetica", "bold");
  y = addTextBlock(doc, "About", 14, y, {});
  y += 2;
  doc.setFontSize(11).setTextColor(70, 70, 70).setFont("helvetica", "normal");
  y = addTextBlock(doc, data.about, 18, y, {});
  y += 8;

  // Clauses
  if (Array.isArray(data.clauses) && data.clauses.length > 0) {
    doc.setFontSize(13).setTextColor(34, 64, 123).setFont("helvetica", "bold");
    y = addTextBlock(doc, "Clauses", 14, y, {});
    y += 2;
    data.clauses.forEach((clause: any, idx: number) => {
      if (y > maxY - 40) {
        doc.addPage();
        y = 25;
      }
      doc.setFontSize(11).setTextColor(40, 40, 40).setFont("helvetica", "bold");
      y = addTextBlock(doc, `${idx + 1}. ${clause.title}`, 18, y, {});
      doc.setFontSize(11).setTextColor(60, 60, 60).setFont("helvetica", "normal");
      y = addTextBlock(doc, clause.explanation, 22, y, {});
      if (clause.risk) {
        doc.setFontSize(11).setTextColor(200, 30, 30).setFont("helvetica", "normal");
        y = addTextBlock(doc, `• Risk: ${clause.risk}`, 26, y, {});
      }
      if (clause.improvement) {
        doc.setFontSize(11).setTextColor(16, 122, 58).setFont("helvetica", "normal");
        y = addTextBlock(doc, `• Improvement: ${clause.improvement}`, 26, y, {});
      }
      y += 6;
    });
    y += 4;
  }

  // Divider
  doc.setDrawColor(220, 220, 220);
  doc.line(14, y, 196, y);
  y += 8;

  // Financials
  if (data.financials) {
    doc.setFontSize(13).setTextColor(34, 64, 123).setFont("helvetica", "bold");
    y = addTextBlock(doc, "Financials", 14, y, {});
    y += 2;
    doc.setFontSize(11).setTextColor(40, 40, 40).setFont("arial", "normal");
    if (data.financials.totalFee) {
      y = addTextBlock(doc, `Total Fee: ${data.financials.totalFee}`, 17, y, {});
    }
    if (Array.isArray(data.financials.paymentMilestones) && data.financials.paymentMilestones.length > 0) {
      y = addTextBlock(doc, "Payment Milestones:", 18, y, {});
      data.financials.paymentMilestones.forEach((m: string) => {
        y = addTextBlock(doc, ` • ${m}`, 20, y, {});
      });
    }
    if (data.financials.lateFee) {
      y = addTextBlock(doc, `Late Fee: ${data.financials.lateFee}`, 18, y, {});
    }
    y += 6;
  }

  // Compliance Notes
  if (Array.isArray(data.keyComplianceNotes) && data.keyComplianceNotes.length > 0) {
    doc.setFontSize(13).setTextColor(34, 64, 123).setFont("helvetica", "bold");
    y = addTextBlock(doc, "Compliance Notes", 14, y, {});
    y += 2;
    doc.setFontSize(11).setTextColor(40, 40, 40).setFont("helvetica", "normal");
    data.keyComplianceNotes.forEach((note: string) => {
      y = addTextBlock(doc, `• ${note}`, 18, y, {});
    });
    y += 6;
  }

  // Final Assessment
  if (data.finalAssessment) {
    doc.setFontSize(13).setTextColor(34, 64, 123).setFont("helvetica", "bold");
    y = addTextBlock(doc, "Final Assessment", 14, y, {});
    y += 2;
    doc.setFontSize(11).setTextColor(40, 40, 40).setFont("helvetica", "normal");
    if (data.finalAssessment.overallRisk) {
      y = addTextBlock(doc, `Overall Risk: ${data.finalAssessment.overallRisk}`, 18, y, {});
    }
    if (data.finalAssessment.comment) {
      y = addTextBlock(doc, data.finalAssessment.comment, 18, y, {});
    }
    y += 6;
  }

  // Footer
  doc.setFontSize(10).setTextColor(120, 120, 120).setFont("helvetica", "normal");
  y = addTextBlock(doc, "Generated by Know Your Terms", 196, y, {
    align: "right",
  });
  y += 1;
  addTextBlock(doc, "With regards,\nThe Know Your Terms Team", 196, y, {
    align: "right",
  });

  doc.save("BusinessSummary.pdf");
}
