let handler = async (m, { conn }) => {
  try {
    // Ensure the command is used in a group
    if (!m.isGroup) throw 'This command can only be used in group chats.';

    // Fetch group metadata
    const groupMetadata = await conn.groupMetadata(m.chat);
    if (!groupMetadata) throw 'Failed to fetch group metadata. Please try again.';

    // Check if the bot is an admin
    const botParticipant = groupMetadata.participants.find(p => p.id === conn.user.jid);
    if (!botParticipant?.admin) throw 'I need to be an admin to set the group profile picture!';

    // Check if the message has an attached or quoted image
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!/image/.test(mime)) throw 'Please reply to an image to set as the group profile picture.';

    // Download the image
    let imgBuffer = await q.download();
    if (!imgBuffer) throw 'Failed to download the image. Ensure the media is accessible and try again.';

    // Update the group profile picture
    await conn.updateProfilePicture(m.chat, imgBuffer);
    m.reply('The group profile picture has been updated successfully!');
  } catch (e) {
    console.error(e);
    m.reply(`Error: ${e.message || e}`);
  }
};

handler.help = ['setgcpp'];
handler.tags = ['group'];
handler.command = /^setgcpp$/i;

handler.group = true; // Restrict to group chats
handler.botAdmin = true; // Require the bot to be an admin to execute

export default handler;