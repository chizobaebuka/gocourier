interface WelcomeEmailProps {
    name: string
    role: "buyer" | "seller"
}

export const getWelcomeEmailTemplate = ({ name, role }: WelcomeEmailProps) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e3a8a; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { text-align: center; padding: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to GOCourier!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for joining GOCourier as a ${role}. We're excited to have you on board!</p>
              ${role === "seller"
            ? `<p>As a seller, you can now start listing your courier services and reach more customers.</p>`
            : `<p>As a buyer, you can now start booking courier services and track your shipments.</p>`
        }
              <p>If you have any questions, feel free to reach out to our support team.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} GOCourier. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
}

