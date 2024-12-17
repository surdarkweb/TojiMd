let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
  try {
    // Ensure the bot is an admin
    if (!isBotAdmin) return m.reply('🍼 I need to be an admin to lock the group.');

    // Ensure the user issuing the command is an admin
    if (!isAdmin) return m.reply('⚠️ Only group admins can use this command.');

    // Lock the group (restrict sending messages)
    await conn.groupSettingUpdate(m.chat, 'announcement'); // 'announcement' locks the group

    // Confirmation message
    m.reply('🔒 Group has been locked. Only admins can send messages now.');
  } catch (e) {
    console.error('Error in locking group:', e);
    m.reply('⚠️ Failed to lock the group. Please try again later.');
  }
};

handler.help = ['lockgc']; // Command help text
handler.tags = ['group']; // Command category
handler.command = /^lockgc$/i; // Command trigger (e.g., /lockgc)
handler.group = true; // Restrict command usage to groups
handler.admin = true; // Ensure the user is an admin
handler.botAdmin = true; // Ensure the bot is an admin

export default handler;