import axios from 'axios';
import yts from 'yt-search'; // Assuming yt-search is installed

const handler = async (m, { conn, args }) => {
  try {
    let text = args.join(' '); // Get the search query from arguments
    if (!text) return m.reply('🎵 *Example:* .play highest in the room');

    // Notify user of processing
    await m.reply('🔍 *Searching for the song...*');

    // Perform a search using yts (YouTube Search)
    let search = await yts(text);
    if (!search || search.videos.length === 0) {
      return m.reply('❌ *No video found.* Please try with a different keyword.');
    }

    // Get the first video from the search results
    let video = search.videos[0];
    const { title, url, thumbnail } = video; // Extract thumbnail from yt-search

    // Use the custom API to fetch audio details
    const apiUrl = `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.status || !response.data.data || !response.data.data.dl) {
      return m.reply('🚫 *Error fetching audio from the URL.* Please try again later.');
    }

    // Extract audio download link
    const { dl } = response.data.data;

    // Step 1: Send the thumbnail and video information first
    await conn.sendMessage(m.chat, {
      image: { url: thumbnail }, // Send thumbnail as an image
      caption: `🎶 *Title:* _${title}_\n🔗 *Link:* _${url}_`, // Include song details in the caption
    }, { quoted: m });

    // Step 2: Send the audio file as a separate message
    await conn.sendMessage(m.chat, {
      audio: { url: dl }, // Attach the audio file
      mimetype: 'audio/mpeg', // Correct MIME type for MP3 audio
      fileName: `${title}.mp3`, // Set the file name to the song title
      ptt: false, // Set to false for regular audio (not voice note)
    }, { quoted: m });

  } catch (error) {
    console.error("Error in play2/song2 command:", error);
    m.reply("⚠️ *An error occurred while processing your request.* Please try again.");
  }
};

handler.help = ['play', 'song'];
handler.tags = ['media'];
handler.command = /^play|song$/i;

export default handler;