import { jsPDF } from 'jspdf';

export const generateProposalPDF = (formData: any, lang: string) => {
  const doc = new jsPDF();
  
  // Basic colors
  const primaryColor = '#0B1120';
  const accentColor = '#00E5FF';
  const goldColor = '#E9C349';

  // Add a background or header bar
  doc.setFillColor(11, 17, 32); // Dark blue
  doc.rect(0, 0, 210, 40, 'F');
  
  // Title
  doc.setTextColor(0, 229, 255); // Cyan
  doc.setFontSize(24);
  doc.text('SOGNI DIGITALI', 20, 25);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('Discovery Call Summary', 140, 25);

  // Content
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(16);
  doc.text(`Proposal for: ${formData.company || formData.name}`, 20, 60);
  
  doc.setFontSize(12);
  
  // Current Date
  const dateStr = new Date().toLocaleDateString();
  doc.text(`Date generated: ${dateStr}`, 140, 60);

  // Divider
  doc.setDrawColor(233, 195, 73); // Gold
  doc.setLineWidth(0.5);
  doc.line(20, 70, 190, 70);

  // Fields
  doc.setFont(undefined, 'bold');
  doc.text('Contact Name:', 20, 85);
  doc.setFont(undefined, 'normal');
  doc.text(formData.name || 'N/A', 60, 85);

  doc.setFont(undefined, 'bold');
  doc.text('Email:', 20, 95);
  doc.setFont(undefined, 'normal');
  doc.text(formData.email || 'N/A', 60, 95);

  doc.setFont(undefined, 'bold');
  doc.text('Budget Range:', 20, 105);
  doc.setFont(undefined, 'normal');
  doc.text(formData.budget || 'N/A', 60, 105);

  doc.setFont(undefined, 'bold');
  doc.text('Specific Goals:', 20, 115);
  doc.setFont(undefined, 'normal');
  
  const splitGoals = doc.splitTextToSize(formData.goals || 'No specific goals provided.', 150);
  doc.text(splitGoals, 20, 125);

  // Disclaimer / Footer
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(10);
  doc.text(
    'This is an automatically generated brief based on your inputs. ' +
    'We look forward to discussing these details in our call.',
    20, 270
  );

  // Download
  doc.save(`Sogni_Proposal_${formData.name?.replace(/\s+/g, '_') || 'Draft'}.pdf`);
};
