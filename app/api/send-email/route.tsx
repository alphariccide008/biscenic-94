import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Only initialize Resend if the API key is available
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not found, skipping email send")
      return NextResponse.json({
        success: true,
        message: "Message received (email service not configured)",
      })
    }

    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (audienceId) {
      try {
        await resend.contacts.create({
          email,
          audienceId,
        })
      } catch (error) {
        console.warn("Failed to add contact to audience:", error)
      }
    }

    await resend.emails.send({
      from: "contact@biscenic.com",
      to: "admin@biscenic.com",
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 })
  }
}
