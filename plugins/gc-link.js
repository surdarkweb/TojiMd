let handler = async (m, { conn }) => {
  try {
    // Ensure the command is used in a group
    if (!m.isGroup) throw 'This command can only be used in group chats.';

    // Fetch group metadata
    const groupMetadata = await conn.groupMetadata(m.chat);
    const botAdmin = groupMetadata.participants.find(p => p.id === conn.user.jid && p.admin);

    // Check if the bot is an admin
    if (!botAdmin) throw 'I need to be an admin to fetch the group link!';

    // Get the group invite link
    const groupInviteLink = await conn.groupInviteCode(m.chat);
    const fullGroupLink = `https://chat.whatsapp.com/${groupInviteLink}`;

    // Send the group link
    m.reply(`Here is the group link: ${fullGroupLink}`);
  } catch (e) {
    console.error(e);
    m.reply(`Error: ${e.message || e}`);
  }
};

handler.help = ['gclink'];
handler.tags = ['group'];
handler.command = /^gclink$/i;

handler.group = true; // Restrict to group chats
handler.botAdmin = true; // Require the bot to be an admin to execute

export default handler;