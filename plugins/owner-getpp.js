let handler = async (m, { conn }) => {
  try {
    // Determine the target
    let target = m.isGroup ? (m.quoted ? m.quoted.sender : m.sender) : m.chat;

    // Fetch the profile picture URL
    let ppUrl = await conn.profilePictureUrl(target, 'image').catch(() => null);
    if (!ppUrl) throw 'No profile picture found!';

    // Send the profile picture
    await conn.sendMessage(m.chat, { image: { url: ppUrl }, caption: `Profile picture of ${target.split('@')[0]}` }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('Failed to fetch profile picture. The user might not have one!');
  }
};

handler.help = ['getpp'];
handler.tags = ['tools'];
handler.command = /^getpp$/i;

export default handler;