import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get the current user
    const user = await currentUser();
    
    // Check authentication
    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to submit a custom order request" },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.details) {
      return NextResponse.json(
        { error: "Please provide all required information" },
        { status: 400 }
      );
    }
    
    // Here you would typically:
    // 1. Save order to your database
    // 2. Send email notifications
    // 3. Process any additional logic
    
    // For this implementation, we'll just return success
    // In a real app, you would integrate with your backend systems
    
    console.log("Custom order received:", {
      userId: user.id,
      ...data,
      timestamp: new Date().toISOString(),
    });
    
    return NextResponse.json({ 
      success: true,
      message: "Your custom order request has been received. We'll contact you soon!"
    });
    
  } catch (error) {
    console.error("Error processing custom order:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 }
    );
  }
} 