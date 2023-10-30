import lodash from "lodash"
const PAGE_LIST_SIZE = 10;

export default ({totalCount, page, perPage = 10})=>{
    const PER_PAGE = perPage;
    const totalPage = Math.ceil(totalCount / PER_PAGE); // totalpage는 총 post 수를 PER_PAGE로 나눈 몫값으로 예제의 경우 10개 단위로 몫이 나온다.

    let quotient = parseInt(page / PAGE_LIST_SIZE); // page = 21이라 가정했을 때 parseInt(2.1)이 되는데 이러면 quotient가 2로 되어 하단의 시작 페이지를 설정할 수 있게된다.
    if (page % PAGE_LIST_SIZE === 0){ // 다만 딱 떨어지는 10의 단위의 경우는 30일 때 20아래의 리스트를 표현해야 하기 때문에 -1처리를 한다.
        quotient -= 1;
    }
    const startPage = quotient * PAGE_LIST_SIZE + 1;
    const endPage = startPage + PAGE_LIST_SIZE - 1 < totalPage ? startPage + PAGE_LIST_SIZE - 1 : totalPage; // 마지막 표현될 하단 리스트의 숫자가 게시글이 적으면 PAGE_LIST_SIZE보다 적게 표현한다.
    
    const isFirstPage = page === 1;
    const isLastPage = page === totalPage;
    const hasPrev = page > 1;
    const hasNext = page < totalPage;

    const paginator = {
        pageList: lodash.range(startPage, endPage + 1),
        page,
        prevPage: page - 1,
        nextPage: page + 1,
        startPage,
        lastPage: totalPage,
        hasPrev,
        hasNext,
        isFirstPage,
        isLastPage
    };

    return paginator;
}