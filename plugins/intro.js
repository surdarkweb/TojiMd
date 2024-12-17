let handler = async (m, { conn, usedPrefix, command }) => {
  // Silva's Intro Details
  let name = m.pushName || conn.getName(m.sender);
  let profileImage = 'https://i.ibb.co/8NyZV1Q/image.jpg'; // Silva's profile image
  let sourceURL = 'https://github.com/Johanlieb34/TojiMd'; // GitHub repo URL
  let contactLink = 'https://wa.me/2349134457509'; // Silva's WhatsApp contact
  let channelLink = 'https://whatsapp.com/channel/0029VanxGm5J3jv39RvJIM39'; // Channel URL
  let audioUrl = 'https://cdn.jsdelivr.net/gh/Johanlieb34/Agar@main/pikachu.mp3'; // Intro sound
  
  // Context for quoted message
  let quotedContext = {
    key: {
      fromMe: false,
      participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '254700143167@s.whatsapp.net' } : {}),
    },
    message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${name},;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
      },
    },
  };

  // Intro Text
  let introText = `
𖢘𖢘𖢘𖢘𖢘𖢘𖢘𖢘
│       「 𝗠𝗬 𝗜𝗡𝗧𝗥𝗢 」
│ Name      : king johan
│ Location  : Nigeria 🍼
│ Gender    : Male
│ Age       : 17
│ Phone     : [Click Here](${contactLink})
│ Projects  : TOJI MD, kings APIs
│ GitHub    : [GitHub Repo](${sourceURL})
│ Channel   : [Join Channel](${channelLink})
│ Status    : Frontend Dev, Bot Dev, Software Dev.
𖢘𖢘𖢘𖢘𖢘𖢘𖢘𖢘
`;

  // Audio and Image Message
  let doc = {
    audio: { url: audioUrl },
    mimetype: 'audio/mpeg',
    ptt: true,
    waveform: [100, 50, 80, 90, 100, 60, 100, 70],
    fileName: 'Intro_Toji',
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: 'TOJI MD Intro',
        body: 'Learn more about king johanTech here!',
        thumbnailUrl: profileImage,
        sourceUrl: 'https://whatsapp.com/channel/0029Vail87sIyPtQoZ2egl1h',
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  };

  // Send Messages
  await conn.sendMessage(m.chat, { text: introText, contextInfo: doc.contextInfo }, { quoted: quotedContext });
  await conn.sendMessage(m.chat, doc, { quoted: quotedContext });
};

handler.help = ['intro'];
handler.tags = ['info'];
handler.command = /^(intro)$/i;

export default handler;
