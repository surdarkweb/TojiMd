let handler = async (m, { conn, args }) => {
  try {
    // Ensure the user provided a Mediafire URL
    const mediafireUrl = args.join(' ');
    if (!mediafireUrl) return m.reply('⚠️ Please provide a valid Mediafire URL.');

    // Check if the URL is a valid Mediafire link
    const mediafirePattern = /https:\/\/(www\.)?mediafire\.com\/.*$/;
    if (!mediafirePattern.test(mediafireUrl)) return m.reply('⚠️ The URL must be a valid Mediafire link.');

    // Construct the API URL
    const apiUrl = `https://bk9.fun/download/mediafire?url=${encodeURIComponent(mediafireUrl)}`;

    // Fetch the API response
    const res = await fetch(apiUrl);
    const api_response = await res.json();

    // Check if the response is valid and contains the link
    if (api_response.status && api_response.BK9 && api_response.BK9.link) {
      const { link, name, mime, size, uploaded } = api_response.BK9;

      // Mime types mapping
      const mimeTypes = {
        "mp4": "video/mp4",
        "pdf": "application/pdf",
        "zip": "application/zip",
        "rar": "application/x-rar-compressed",
        "7z": "application/x-7z-compressed",
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "png": "image/png",
      };

      // Get mimetype from file extension, defaulting to "application/octet-stream"
      const mimetype = mimeTypes[mime] || "application/octet-stream";

      const caption = `
        📂 *📥 MEDIAFIRE FILE DETAILS*
        
        📄 *Filename:* ${name || "Unknown"}
        📏 *Size:* ${size || "Unknown"}
        🗂️ *Extension:* ${mime || "Unknown"}
        📅 *Uploaded On:* ${uploaded || "Unknown"}
      `.trim();

      // Send the file
      await conn.sendMessage(m.chat, {
        document: { url: link },
        fileName: name || "file",
        mimetype: mimetype,
      }, { quoted: m });

      // Notify the user that the download is complete
      return m.reply(`✅ *Download Complete!* 🎉\n\n${caption}`);
    }

    // Handle cases where the response does not contain the expected data
    return m.reply(`❌ *Failed to fetch the download link. Please check the link or try again later.*`);

  } catch (error) {
    console.error('⚠️ Error fetching MediaFire data:', error.message);
    return m.reply(`⚠️ *An error occurred while processing your request. Please try again later.*`);
  }
};

handler.help = ['downloadmediafire'];
handler.tags = ['download'];
handler.command = /^downloadmediafire$/i; // Command trigger

export default handler;