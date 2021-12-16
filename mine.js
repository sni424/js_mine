const body = document.querySelector('tbody');
const result = document.querySelector('#result');
const script = document.querySelector("script");
const div = document.createElement("div");
document.body.insertBefore(div, script);


const row = 10; //행
const column = 10;//열
const mine = 10;//지뢰

const CODE = {
    NORMAL: -1, // 닫힌 칸(지뢰 없음)
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    MINE: -6,
    OPENED: 0, // 0 이상이면 다모두 열린 칸
};

let data;

function insertMine() {
    const makeMine = Array(row * column).fill().map((arr, i) => {
        return i;
    });//(배열만듬 i=>인덱스 그래서 0~99까지)
    const shuffle = [];
    while (makeMine.length > row * column - mine)//90보다 클때니 10번만 반복 {
    {
        const choice = makeMine.splice(Math.floor(Math.random() * makeMine.length), 1)[0];
        //무작위 10개를 가져온다.
        //Math.floor(Math.random() * makeMine.length)100개중 무작이 숫자를 구해서
        // makeMine.splice(,1)[0]구한 숫자위치에 1개를[0]배열의 첫번째거로 교체
        shuffle.push(choice);//10개를 배열에 넣는다.
    }
    //지뢰없는칸 채우기
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < column; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    //지뢰 빈칸에 넣기
    for (let k = 0; k < shuffle.length; k++) {
        //85번째위치에 mine을 넣을때 넣을 위치 찾기
        const ver = Math.floor(shuffle[k] / column);  //85/10 => 8번째 줄
        const hor = shuffle[k] % column; // 85%10 =>5번째 칸 
        data[ver][hor] = CODE.MINE;
        //자바스크립트에 85번째는 8번째줄 5번째 칸에 있으니 그곳에 mine을넣어라
    }
    return data;
};
makeTable()
function flagClick(event) {
    event.preventDefault();//우클릭했을때 나오는 메뉴 동작x
    const tdTarget = event.target;//td
    const rowIndex = tdTarget.parentNode.rowIndex;//가로
    console.dir(tdTarget);
    console.log(tdTarget.parentNode);
    const columnIndex = tdTarget.cellIndex;
    console.log(rowIndex);
    const columnData = data[rowIndex][columnIndex];
    if (columnData === CODE.NORMAL) {
        data[rowIndex][columnIndex] = CODE.QUESTION;
        //왜 columnData이걸로 하면 에러가 나고 data[rowIndex][columnIndex]이걸로 하면 안날까?
        tdTarget.innerText = "❓"
        tdTarget.style.backgroundColor = "yellow"
    }
    else if (columnData === CODE.QUESTION) {
        data[rowIndex][columnIndex] = CODE.FLAG;
        tdTarget.innerText = "❗"
        tdTarget.style.backgroundColor = "red"
    }
    else if (columnData === CODE.FLAG) {
        data[rowIndex][columnIndex] = CODE.NORMAL;
        tdTarget.innerText = ""
        tdTarget.style.backgroundColor = "#888"
    }
    else if (columnData === CODE.MINE) {
        data[rowIndex][columnIndex] = CODE.QUESTION_MINE;
        tdTarget.innerText = "❓"
        tdTarget.style.backgroundColor = "yellow"
    }
    else if (columnData === CODE.QUESTION_MINE) {
        data[rowIndex][columnIndex] = CODE.FLAG_MINE;
        tdTarget.innerText = "❗"
        tdTarget.style.backgroundColor = "red"
    }
    else if (columnData === CODE.FLAG_MINE) {
        data[rowIndex][columnIndex] = CODE.MINE;
        tdTarget.innerText = "💥"
        tdTarget.style.backgroundColor = "#888"
    }
};

function makeTable() {
    data = insertMine();
    data.forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((column) => {
            const td = document.createElement("td");
            if (column === CODE.MINE) {
                td.innerText = "💥"
            }
            tr.appendChild(td);
        });
        body.appendChild(tr);
        //document.body.insertBefore(tr, div); 하면에러남 table안에 tr을 만든게 아니라서
        document.body.addEventListener("contextmenu", flagClick)
    })
};