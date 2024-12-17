import fs from 'fs';

let handler = async (m, { conn }) => {
  // Load the audio file
  const audioUrl = 'https://cdn.jsdelivr.net/gh/Johanlieb34/Agar@main/AnimeRingtones (1).oga';

  // Define Themes with Updated Menu Options
  const themes = [
    `
    
   ╭───「 *TOJI MD BOT* 」───  
│ 👋 Hi, ${m.pushName || 'User'}!  
│ Welcome 🍼. Explore my commands below:  
╰──────────────  

*📜 Main Menu:*  
┌───❏ General Commands  
│ 🍼 alive       
│ 🍼 list    🍼 intro  
│ 🍼 ping       🍼 runtime  
│ 🍼 feature  
└────────────  

*🎥 Media & Downloads:*  
┌───❏ Downloads & Tools  
│ 🍼 send       🍼 facebook  
│ 🍼 instagram  🍼 mediafire  
│ 🍼 play              
│ 🍼 yta        🍼 ytv  
│ 🍼 tomp3      🍼 toptt  
│ 🍼 dalle      🍼 fetch  
│ 🍼 pdf        🍼 tourl  
└────────────  

*🎉 Fun & Entertainment:*  
┌───❏ Games & Fun  
│ 🍼 reaction   🍼 reactions  
│ 🍼 blur       🍼 cartoon  
│ 🍼 cheems     🍼 question  
│ 🍼 wyr        🍼 hack  
│ 🍼 textstyle  🍼 whatmusic  
│ 🍼 getbio  
└────────────  

*🤖 AI & Automation:*  
┌───❏ Smart Tools  
│ 🍼 civitai    🍼 image  
│ 🍼 gpt        🍼 chatbot  
│ 🍼 autoreply  🍼 autoresponse  
│ 🍼 autostatus 🍼 auto-bio  
└────────────  

*🔧 Tools & Utilities:*  
┌───❏ Productivity  
│ 🍼 calc       🍼 carbon  
│ 🍼 removebg   🍼 translate  
│ 🍼 tts        🍼 weather  
│ 🍼 wikipedia  🍼 google  
│ 🍼 technews  
└────────────  

*👥 Group Management:*  
┌───❏ Group Commands  
│ 🍼 antibot    🍼 antiviewonce  
│ 🍼 chatpin    🍼 groupreact  
│ 🍼 main-blocklist 🍼 banUser  
│ 🍼 broadcast  
└────────────  

*🔒 Admin Commands:*  
┌───❏ Admin Tools  
│ 🍼 antibotclone 🍼 antilink  
│ 🍼 antibadword  🍼 antispam  
│ 🍼 alwaysonline 🍼 jarvis  
│ 🍼 addsudo      🍼 resetuser  
│ 🍼 setprefix    🍼 exec  
└────────────  

*🎶 Music & Devotional:*  
┌───❏ Music Zone  
│ 🍼 playlist   🍼 play  
│ 🍼 musicdl    🍼 ganpatti  
│ 🍼 mahadev    🍼 shreeram  
└────────────  

*🪄 Anime & Reactions:*  
┌───❏ Anime Features  
│ 🍼 manhwa     🍼 waifupics  
│ 🍼 animequote 🍼 animeinfo  
└────────────  

*🛠️ Owner Tools:*  
┌───❏ Owner Panel  
│ 🍼 cleartmp   🍼 inspect  
│ 🍼 savefile   🍼 restart  
│ 🍼 setprivacy  🍼vv (to save once view photo)
└────────────  
          use the list command for more experience 
🍼 *Powered by King Johan 2024/2025*
    `,
    // Add similar blocks for the remaining themes...
  ];

  // Shuffle and pick a random theme
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];

  // Send the menu message
  await conn.sendMessage(
    m.chat,
    {
      text: randomTheme,
      contextInfo: {
        externalAdReply: {
          title: 'TOJI MD',
          body: 'KING JOHAN',
          thumbnailUrl: 'https://i.ibb.co/gTPG9WF/dca092a4ec1e6208f8dd16a413ef3dda.jpg', // Replace with your preferred image
          sourceUrl: 'https://whatsapp.com/channel/0029VanxGm5J3jv39RvJIM39', // Replace with your bot's repo or website
        },
      },
    },
    { quoted: m }
  );

  // Play the audio file smoothly
  await conn.sendMessage(
    m.chat,
    {
      audio: { url: audioUrl },
      mimetype: 'audio/mp4',
      ptt: false, // Set to true if you want it to appear as a voice note
      contextInfo: {
        externalAdReply: {
          title: 'Toji MD - Menu Music',
          body: 'Enjoy the vibes!',
          thumbnailUrl: 'https://i.ibb.co/gTPG9WF/dca092a4ec1e6208f8dd16a413ef3dda.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VanxGm5J3jv39RvJIM39',
        },
      },
    },
    { quoted: m }
  );
};

// Command Metadata
handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu'];

export default handler;
