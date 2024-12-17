let unlockHandler = async (m, { conn, isAdmin, isBotAdmin }) => {
  try {
    if (!isBotAdmin) return m.reply('⚠️ I need to be an admin to unlock the group.');
    if (!isAdmin) return m.reply('⚠️ Only group admins can use this command.');

    // Unlock the group (allow everyone to send messages)
    await conn.groupSettingUpdate(m.chat, 'not_announcement'); // 'not_announcement' unlocks the group

    m.reply('🔓 Group has been unlocked. Everyone can send messages now.');
  } catch (e) {
    console.error('Error in unlocking group:', e);
    m.reply('⚠️ Failed to unlock the group. Please try again later.');
  }
};

unlockHandler.help = ['unlockgc'];
unlockHandler.tags = ['group'];
unlockHandler.command = /^unlockgc$/i;
unlockHandler.group = true;
unlockHandler.admin = true;
unlockHandler.botAdmin = true;

export default unlockHandler;