
    
    
    

        


    


 
 import moment from 'moment-timezone';  // Ensure you have this for date formatting

let handler = async (m, { conn, text, command }) => {

  try {

    // Ensure the group name is provided by the user

    if (!text) return m.reply(`Usage: ${command} <groupname> ✍️`);

    const groupName = text.trim();

    // Validate the group name for safety (optional)

    if (groupName.length < 3) return m.reply('Group name must be at least 3 characters long.');

    // Start the group creation process

    let createdGroup;

    try {

      createdGroup = await conn.groupCreate(groupName, []); // No participants initially

    } catch (err) {

      console.error(`Failed to create group: ${err.message}`);

      return m.reply('⚠️ Failed to create the group. Please ensure the bot has the necessary permissions.');

    }

    // Attempt to retrieve the invite link

    let inviteCode;

    try {

      inviteCode = await conn.groupInviteCode(createdGroup.id);

    } catch (err) {

      console.error(`Failed to fetch the invite code: ${err.message}`);

      return m.reply('⚠️ Could not retrieve the invite link. Please try again later.');

    }

    // Prepare group creation details and format them

    const groupDetailsMessage = `    「 Group Created 」 🏗️

    

▸ 🏷️ Name: ${createdGroup.subject}

▸ 👤 Owner: @${createdGroup.owner.split('@')[0]}

▸ 📅 Created On: ${moment(createdGroup.creation * 1000).tz("Asia/Karachi").format('DD/MM/YYYY HH:mm:ss')}

🔗 Join Now: https://chat.whatsapp.com/${inviteCode}`;

    // Send a formatted response with group information and invite link

    await conn.sendMessage(m.chat, {

      text: groupDetailsMessage,

      mentions: await conn.parseMention(groupDetailsMessage)  // Mention the owner in the response

    }, { quoted: m });

  } catch (e) {

    // Global error handler with specific context

    console.error(`General error in command '${command}': ${e.message || e}`);

    m.reply(`⚠️ An unexpected error occurred. Please try again later.`);

  }

};

handler.help = ['creategc <group name>', 'creategroup <group name>'];

handler.tags = ['group'];

handler.command = /^(creategc|creategroup)$/i;

export default handler;   

 


    