import { transporter } from "../config/email.js";

export const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: `"VendorVault" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Verify your email",
        html: `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes.</p>
    `,
    }
    await transporter.sendMail(mailOptions);
}
