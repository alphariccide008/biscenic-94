import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Temporary mock response until AI SDK compatibility is resolved
    const mockResponse = {
      role: "assistant",
      content:
        "Thank you for your message! I'm a helpful assistant for BISCENIC, your luxury furniture and home decor brand. How can I help you today? Please note that our AI chat is currently being updated for better performance.",
    }

    // Return a simple JSON response for now
    return NextResponse.json({
      success: true,
      message: mockResponse.content,
      response: mockResponse,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Sorry, I'm currently unavailable. Please try again later.",
      },
      { status: 500 },
    )
  }
}
