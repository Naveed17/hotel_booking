import jsPDF from "jspdf";
import QRCode from "qrcode";

interface ReceiptData {
  confirmationNumber: string;
  hotelName: string;
  hotelLocation: string;
  hotelAddress: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  roomRate: number;
  taxes: number;
  totalAmount: number;
}

export const generateReceipt = async (data: ReceiptData) => {
  const doc = new jsPDF();

  // Generate QR Code
  const qrData = `Confirmation: ${data.confirmationNumber}\nHotel: ${
    data.hotelName
  }\nGuest: ${data.guestName}\nCheck-in: ${new Date(
    data.checkIn
  ).toLocaleDateString()}`;
  const qrCodeDataURL = await QRCode.toDataURL(qrData, {
    width: 80,
    margin: 1,
    color: {
      dark: "#374151",
      light: "#FFFFFF",
    },
  });

  // Modern Design Colors
  const emeraldGreen = [16, 185, 129]; // emerald-500
  const gradientBlue = [59, 130, 246]; // blue-500
  const softGray = [248, 250, 252]; // gray-50
  const borderGray = [229, 231, 235]; // gray-200
  const textGray = [75, 85, 99]; // gray-600
  const darkText = [17, 24, 39]; // gray-900
  const accentPurple = [139, 92, 246]; // violet-500

  // Modern Gradient Header
  doc.setFillColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.rect(0, 0, 210, 40, "F");

  // Add subtle gradient effect with overlays
  doc.setFillColor(gradientBlue[0], gradientBlue[1], gradientBlue[2]);
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("BOOKING CONFIRMED", 20, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Your Dream Stay Awaits • Hotel Reservation Receipt", 20, 30);

  // Enhanced QR Code with border
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(160, 6, 28, 28, 3, 3, "F");
  doc.addImage(qrCodeDataURL, "PNG", 164, 10, 20, 20);

  // Modern Confirmation Badge
  doc.setFillColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.roundedRect(20, 50, 170, 18, 3, 3, "F");
  doc.setDrawColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, 50, 170, 18, 3, 3, "S");

  // Add small dot indicator
  doc.setFillColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.circle(28, 59, 1.5, "F");

  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("CONFIRMATION NUMBER", 33, 56);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.text(data.confirmationNumber, 33, 63);

  // Modern Section Headers
  let yPos = 80;
  doc.setTextColor(darkText[0], darkText[1], darkText[2]);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");

  // Add colored dot for section
  doc.setFillColor(gradientBlue[0], gradientBlue[1], gradientBlue[2]);
  doc.circle(22, yPos - 2, 1.5, "F");
  doc.text("HOTEL INFORMATION", 28, yPos);

  yPos += 8;
  drawSimpleTable(
    doc,
    [
      ["Hotel Name", data.hotelName],
      ["Location", data.hotelLocation],
      ["Address", data.hotelAddress],
    ],
    20,
    yPos,
    170
  );

  // Guest Information
  yPos += 35;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");

  // Add colored dot for section
  doc.setFillColor(accentPurple[0], accentPurple[1], accentPurple[2]);
  doc.circle(22, yPos - 2, 1.5, "F");
  doc.text("GUEST INFORMATION", 28, yPos);

  yPos += 8;
  drawSimpleTable(
    doc,
    [
      ["Guest Name", data.guestName],
      ["Email", data.email],
      ["Phone", data.phone],
    ],
    20,
    yPos,
    170
  );

  // Booking Details
  yPos += 35;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");

  // Add colored dot for section
  doc.setFillColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.circle(22, yPos - 2, 1.5, "F");
  doc.text("BOOKING DETAILS", 28, yPos);

  yPos += 8;
  drawSimpleTable(
    doc,
    [
      [
        "Check-in",
        new Date(data.checkIn).toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      ],
      [
        "Check-out",
        new Date(data.checkOut).toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      ],
      ["Guests", data.guests.toString()],
      ["Nights", data.nights.toString()],
    ],
    20,
    yPos,
    170
  );

  // Price Breakdown
  yPos += 45;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");

  // Add colored dot for section
  doc.setFillColor(255, 159, 67); // orange-400
  doc.circle(22, yPos - 2, 1.5, "F");
  doc.text("PRICE BREAKDOWN", 28, yPos);

  yPos += 8;
  drawPriceTable(
    doc,
    [
      [
        "Room Rate",
        `$${data.roomRate.toFixed(2)} × ${data.nights} nights`,
        `$${(data.roomRate * data.nights).toFixed(2)}`,
      ],
      ["Taxes & Fees", "", `$${data.taxes.toFixed(2)}`],
      ["TOTAL", "", `$${data.totalAmount.toFixed(2)}`],
    ],
    20,
    yPos,
    170
  );

  // Modern Footer
  yPos += 50;
  doc.setFillColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.roundedRect(20, yPos, 170, 20, 3, 3, "F");

  // Add gradient overlay
  doc.setFillColor(gradientBlue[0], gradientBlue[1], gradientBlue[2]);
  doc.roundedRect(20, yPos, 170, 20, 3, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Thank you for choosing us!", 105, yPos + 8, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Present this confirmation at check-in • Have a wonderful stay!",
    105,
    yPos + 14,
    {
      align: "center",
    }
  );

  // Download
  doc.save(`hotel-receipt-${data.confirmationNumber}.pdf`);
};

// Simple table function
function drawSimpleTable(
  doc: jsPDF,
  data: string[][],
  x: number,
  y: number,
  width: number
) {
  const rowHeight = 10;
  const colWidth = width / 2;

  data.forEach((row, index) => {
    const currentY = y + index * rowHeight;

    // Modern alternating backgrounds with rounded corners effect
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(x, currentY - 1, width, rowHeight, "F");
    }

    // Subtle borders
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    if (index === 0) {
      doc.line(x, currentY - 1, x + width, currentY - 1); // top border
    }
    doc.line(x, currentY + rowHeight - 1, x + width, currentY + rowHeight - 1); // bottom border
    doc.line(x, currentY - 1, x, currentY + rowHeight - 1); // left border
    doc.line(x + width, currentY - 1, x + width, currentY + rowHeight - 1); // right border
    doc.line(
      x + colWidth,
      currentY - 1,
      x + colWidth,
      currentY + rowHeight - 1
    ); // middle divider

    // Enhanced text styling
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(75, 85, 99);
    doc.text(row[0], x + 6, currentY + 5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(17, 24, 39);
    doc.text(row[1], x + colWidth + 6, currentY + 5);
  });
}

// Price table function
function drawPriceTable(
  doc: jsPDF,
  data: string[][],
  x: number,
  y: number,
  width: number
) {
  const rowHeight = 10;
  const col1Width = width * 0.4;
  const col2Width = width * 0.3;
  const col3Width = width * 0.3;

  data.forEach((row, index) => {
    const currentY = y + index * rowHeight;

    // Enhanced total row styling with gradient effect
    if (row[0] === "TOTAL") {
      doc.setFillColor(16, 185, 129); // emerald-500
      doc.roundedRect(x, currentY - 1, width, rowHeight, 2, 2, "F");

      // Add gradient overlay
      doc.setFillColor(59, 130, 246); // blue-500
      doc.roundedRect(x, currentY - 1, width, rowHeight, 2, 2, "F");

      doc.setTextColor(255, 255, 255);
    } else {
      if (index % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(x, currentY - 1, width, rowHeight, "F");
      }
      doc.setTextColor(17, 24, 39);
    }

    // Subtle borders
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    if (row[0] !== "TOTAL") {
      doc.rect(x, currentY - 1, width, rowHeight, "S");
      doc.line(
        x + col1Width,
        currentY - 1,
        x + col1Width,
        currentY + rowHeight - 1
      );
      doc.line(
        x + col1Width + col2Width,
        currentY - 1,
        x + col1Width + col2Width,
        currentY + rowHeight - 1
      );
    }

    // Enhanced text styling
    doc.setFontSize(row[0] === "TOTAL" ? 11 : 9);
    const fontWeight = row[0] === "TOTAL" ? "bold" : "normal";
    doc.setFont("helvetica", fontWeight);

    doc.text(row[0], x + 6, currentY + 5);
    doc.text(row[1], x + col1Width + 6, currentY + 5);
    doc.text(row[2], x + col1Width + col2Width + 6, currentY + 5);
  });
}
