let handler = async (m, { conn }) => {
  try {
    // Ensure the command is used in a group
    if (!m.isGroup) throw 'This command can only be used in group chats.';

    // Command to make the bot leave the group
    await conn.groupLeave(m.chat);

    m.reply('I have left the group successfully!');
  } catch (e) {
    console.error(e);
    m.reply(`Error: ${e.message || e}`);
  }
};

handler.help = ['leavegc'];
handler.tags = ['group'];
handler.command = /^leavegc$/i;
handler.group = true; // Restrict to group chats

export default handler;