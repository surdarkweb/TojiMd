let handler = async (m, { conn, args }) => {
  try {
    // Ensure the command is used in a group
    if (!m.isGroup) throw 'This command can only be used in group chats.';

    // Fetch group metadata
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants;

    // Check if the bot is an admin
    const botAdmin = participants.find(p => p.id === conn.user.jid && p.admin);
    if (!botAdmin) throw 'I need to be an admin to kick someone!';

    // Check if the sender is an admin
    const senderAdmin = participants.find(p => p.id === m.sender && p.admin);
    if (!senderAdmin) throw 'Only group admins can use this command!';

    // Determine the target to kick
    let target;
    if (m.mentionedJid && m.mentionedJid.length) {
      target = m.mentionedJid[0]; // Target the mentioned user
    } else if (m.quoted && m.quoted.sender) {
      target = m.quoted.sender; // Target the user from the replied message
    } else if (args[0]) {
      target = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'; // Convert number to JID format
    } else {
      throw 'Please tag the user, reply to their message, or provide their phone number to kick.';
    }

    // Check if the target is a valid participant
    if (!participants.find(p => p.id === target)) throw 'The user is not found in this group.';

    // Kick the user
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
    m.reply(`Successfully kicked @${target.split('@')[0]}`, null, { mentions: [target] });

  } catch (e) {
    console.error(e);
    m.reply(`Error: ${e.message || e}`);
  }
};

handler.help = ['kick @user', 'kick (reply to message)', 'kick (phone number)'];
handler.tags = ['group'];
handler.command = /^kick$/i;

handler.group = true; // Restrict to group chats
handler.admin = true; // Require the user to be an admin to use this command
handler.botAdmin = true; // Require the bot to be an admin to execute

export default handler;