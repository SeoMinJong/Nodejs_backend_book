const axios = require("axios");
const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

async function getTop20Movie(target_url){
    try {
        const result = await axios.get(target_url);
        if(result.status != 200){
            throw new Error("요청에 실패하셨습니다.");
        }

        const data = result.data;

        if (!data.articleList || data.articleList.size == 0){
            throw new Error("데이터가 없습니다.");
        };

        const movieinfos = data.articleList.map((article, idx)=>{
            return {title:article.title, rank:idx+1}
        });

        for (let movieinfo of movieinfos){
                console.log(`${movieinfo.rank}위 ${movieinfo.title}`)
        }
    }
    catch(error){
        throw new Error(error)
    }
}

getTop20Movie(url)