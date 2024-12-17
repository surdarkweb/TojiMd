import { promises } from 'fs'
import { join } from 'path'
import axios from 'axios'

let handler = async function (m, { conn, __dirname }) {
  const githubRepoURL = 'https://github.com/Johanlieb34/TojiMd'

  try {
    const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/)

    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`)

    if (response.status === 200) {
      const repoData = response.data

      // Format the repository information with emojis
      const formattedInfo = `
      🍼🍼TOJI MD🍼☣
📂 Repository Name: ${repoData.name}
📝 Description: ${repoData.description}
👤 Owner: ${repoData.owner.login}
⭐ Stars: ${repoData.stargazers_count}
🍴 Forks: ${repoData.forks_count}
🌐 URL: ${repoData.html_url}
🏠 Session: https://web-three-nu-67.vercel.app/
      \`🚀 OUR REPOSITORY\`
*Welcome to TOJI MD! 🤖✨*
📞 Group: https://chat.whatsapp.com/Fq7NgF5L8kf5ZPRB4nCTMk
🛀 Gorup2: https://chat.whatsapp.com/G9QKCerGvtq6Au8znk3kvC
🤖 Channel: https://whatsapp.com/channel/0029VanxGm5J3jv39RvJIM39

*_DEPLOY TOJI MD NOW_*

\`\`\`USER FRIENDLY TOJI MD🍼\`\`\`
`.trim()

      // Send the formatted information as a message
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: 'INR',
            amount1000: 69000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text: formattedInfo,
                contextInfo: {
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {}
      )
    } else {
      // Handle the case where the API request fails
      await conn.reply(m.chat, 'Toji says: Unable to fetch repository information.', m)
    }
  } catch (error) {
    console.error(error)
    await conn.reply(m.chat, 'Toji says: An error occurred while fetching repository information.', m)
  }
}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['sc', 'repo', 'script']

export default handler
