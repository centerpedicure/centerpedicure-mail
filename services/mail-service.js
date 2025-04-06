import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    this.sendInviteMail = this.sendInviteMail.bind(this);
  }

  async sendInviteMail(name, number, text) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_TO_USER,
      subject: `Новый отзыв от клиента ${name}`,
      text: "",
      html: `
        <div style="background-color: #eeeeee; padding: 30px; font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="background-color: #79bd87; padding: 20px; text-align: center;">
              <h2 style="margin: 0; color: white;">Новый отзыв от клиента</h2>
              <h1 style="margin: 10px 0 0; color: white;">${name}</h1>
            </div>
            <div style="padding: 20px;">
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                <strong style="color: #79bd87;">Контактный номер:</strong> ${number}
              </p>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                <strong style="color: #79bd87;">Текст отзыва:</strong><br>
                ${text}
              </p>
            </div>
            <div style="background-color: #f0f0f0; padding: 10px 20px; text-align: center; font-size: 14px; color: #999;">
              Благодарим за обратную связь!
            </div>
          </div>
        </div>
      `,
    });
  }
}

export default new MailService();
