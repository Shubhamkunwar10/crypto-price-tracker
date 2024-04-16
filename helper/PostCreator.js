import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

async function generateTweetImage(cryptoLogo,price, percentageChange, companyName, backgroundImageUrl) {
  const canvas = createCanvas(720, 600); // Twitter recommends 16:9 aspect ratio for images
  const ctx = canvas.getContext('2d');

  // Load and draw background image
  const backgroundImage = await loadImage(backgroundImageUrl);
  ctx.filter = 'blur(250px)'; // Adjusted blur filter
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


  // Write company name
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(companyName, canvas.width / 2, 100);

  // Write Logo
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`${cryptoLogo}`, canvas.width / 2,canvas.height*0.5 );
  
  // Write price
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Current Price: ${price}`, canvas.width / 2, canvas.height*0.6);
  
  // Write percentage change
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Change: ${percentageChange}%`, canvas.width / 2,canvas.height*0.68);

  // Add educational graphics or icons
  const educationIcon = await loadImage('logo.jpg'); // Replace 'education_icon.png' with your icon file path
  const iconSize = 100;
  const iconX = canvas.width *0.45;
  const iconY = 130
  const radius = 50; // Radius for the circle around the icon
  ctx.save(); // Save the current drawing state
  ctx.beginPath();
  ctx.arc(iconX + iconSize / 2, iconY + iconSize / 2, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip(); // Clip the context to the circle
  ctx.drawImage(educationIcon, iconX, iconY, iconSize, iconSize);
  ctx.restore(); // Restore the drawing state

  // Write educational message
  ctx.font = 'italic 18px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.fillText('Learn more about investing and finance on our website!', 10, canvas.height - 50);

  // Convert canvas to image data
  const imgData = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(imgData, 'base64');

  // Save as PNG
  fs.writeFileSync('generated_tweet_image.png', buf);

  return buf; // Return image data
}




// Example usage
generateTweetImage('#INJ','$346', '20', 'Cosmos whales ', 'bg.jpg').then((imageData) => {
    console.log('Tweet image generated and saved as generated_tweet_image.png');
});
