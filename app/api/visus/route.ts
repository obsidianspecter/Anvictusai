import { type NextRequest, NextResponse } from "next/server"

// Adjust this to your own backend URL
const API_URL = "http://localhost:8000"

// Handle POST /api/visus
export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData()
    const image = formData.get("image") as File
    const message = formData.get("message") as string

    if (!image || !message) {
      return NextResponse.json({ error: "Image and message are required" }, { status: 400 })
    }

    // Forward to your local backend
    const backendFormData = new FormData()
    backendFormData.append("image", image)
    backendFormData.append("message", message)

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: backendFormData,
    })

    if (!response.ok) {
      throw new Error("Failed to process image")
    }

    // Return JSON back to the client
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    // Safe error handling: check if 'error' is an Error instance
    if (error instanceof Error) {
      console.error("Error processing image:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      console.error("Error processing image:", error)
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}

// Handle GET /api/visus
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `query=${encodeURIComponent(query)}`,
    })

    const data = await response.json()

    if (!response.ok) {
      // If backend gave error details, throw that
      throw new Error(data.error || "Failed to process chat query")
    }

    return NextResponse.json(data)
  } catch (error) {
    // Safe error handling for GET
    if (error instanceof Error) {
      console.error("Error processing chat query:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      console.error("Error processing chat query:", error)
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}
