import { NextRequest } from "next/server";
import { fetchTranscript } from "@/lib/youtube-transcript";

export async function POST(req: NextRequest) {
  console.log("FROM OUR ROUTE HANDLER:", req.body);
  const body = await req.json();
  const videoId = body.videoId;

  let transcript: Awaited<ReturnType<typeof fetchTranscript>>;

  try {
    transcript = await fetchTranscript(videoId);
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }));
    return new Response(JSON.stringify({ error: "Unknown error" }));
  }

  console.log("Transcript:", transcript);

  try {
    return new Response(
      JSON.stringify({ data: "return from our handler", error: null }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error }));
    return new Response(JSON.stringify({ error: "Unknown error" }));
  }
}
