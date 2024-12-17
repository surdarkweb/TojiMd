let handler = async (m, { conn }) => {
  try {
    // Ensure the command is used in a group
    if (!m.isGroup) throw 'This command can only be used in group chats.';

    // Fetch group metadata
    const groupMetadata = await conn.groupMetadata(m.chat);

    // Check if the bot is an admin
    const botParticipant = groupMetadata.participants.find(p => p.id === conn.user.jid);
    if (!botParticipant?.admin) throw 'I need to be an admin to promote members!';

    // Ensure the command includes a mention or a user to promote
    let mentioned = m.mentionedJid[0];
    if (!mentioned) throw 'Please mention the person you want to promote.';

    // Check if the user is already an admin
    const userParticipant = groupMetadata.participants.find(p => p.id === mentioned);
    if (userParticipant?.admin) throw 'This person is already an admin.';

    // Promote the user to admin
    await conn.groupParticipantsUpdate(m.chat, [mentioned], 'promote');

    m.reply('The user has been promoted to admin!');
  } catch (e) {
    console.error(e);
    m.reply(`Error: ${e.message || e}`);
  }
};

handler.help = ['promote'];
handler.tags = ['group'];
handler.command = /^promote$/i;
handler.group = true; // Restrict to group chats
handler.botAdmin = true; // Require the bot to be an admin to execute

export default handler;