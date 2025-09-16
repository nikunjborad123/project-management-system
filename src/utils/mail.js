import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mainGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task manager",
      link: "https://taskmanager.com",
    },
  });

  const emailText = mainGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mainGenerator.generatePlaintext(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: "mail.taskmanager@example.com",
      to: options.email,
      subject: options.subject,
      text: emailText,
      html: emailHtml,
    });
  } catch (error) {
    console.error(
      "Email service failed silently. Make sure that you have provided valid credentials for the email service.",
    );
    console.error("Error: ", error);
  }
};

const emailVerificationMaingenContent = (userName, url) => {
  return {
    body: {
      name: userName,
      intro: "Welcome to our app! We're very excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button",
        button: {
          color: "#22BC66",
          text: "Confirm your email",
          link: url,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMaingenContent = (userName, url) => {
  return {
    body: {
      name: userName,
      intro: "We receive password reset request from your account.",
      action: {
        instructions:
          "To reset your password, please click on the following button",
        button: {
          color: "#22BC66",
          text: "Reset password",
          link: url,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export {
  forgotPasswordMaingenContent,
  emailVerificationMaingenContent,
  sendEmail,
};
