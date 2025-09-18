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

  // Professional Colors
  const primaryBlue = [37, 99, 235];
  const lightGray = [248, 250, 252];
  const borderGray = [229, 231, 235];
  const textGray = [75, 85, 99];
  const darkText = [31, 41, 55];

  // Header
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("BOOKING RECEIPT", 20, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Hotel Reservation Confirmation", 20, 26);

  // QR Code
  doc.addImage(qrCodeDataURL, "PNG", 165, 8, 20, 20);

  // Confirmation Number
  doc.setTextColor(darkText[0], darkText[1], darkText[2]);
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(20, 45, 170, 15, "F");
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.rect(20, 45, 170, 15, "S");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("CONFIRMATION NUMBER", 25, 52);
  doc.setFontSize(14);
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.text(data.confirmationNumber, 25, 57);

  // Hotel Information
  let yPos = 75;
  doc.setTextColor(darkText[0], darkText[1], darkText[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("HOTEL INFORMATION", 20, yPos);

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
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("GUEST INFORMATION", 20, yPos);

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
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("BOOKING DETAILS", 20, yPos);

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
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PRICE BREAKDOWN", 20, yPos);

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

  // Footer
  yPos += 40;
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.rect(20, yPos, 170, 15, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Thank you for your booking!", 105, yPos + 6, { align: "center" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Present this receipt at check-in", 105, yPos + 11, {
    align: "center",
  });

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
  const rowHeight = 8;
  const colWidth = width / 2;

  data.forEach((row, index) => {
    const currentY = y + index * rowHeight;

    // Alternating backgrounds
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(x, currentY - 1, width, rowHeight, "F");
    }

    // Border
    doc.setDrawColor(229, 231, 235);
    doc.rect(x, currentY - 1, width, rowHeight, "S");
    doc.line(
      x + colWidth,
      currentY - 1,
      x + colWidth,
      currentY + rowHeight - 1
    );

    // Text
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(75, 85, 99);
    doc.text(row[0], x + 4, currentY + 4);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(31, 41, 55);
    doc.text(row[1], x + colWidth + 4, currentY + 4);
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
  const rowHeight = 8;
  const col1Width = width * 0.4;
  const col2Width = width * 0.3;
  const col3Width = width * 0.3;

  data.forEach((row, index) => {
    const currentY = y + index * rowHeight;

    // Total row styling
    if (row[0] === "TOTAL") {
      doc.setFillColor(37, 99, 235);
      doc.rect(x, currentY - 1, width, rowHeight, "F");
      doc.setTextColor(255, 255, 255);
    } else {
      if (index % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(x, currentY - 1, width, rowHeight, "F");
      }
      doc.setTextColor(31, 41, 55);
    }

    // Border
    doc.setDrawColor(229, 231, 235);
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

    // Text
    doc.setFontSize(9);
    const fontWeight = row[0] === "TOTAL" ? "bold" : "normal";
    doc.setFont("helvetica", fontWeight);

    doc.text(row[0], x + 4, currentY + 4);
    doc.text(row[1], x + col1Width + 4, currentY + 4);
    doc.text(row[2], x + col1Width + col2Width + 4, currentY + 4);
  });
}
