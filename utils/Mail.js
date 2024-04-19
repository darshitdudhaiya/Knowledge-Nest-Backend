import nodemailer from "nodemailer";

class Mail {
  static async send(reciverEmail, Password) {
    const html_content = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Registration Confirmation</title>
    </head>
    <body>
        <h2>Thank you for registering!</h2>
        <p>Your registration was successful. Welcome aboard!</p>
    `;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "darshitdudhaiya201@gmail.com",
        pass: "tzka zrxd ggxx lvxe",
      },
    });
    const info = await transporter.sendMail({
      from: "darshitdudhaiya201@gmail.com", // sender address
      to: reciverEmail, // list of receivers
      subject: "Registration Confirmation", // Subject line
      text: "Thank you for registering!", // plain text body
      html:
        html_content +
        ```
      <br/>
      <p>Email : ${reciverEmail}</p>
      <br/>
      <p>Password : ${Password}</p>
      </body>
      </html>
      ```, // html body
    });
  }
}

export default Mail;
