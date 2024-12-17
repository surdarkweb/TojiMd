import fetch from 'node-fetch'; // Import fetch for API requests

let handler = async (m, { conn, args }) => {
  let text = args.join(' '); // Get the URL from the message arguments

  if (!text) {
    return await conn.sendMessage(m.chat, { text: '❗ Please provide the URL of an Instagram video.' }, { quoted: m });
  }

  try {
    // Show loading indicator (can be customized as per your needs)
    await conn.sendMessage(m.chat, { text: '🔄 Fetching Instagram content... Please wait!' }, { quoted: m });

    // Construct the API URL for Instagram video download
    const apiUrl = `https://api.neastooid.xyz/api/downloader/igdl?url=${encodeURIComponent(text)}`;
    
    // Fetch data from the API
    const res = await fetch(apiUrl);
    const api_response = await res.json();

    // Validate API response
    if (!api_response.success || !api_response.data || !api_response.data[0] || !api_response.data[0].url) {
      return await conn.sendMessage(m.chat, { text: '❌ No media found or invalid response from the API.' }, { quoted: m });
    }

    // Extract the video URL and thumbnail
    const videoUrl = api_response.data[0].url;
    const thumbnail = api_response.data[0].thumbnail;
    
    // Set the caption for the video
    const cap = `✨ *Enjoy your video!* 🎥\n🔥 *Powered by TOJI MD* 💻`;

    // Send the Instagram video message
    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl },
        caption: cap,
        thumbnail: { url: thumbnail }, // Optionally include a thumbnail
      },
      { quoted: m }
    );
  } catch (error) {
    // Handle errors gracefully
    await conn.sendMessage(m.chat, { text: `⚠️ An error occurred: ${error.message}` }, { quoted: m });
  }
};

// Command metadata
handler.help = ['ig', 'instagram', 'insta', 'igvid', 'igvideo'];
handler.tags = ['downloader'];
handler.command = /^(ig|instagram|insta|igvid|igvideo)$/i;

export default handler;