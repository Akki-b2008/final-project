// Simple, pleasant HTML email template generator
// Accepts an options object and returns an HTML string
module.exports = function buildSimpleEmail(opts = {}) {
  const {
    title = "Hello",
    preheader = "A quick note from our team",
    fullName = "there",
    body = "Thanks for joining us — we\'re glad to have you.",
    ctaText = "Get started",
    ctaUrl = null,
    footer = `© ${new Date().getFullYear()} Your Brand. All rights reserved.`,
    brandColor = "#1f2937",
    logoUrl = null,
    emailAddress = "",
  } = opts;

  // Keep the design simple: soft background, rounded card, clear CTA
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    /* Hide preheader text in email clients */
    .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; }
    body { margin:0; padding:0; background:#f7f8fa; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial, sans-serif; }
    .outer { width:100%; padding:28px 16px; }
    .card { max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(10,20,30,0.06); }
    .header { padding:18px 22px; display:flex; align-items:center; gap:12px; }
    .brand { font-weight:700; font-size:18px; color:${brandColor}; }
    .logo { height:40px; }
    .content { padding:22px; color:#0b1220; }
    h1 { margin:0 0 8px; font-size:20px; }
    p { margin:10px 0; color:#475569; line-height:1.5; }
    .cta { display:inline-block; margin-top:14px; padding:12px 18px; color:#ffffff; text-decoration:none; border-radius:10px; font-weight:600; }
    .meta { background:#f1f5f9; padding:12px; border-radius:8px; margin-top:14px; font-size:14px; color:#475569; }
    .footer { padding:18px 20px; font-size:13px; color:#9aa4b2; text-align:center; }
    @media (max-width:480px){ .card { border-radius:10px } h1 { font-size:18px } }
  </style>
</head>
<body>
  <span class="preheader">${preheader}</span>
  <div class="outer">
    <div class="card">
      <div class="header">
        ${logoUrl ? `<img src="${logoUrl}" alt="logo" class="logo">` : `<div class="brand">Your Brand</div>`}
      </div>
      <div class="content">
        <h1>${title}, ${fullName}</h1>
        <p>${body}</p>

        ${ctaUrl ? `<p><a class="cta" href="${ctaUrl}" style="background:${brandColor};">${ctaText}</a></p>` : ''}

        <div class="meta">
          <strong>Account</strong>
          <div style="margin-top:8px">Email: <span style="color:#6b7280">${emailAddress}</span></div>
        </div>

        <p style="margin-top:16px">Best wishes,<br/>The Team</p>
      </div>
      <div class="footer">${footer} &nbsp;|&nbsp; <a href="#" style="color:#9aa4b2;text-decoration:underline">Manage preferences</a></div>
    </div>
  </div>
</body>
</html>`;
};
