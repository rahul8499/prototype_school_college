import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import SMTPTransport from 'nodemailer/lib/smtp-transport';

type Data = {
  success: boolean;
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("API route hit"); // Add this line
  if (req.method === "POST") {
    const { fullName, lookingFor, email, mobile, message } = req.body;

    // Configure the transporter
    // const transporter = nodemailer.createTransport({
    //   host: process.env.MAILTRAP_HOST,
    //   secure: false, // true for 465, false for other ports

    //   port: process.env.MAILTRAP_PORT,
    //   auth: {
    //     user: process.env.MAILTRAP_USER,
    //     pass: process.env.MAILTRAP_PASSWORD,
    //   },
    // });


    const transporter = nodemailer.createTransport({
      host:process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    } as SMTPTransport.Options);
    // Email options
    const mailOptions = {
      from: process.env.MAILTRAP_FROM_EMAIL,
      to: "rahulkolhe90.rk.rk@gmail.com",
      subject: `New Inquiry from ${fullName}`,
      html: emailTemplate(fullName, email, mobile, message),
    };

    try {
      await transporter.sendMail(mailOptions);
      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Error sending email",
          error: String(error),
        });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Assuming you have a function to send emails

const emailTemplate = (
  fullName: string,
  email: string,
  mobile: string,
  message: string
) => {

  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 5px;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 8px;
          }
          .header {
            background-color: #D97706;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            margin: 2px;
            font-size: 20px;
          }
          .content {
            padding: 20px;
          }
          .content h2 {
            font-size: 20px;
            margin-bottom: 10px;
          }
          .content p {
            margin: 5px 0;
            line-height: 1.6;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h4>DR. SUDHAKAR JADHAVAR
ARTS, COMMERCE & SCIENCE COLLEGE</h4>
            <h4>New Inquiry from ${fullName}</h4>
          </div>
          <div class="content">
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Mobile/WhatsApp Number:</strong> ${mobile}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
