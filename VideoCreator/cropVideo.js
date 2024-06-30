import { exec } from 'child_process'
import cron from 'node-cron'

// Define the path to your video file
const videoFilePath = 'path/to/your/video.mp4';

// Define the output directory where the cut videos will be saved
const outputDirectory = 'path/to/output/directory/';

// Function to cut the video
function cutVideo() {
    // Generate a unique filename based on the current timestamp
    const timestamp = new Date().getTime();
    const outputFileName = `cut_${timestamp}.mp4`;

    // Command to cut the video using ffmpeg
    const command = `ffmpeg -i ${videoFilePath} -ss 0 -t 30 -c copy ${outputDirectory}${outputFileName}`;

    // Execute the command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error cutting video: ${error}`);
            return;
        }
        console.log(`Video cut successfully: ${outputFileName}`);
    });
}

// Schedule the task to run every 4 hours
cron.schedule('0 */4 * * *', () => {
    console.log('Cutting video...');
    cutVideo();
});
