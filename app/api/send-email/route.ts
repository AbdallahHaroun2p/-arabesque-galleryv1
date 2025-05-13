import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "arabesquegallery@outlook.com",
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Email server connection error:", error);
  } else {
    console.log("Email server connection is ready to take messages");
  }
});

export async function POST(request: Request) {
  try {
    let data;
    let attachments = [];
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      data = Object.fromEntries(
        Array.from(formData.entries()).filter(([key]) => !key.startsWith('file'))
      );
      
      // Handle file attachments
      for (const [key, value] of formData.entries()) {
        if (key.startsWith('file') && value instanceof File) {
          const buffer = await value.arrayBuffer();
          attachments.push({
            filename: value.name,
            content: Buffer.from(buffer),
          });
        }
      }
    } else {
      data = await request.json();
    }

    const { type, ...emailData } = data;

    let emailContent;
    if (type === 'contact') {
      emailContent = {
        subject: `Contact Form: ${emailData.subject || 'New Message'}`,
        text: `
Name: ${emailData.name}
Email: ${emailData.email}
Message: ${emailData.message}
        `,
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${emailData.name}</p>
<p><strong>Email:</strong> ${emailData.email}</p>
<p><strong>Message:</strong></p>
<p>${emailData.message}</p>
        `,
      };
    } else if (type === 'custom-order') {
      emailContent = {
        subject: 'New Custom Order Request',
        text: `
Name: ${emailData.firstName} ${emailData.lastName}
Email: ${emailData.email}
Phone: ${emailData.phone}
Product Type: ${emailData.productType}
Dimensions: ${emailData.dimensions || 'Not specified'}
Project Description: ${emailData.description}
${attachments.length > 0 ? `\nAttached Files: ${attachments.map(a => a.filename).join(', ')}` : ''}
        `,
        html: `
<h2>New Custom Order Request</h2>
<p><strong>Name:</strong> ${emailData.firstName} ${emailData.lastName}</p>
<p><strong>Email:</strong> ${emailData.email}</p>
<p><strong>Phone:</strong> ${emailData.phone}</p>
<p><strong>Product Type:</strong> ${emailData.productType}</p>
<p><strong>Dimensions:</strong> ${emailData.dimensions || 'Not specified'}</p>
<p><strong>Project Description:</strong></p>
<p>${emailData.description}</p>
${attachments.length > 0 ? `<p><strong>Attached Files:</strong> ${attachments.map(a => a.filename).join(', ')}</p>` : ''}
        `,
      };
    }

    if (!emailContent) {
      return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    await transporter.sendMail({
      from: '"Arabesque Gallery Website" <arabesquegallery@outlook.com>',
      to: "arabesquegallery@outlook.com",
      ...emailContent,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 