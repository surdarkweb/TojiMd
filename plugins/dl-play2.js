import axios from 'axios'; // < untuk esm
import fetch from 'node-fetch'; // < untuk esm

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text || !text.startsWith('https://')) {
        throw `[❗] Enter a valid YouTube URL!!\n\nexample:\n${usedPrefix + command} https://youtu.be/4rDOsvzTicY?si=3Ps-SJyRGzMa83QT`;    
    }

    await global.loading(m, conn);
   
    try {
        const response = await axios.get(`https://widipe.com/download/ytdl?url=${text}`);
        let res = response.data.result;

        if (!res || !res.mp3 || !res.url || !res.title || !res.thumbnail) {
            throw `[❗] Failed to fetch API data.  Check the URL or try again later`;
        }

        var { mp3, url, title, thumbnail, timestamp } = res;

        let audio = { 
            audio: { 
                url: mp3
            }, 
            mimetype: 'audio/mp4', 
            fileName: `${title}.mp3`, 
            contextInfo: { 
                externalAdReply: { 
                    showAdAttribution: true, 
                    mediaType: 2, 
                    title: '' + timestamp, 
                    body: '', 
                    sourceUrl: url, 
                    thumbnail: null // Default thumbnail jika fetch gagal
                }
            }
        };

        // Validasi URL thumbnail dan fetch jika valid
        if (thumbnail && thumbnail.startsWith('http')) {
            try {
                audio.contextInfo.externalAdReply.thumbnail = await (await fetch(thumbnail)).buffer();
            } catch (error) {
                console.error('Gagal mengambil thumbnail:', error);
            }
        } else {
            console.error('Thumbnail URL tidak valid:', thumbnail);
        }

        await conn.sendMessage(m.chat, audio, { quoted: m });
    } catch (error) {
        console.error('Error 🍼:', error);
        throw `[❗] There was an error in the download`;
    }
};

handler.help = ['yta2'];
handler.command = /^(yt?(a2|audio2))$/i;
handler.tags = ['downloader'];
handler.limit = true;
handler.register = false;

export default handler; // < untuk esm