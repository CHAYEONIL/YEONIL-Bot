const axios = require("axios");
const cheerio = require("cheerio");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const getHTML = async(keyword) => {
    try {
        return await axios.get("https://lostark.game.onstove.com/Profile/Character/" + encodeURI(keyword))
    }catch(err) {
        console.log(err);
    }
}

const parsing = async (keyword) => {
    const html = await getHTML (keyword);
    const $ = cheerio.load(html.data);
    const $userInfo = $('.content--profile');

    let infos = [];
    $userInfo.each((idx,node) => {
        infos.push({
            name: $(node).find(".profile-character-info__name").text(),
            lv: $(node).find(".level-info2__expedition").text(),
            classname: $(node).find(".profile-character-info > img").attr('alt'),
            servername: $(node).find(".profile-character-info__server").text(),
        })
        console.log(infos);
    })
}

rl.question("닉네임 입력: " , function(answer){
    parsing(answer);
    rl.close();
})

// parsing("신쨩");