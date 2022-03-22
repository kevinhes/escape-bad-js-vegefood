// TODO: 修正 ESLint 錯誤、補上分號、前輩說要改單引號 QQ
const table = document.querySelector('.table-content');
const filter = document.querySelector('.filter');

const url = 'https://hexschool.github.io/js-filter-data/data.json';
let showData = [];
let category = '';
let data;

function renderData() {
  let str = '';
  data.forEach((b) => {
    // TODO: 改成 ES6 的 Template Literals (字面字串符)
    const content = `
    <tr>
      <td>${b.作物名稱}</td>
      <td>${b.市場名稱}</td>
      <td>${b.上價}</td>
      <td>${b.中價}</td>
      <td>${b.下價}</td>
      <td>${b.平均價}</td>
      <td>${b.交易量}</td>
    </tr>
    `;
    str += content;
  });
  table.innerHTML = str;
}

function getProductData() {
  axios.get(url)
    .then((res) => {
      data = res.data.filter((a) => a.作物名稱);
      renderData();
    })
    .catch((error) => {
      console.log(error);
    });
}
// TODO: 之後拆成 renderData 函式

function filterCategory(e) {
  if (e.target.nodeName === 'BUTTON') {
    category = e.target.dataset.category;
    showData = data.filter((i) => i.種類代碼 === category);
    // TODO: 之後拆成 renderData 函式
    let str = '';
    showData.forEach((i) => {
      const content = `
      <tr>
        <td>${i.作物名稱}</td>
        <td>${i.市場名稱}</td>
        <td>${i.上價}</td>
        <td>${i.中價}</td>
        <td>${i.下價}</td>
        <td>${i.平均價}</td>
        <td>${i.交易量}</td>
      </tr>
      `;
      str += content;
    });
    table.innerHTML = str;
  }
}

function init() {
  getProductData();
}

filter.addEventListener('click', filterCategory);

init();
