import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: "A sleek, friendly, isometric 3D render of a small dodo robot designed for a digital agency called 'Sogni Digitali'. The robot should look like it's floating. The design is 'Cyber-Luxury': matte dark navy and polished gold metal plating, with neon Cyan (cyan) glow accents around its jointed beak and eyes. The body is round and compact, with miniature glowing hover-thrusters where its legs would be. The tiny wings are elegant, geometric, glowing gold energy panels. Its eyes are subtle LED screens showing a curious expression. The robot is facing slightly towards the right. The style is minimalist yet highly tech, matching the 'Sogni Digitali' logo. Isolated on a transparent background.",
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    const base64EncodeString = response.generatedImages[0].image.imageBytes;
    fs.writeFileSync('public/my-dodo.png', Buffer.from(base64EncodeString, 'base64'));
    console.log("Image generated and saved to public/my-dodo.png");
  } catch (e) {
    console.error(e);
  }
}

generate();
