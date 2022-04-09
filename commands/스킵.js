const Discord = require('discord.js')

module.exports = {
    name: "스킵",
    description: "노래를 스킵해요.",
    async execute(message, args, client){
        const queue = client.player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '먼저 음성 채널에 들어가주세요...' })

        if (!queue || !queue.playing) return message.reply({ content: '현재 재생되고 있는 음악이 없습니다.' })

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '봇이 이미 다른통화방에서 사용중입니다...' })
        const currentTrack = queue.current;
        const success = queue.skip();

        return message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("🔃ㅣ스킵")
                    .setDescription(`\`${currentTrack}\` (을)를 건너뛰었어요!`)
                    .addField("요청한 사람", `${message.author}`, true)
            ]
        });
    }
}