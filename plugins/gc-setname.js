let handler = async (m, { conn }) => {
  try {
    // Ensure the command is used in a group
    if (!m.isGroup) throw 'This command can only be used in group chats.';

    // Fetch group metadata
    const groupMetadata = await conn.groupMetadata(m.chat);

    // Check if the bot is an admin
    const botParticipant = groupMetadata.participants.find(p => p.id === conn.user.jid);
    if (!botParticipant?.admin) throw 'I need to be an admin to change the group name!';

    // Extract group name from the message (skip 'setgcname ' and ensure no extra chars)
    let groupName = m.text.trim().slice(9).trim();  // Skip the 'setgcname ' part

    // If no group name is provided, show an error and exit
    if (!groupName) throw 'Please provide a new name for the group after the command.';

    // Check if the group name starts with unwanted characters and remove them
    if (groupName[0] === 'e') {
      groupName = groupName.slice(1).trim();
    }

    // Update the group name
    await conn.groupUpdateSubject(m.chat, groupName);

    m.reply(`The group name has been updated to: ${groupName}`);
  } catch (e) {
    console.error(e);
    m.reply(`Error: ${e.message || e}`);
  }
};

handler.help = ['setgcname'];
handler.tags = ['group'];
handler.command = /^setgcname$/i;
handler.group = true; // Restrict to group chats
handler.botAdmin = true; // Require the bot to be an admin to execute

export default handler;