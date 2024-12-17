const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Set a delay time in milliseconds (1 second here, adjust as needed)
const RATE_LIMIT_DELAY = 1000; // 1000 ms = 1 second

let handler = async (m, { conn }) => {
  try {
    // Ensure the command is used in a group
    if (!m.isGroup) throw 'This command can only be used in group chats.';

    // Fetch group metadata
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants;

    // Check if the bot is an admin
    const botAdmin = participants.find(p => p.id === conn.user.jid && p.admin);
    if (!botAdmin) throw 'I need to be an admin to kick members!';

    // Check if the sender is an admin
    const senderAdmin = participants.find(p => p.id === m.sender && p.admin);
    if (!senderAdmin) throw 'Only group admins can use this command!';

    // Filter out admins from the participants list
    const membersToKick = participants
      .filter(p => !p.admin && p.id !== conn.user.jid) // Exclude admins and the bot itself
      .map(p => p.id);

    if (membersToKick.length === 0) throw 'There are no non-admin members to kick.';

    // Kick all non-admin members with a delay between each action
    for (let member of membersToKick) {
      // Ensure the bot doesn't perform too many actions in a short time
      await conn.groupParticipantsUpdate(m.chat, [member], 'remove');
      
      // Introduce a delay to avoid hitting rate limits
      await delay(RATE_LIMIT_DELAY); // Adjust this delay as needed (e.g., 1000 ms = 1 second)
    }

    m.reply(`Successfully kicked ${membersToKick.length} member(s).`);

  } catch (e) {
    console.error(e);
    m.reply(`Error: ${e.message || e}`);
  }
};

handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = /^kickall$/i;

handler.group = true; // Restrict to group chats
handler.admin = true; // Require the user to be an admin to use this command
handler.botAdmin = true; // Require the bot to be an admin to execute

export default handler;