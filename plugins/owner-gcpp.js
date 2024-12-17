let handler = async (m, { conn }) => {
  try {
    // Get the group chat's profile picture
    const groupId = m.chat;  // This will get the current chat's group ID
    const groupPicUrl = await conn.profilePictureUrl(groupId, 'image'); // Fetch the group profile picture URL

    // Send the group profile picture as an image
    await conn.sendMessage(m.chat, { image: { url: groupPicUrl }, caption: 'Here is the group profile picture!' });

  } catch (e) {
    console.error(e);
    m.reply('Error: Unable to fetch group profile picture.');
  }
};

handler.help = ['getgcpp'];
handler.tags = ['info'];
handler.command = /^getgcpp$/i;

export default handler;