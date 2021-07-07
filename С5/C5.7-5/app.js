const btn = document.querySelector('.j-btn');
const resultNode = document.querySelector('.j-result');
 const numPage = document.querySelector("#num");
 const limit = document.querySelector("#limit");

//загружаем картинки из последнего успешно выполненного запроса
let per1 = localStorage.getItem('myKey1');
resultNode.innerHTML = per1;

 /*
 * Функция-обертка над XMLHttpRequest, осуществляющая запрос
 * url - урл, по которому будет осуществляться запрос
 * callback - функция, которая вызовется при успешном выполнении
 * и первым параметром получит объект-результат запроса
  */
function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};


/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
    
  let cards = '';
  // console.log('start cards', cards);
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
    
  //сохраняем выполненный запрос в хранилище
  localStorage.setItem('myKey1', cards); 
 
  resultNode.innerHTML = cards;
}  

btn.addEventListener('click', async () => {
  let n1 = Number(numPage.value);
  let n2 = Number(limit.value);
  //console.log(n1);
  //console.log(n2);
    
  /*
  * если ввведенные значения соответствуют запросу, то вызывается функция         *  useRequest, в противном случае выводится сообщение на экран
  */
   if ((typeof n2 === 'number' && n2>=1 && n2<=10) && (typeof n1 === 'number' && n1>=1 && n1<=10)) {
     const res1 = ` https://picsum.photos/v2/list?page=${n1}&limit=${n2}`;
     //console.log(res1); 
     useRequest(res1, displayResult);
        
   }
   else if (((isNaN(n1)) || (n1<1) || (n1>10))  && (typeof n2 === 'number' && n2>=1 && n2<=10) ) {
    resultNode.innerHTML ="<p> Номер страницы вне диапазона от 1 до 10 </p>";
  } else if (((isNaN(n2)) || (n2<1) || (n2>10))   && (typeof n1 === 'number' && n1>=1 && n1<=10) ){
    resultNode.innerHTML ="<p> Лимит вне диапазона от 1 до 10 </p>";
  } else {
    resultNode.innerHTML = "<p> Номер страницы и лимит вне диапазона от 1 до 10 </p>";
  } 
    
 });


