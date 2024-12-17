let handler = async (m, { conn, isAdmin, isOwner, args }) => {
  try {
    // Ensure it's a group chat
    if (!m.isGroup) return m.reply('This command can only be used in group chats.');

    // Only admins or owners can set the group description
    if (!isAdmin && !isOwner) return m.reply('You need to be an admin to set the group description.');

    // Check if a description is provided
    const description = args.join(' ');
    if (!description) return m.reply('Please provide a description.');

    // Set the group description
    await conn.groupUpdateDescription(m.chat, description);
    m.reply('Group description updated successfully!');
  } catch (error) {
    console.error(error);
    m.reply('Failed to update group description.');
  }
};

handler.help = ['setdesc <description>'];
handler.tags = ['group'];
handler.command = /^setdesc$/i;

handler.group = true; // Ensure the command is for groups
handler.botAdmin = true; // Bot must be an admin
handler.owner = true; // Can be used by the owner and admins

export default handler;