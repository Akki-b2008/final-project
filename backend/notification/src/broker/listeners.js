const sendEmail = require("../email");
const { subscribeToQueue } = require("./broker");

module.exports = function () {
  subscribeToQueue("AUTH_NOTIFICATION.USER_CREATED", async (data) => {
    // Build safe, readable values for the template
    const firstName = (data && data.fullName && data.fullName.firstName) || "";
    const lastName = (data && data.fullName && data.fullName.lastName) || "";
    const fullName =
      (firstName + (lastName ? " " + lastName : "")).trim() || "there";
    const emailAddress = (data && data.email) || "";

    // Branded template settings (can be provided in event data)
    const BRAND_COLOR = (data && data.brandColor) || "#1f2937"; // default dark gray
    const LOGO_URL = (data && data.logoUrl) || null;

    const buildSimpleEmail = require("../templates/simpleEmail");

    const emailHTMLTemplate = buildSimpleEmail({
      title: "Welcome",
      preheader: "Welcome to our service",
      fullName,
      body: "We're excited to have you with us.",
      footer: `© ${new Date().getFullYear()} Your Brand. All rights reserved.`,
      brandColor: BRAND_COLOR,
      logoUrl: LOGO_URL,
      emailAddress,
    });

    const plainText = `Welcome ${fullName}!

Thank you for registering with our service.

Email: ${emailAddress}

— The Team`;

    await sendEmail(
      emailAddress,
      "Welcome to Our Service",
      plainText,
      emailHTMLTemplate
    );
  });

  subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_COMPLETED", async (data) => {
    const emailHTMLTemplate = `
        <h1>Payment Successful!</h1>
        <p>Dear ${data.username},</p>
        <p>We have received your payment of ${data.currency} ${data.amount} for the order ID: ${data.orderId}.</p>
        <p>Thank you for your purchase!</p>
        <p>Best regards,<br/>The Team</p>
        `;
    await sendEmail(
      data.email,
      "Payment Successful",
      "We have received your payment",
      emailHTMLTemplate
    );
  });

  subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_FAILED", async (data) => {
    const emailHTMLTemplate = `
        <h1>Payment Failed</h1>
        <p>Dear ${data.username},</p>
        <p>Unfortunately, your payment for the order ID: ${data.orderId} has failed.</p>
        <p>Please try again or contact support if the issue persists.</p>
        <p>Best regards,<br/>The Team</p>
        `;
    await sendEmail(
      data.email,
      "Payment Failed",
      "Your payment could not be processed",
      emailHTMLTemplate
    );
  });
};
