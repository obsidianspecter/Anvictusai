import { type NextRequest, NextResponse } from "next/server"

// Adjust this to your own backend URL
const API_URL = "http://localhost:8000"

// Handle POST /api/visus (Image Upload to /upload)
export async function POST(request: NextRequest) {
  try {
    // Parse form data (for image + message)
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

    // Example of a response shape: { result: "Analysis text..." }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error processing image:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      console.error("Unknown error processing image:", error)
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}

// Handle GET /api/visus?query=... (Chat to /chat)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Proxy to your local /chat endpoint
    // e.g. your FastAPI/Ollama code expects x-www-form-urlencoded
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `query=${encodeURIComponent(query)}`,
    })

    const data = await response.json()

    if (!response.ok) {
      // data.error might come from the backend
      throw new Error(data.error || "Failed to process chat query")
    }

    // Return JSON shaped as { response: "..." }
    // so your front-end can do: setChatResponse(data.response)
    return NextResponse.json({ response: data.response })
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error processing chat query:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      console.error("Unknown error processing chat query:", error)
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}
