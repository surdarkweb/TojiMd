let handler = async (m, { conn, args }) => {
  let q = m.quoted ? m.quoted : m; // Check for quoted message
  let mime = (q.msg || q).mimetype || q.mediaType || ''; // Get MIME type

  if (/image/.test(mime)) {
    // Download the image
    let imageBuffer = await q.download();

    // Set profile picture
    await conn.updateProfilePicture(conn.user.jid, imageBuffer);

    m.reply('Success! Profile picture updated.');
  } else if (args[0] && /https?:\/\//.test(args[0])) {
    // Set the profile picture using a URL
    await conn.updateProfilePicture(conn.user.jid, { url: args[0] });
    m.reply('Success! Profile picture updated.');
  } else {
    throw 'Please reply to an image or provide a URL.';
  }
};

handler.help = ['setpp'];
handler.tags = ['owner'];
handler.command = /^setpp$/i;

handler.rowner = true; // Restrict to bot owner

export default handler;