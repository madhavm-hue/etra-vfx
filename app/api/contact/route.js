import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request) {
  try {
    const body = await request.json();

    const fullName = clean(body.fullName);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const company = clean(body.company);
    const service = clean(body.service);
    const message = clean(body.message);

    if (!fullName || !email || !service || !message) {
      return NextResponse.json(
        {
          message:
            "Please complete all required fields.",
        },
        {
          status: 400,
        },
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    const receivers = process.env
      .CONTACT_RECEIVER_EMAILS
      ?.split(",")
      .map((receiver) => receiver.trim())
      .filter(Boolean);

    if (
      !smtpUser ||
      !smtpPassword ||
      !receivers?.length
    ) {
      console.error(
        "Contact email environment variables are missing.",
      );

      return NextResponse.json(
        {
          message:
            "Email service is temporarily unavailable.",
        },
        {
          status: 500,
        },
      );
    }

    const transporter = nodemailer.createTransport({
      host:
        process.env.SMTP_HOST ||
        "smtp.gmail.com",
      port: Number(
        process.env.SMTP_PORT || 465,
      ),
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    await transporter.sendMail({
      from: `"ETRA Dreams Website" <${smtpUser}>`,
      to: receivers,
      replyTo: email,
      subject: `New website enquiry — ${service}`,
      text: `
New project enquiry received through the ETRA Dreams website.

Full Name: ${fullName}
Email: ${email}
Phone: ${phone || "Not provided"}
Company / Studio: ${company || "Not provided"}
Service Required: ${service}

Project Details:
${message}
      `.trim(),
      html: `
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 32px;
            background: #f7f5f7;
            color: #11152f;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          <div
            style="
              padding: 28px;
              background: #07071b;
              color: #ffffff;
            "
          >
            <p
              style="
                margin: 0 0 12px;
                color: #f50087;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1.8px;
                text-transform: uppercase;
              "
            >
              ETRA Dreams Website
            </p>

            <h1
              style="
                margin: 0;
                font-size: 30px;
                line-height: 1.15;
              "
            >
              New Project Enquiry
            </h1>
          </div>

          <div
            style="
              padding: 28px;
              background: #ffffff;
              border: 1px solid #e5dfe3;
            "
          >
            <table
              style="
                width: 100%;
                border-collapse: collapse;
              "
            >
              <tbody>
                <tr>
                  <td style="padding: 10px 0; color: #6b6878;">
                    Full Name
                  </td>
                  <td style="padding: 10px 0; font-weight: 700;">
                    ${escapeHtml(fullName)}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; color: #6b6878;">
                    Email
                  </td>
                  <td style="padding: 10px 0; font-weight: 700;">
                    ${escapeHtml(email)}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; color: #6b6878;">
                    Phone
                  </td>
                  <td style="padding: 10px 0; font-weight: 700;">
                    ${escapeHtml(phone || "Not provided")}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; color: #6b6878;">
                    Company / Studio
                  </td>
                  <td style="padding: 10px 0; font-weight: 700;">
                    ${escapeHtml(company || "Not provided")}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 0; color: #6b6878;">
                    Service
                  </td>
                  <td style="padding: 10px 0; font-weight: 700;">
                    ${escapeHtml(service)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              style="
                margin-top: 26px;
                padding-top: 24px;
                border-top: 1px solid #e5dfe3;
              "
            >
              <p
                style="
                  margin: 0 0 10px;
                  color: #6b6878;
                  font-size: 13px;
                  font-weight: 700;
                  text-transform: uppercase;
                "
              >
                Project Details
              </p>

              <p
                style="
                  margin: 0;
                  white-space: pre-wrap;
                  line-height: 1.7;
                "
              >${escapeHtml(message)}</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      {
        message: "Enquiry sent successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Contact form email error:", error);

    return NextResponse.json(
      {
        message:
          "Unable to send your enquiry right now. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}