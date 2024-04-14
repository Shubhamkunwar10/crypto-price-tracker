import { createCanvas } from "canvas";
import { writeFileSync } from "fs";

async function generateImage(text) {
  // Replace tab characters with spaces
  //   text = text.replace(/\t/g, "    ");

  // write code to create canvas and draw image
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.imageSmoothingEnabled = true;

  ctx.fillStyle = "#000";
  ctx.font = "bold 30px Arial";

  // Split text into lines
  const lines = text.split("\n");
  const lineHeight = 40; // Adjust this based on your font size

  // Calculate vertical position to center the text
  const verticalPosition = (canvas.height - lines.length * lineHeight) / 2;

  // Render each line of text
  lines.forEach((line, index) => {
    const y = verticalPosition + index * lineHeight;
    ctx.fillText(line, canvas.width / 2, y);
  });

  return canvas.toBuffer("image/png");
}

function formatCoinPrice(coinJson) {
  let formattedCoinData = ""
  // for coin in coinJson:


}


const coinJson = [
  {"name": "BTC", "price": "24000"},
  {"name": "ATOM", "price": "10.12"},
  {"name": "XPRT", "price": "10.88"},
  {"name": "JUNO", "price": "9.01"},
  {"name": "INJ", "price": "40.01"}
]

const image = await generateImage(
  "\n$BTC\t$24,000\n#ATOM\t$10.12\n#XPRT\t$10.88\n#JUNO\t$9.01\n#JUNO\t$9.01\n#JUNO\t$9.01\n#JUNO\t$9.01"
);
// save this image
writeFileSync("1.png", image);
// write code to upload image to twitter

export { generateImage };
