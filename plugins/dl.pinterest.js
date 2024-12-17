import axios from 'axios';

const handler = async (m, { conn, args, command }) => {
  if (!args[0]) {
    return m.reply(`❗ *Example:* ${prefix + command} pinterest_url`);
  }

  const pinterestUrl = args.join(' ').trim();
  
  // Notify user that the bot is processing
  await m.reply('⏳ *Fetching media from Pinterest...*');

  try {
    // Fetch the download details for the Pinterest link (image or video)
    const downloadApiUrl = `https://btch.us.kg/download/pindl?url=${encodeURIComponent(pinterestUrl)}`;
    const response = await axios.get(downloadApiUrl);

    if (response.data.status === true && response.data.result.success) {
      const mediaType = response.data.result.data.media_type;
      const downloadUrl = mediaType === 'image' ? response.data.result.data.image : response.data.result.data.video;

      if (downloadUrl) {
        // Send media to the chat
        if (mediaType === 'video/mp4') {
          // Send video message if it's a video
          await conn.sendMessage(m.chat, {
            video: { url: downloadUrl },
            caption: `🎉 *Video from your Pinterest link*`
          }, { quoted: m });
        } else {
          // Send image message if it's an image
          await conn.sendMessage(m.chat, {
            image: { url: downloadUrl },
            caption: `🎉 *Image from your Pinterest link*`
          }, { quoted: m });
        }
      } else {
        return m.reply("⚠️ *No media found for the provided Pinterest URL.*");
      }
    } else {
      return m.reply("⚠️ *Failed to fetch media from Pinterest.*");
    }
  } catch (error) {
    console.error(error);
    return m.reply("❌ *An error occurred while fetching data from Pinterest.*");
  }
};

handler.help = ['pindl', 'pinterestdl'];
handler.tags = ['tools'];
handler.command = /^pindl|pinterestdl$/i;

export default handler;