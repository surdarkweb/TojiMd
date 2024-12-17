let handler = async (m, { conn }) => {
  try {
    // Ensure the command is used in a group
    if (!m.isGroup) throw 'This command can only be used in group chats.';

    // Fetch group metadata
    const groupMetadata = await conn.groupMetadata(m.chat);
    const botAdmin = groupMetadata.participants.find(p => p.id === conn.user.jid && p.admin);

    // Check if the bot is an admin
    if (!botAdmin) throw 'I need to be an admin to reset the group link!';

    // Reset the group invite link
    await conn.groupRevokeInvite(m.chat);

    // Get the new group invite link
    const newGroupInviteCode = await conn.groupInviteCode(m.chat);
    const newGroupLink = `https://chat.whatsapp.com/${newGroupInviteCode}`;

    // Send the new group link
    m.reply(`The group link has been reset! Here is the new link: ${newGroupLink}`);
  } catch (e) {
    console.error(e);
    m.reply(`Error: ${e.message || e}`);
  }
};

handler.help = ['resetgclink'];
handler.tags = ['group'];
handler.command = /^resetgclink$/i;

handler.group = true; // Restrict to group chats
handler.botAdmin = true; // Require the bot to be an admin to execute

export default handler;