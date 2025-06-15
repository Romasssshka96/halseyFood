window.addEventListener('DOMContentLoaded', ()=>{
;
const tabs = document.querySelectorAll('.tabheader__item');
const tabContent = document.querySelectorAll('.tabcontent');
const tabsParrent = document.querySelector('.tabheader__items');


function hideTabContent (){
    tabContent.forEach(item =>{
        item.style.display = 'none'   //назначаем всем табам досплей нан по умолчанию и убираем класс актив (иначе все табы были бы видны одновременно )
    })
    tabs.forEach(item =>{
        item.classList.remove('tabheader__item_active')   //тут какраз класс актив и убираем 
    })
}

function showTabContent (i = 0){   //так же по умолчанию ставим нулевой таб (то есть первый) по умолчанию в дисплей блок и добавляем класс актив (условием в скобках в первой же строчке функции и назначаем что будет виден нулевой еемент по умолчанию, удобное нововведение )
    tabContent[i].style.display = 'block'
    tabs[i].classList.add('tabheader__item_active')
   
}

 hideTabContent()
 showTabContent()


tabsParrent.addEventListener('click', (event)=>{
    const target = event.target;

    if(target && target.classList.contains('tabheader__item')){   //этим условием мы узнаем есть ли у елемента вообще таргет, и если есть то содержет ли он именно то что нам нужно
        tabs.forEach((item, i)=>{
            if(target == item){   //а тут уже мы стравниваем нажатый таб и совпадает ли он с перебераемым на данный момент в цикле табом, если да то скрываем все табы, а потом показываем перебераемый в цикле совпавший таб 
                hideTabContent()
                showTabContent(i)
            }
        })
    }
})

//-----------------------------------------------------------------------------------------------------------

const deadLine = Date.parse(new Date())+ 1036800000;
console.log(deadLine)

function getTimeValues (finish){
    const difference = finish - Date.parse(new Date());  //вычисляем разницу между теперешним временем и датой заданной как конечный дед лайн акции  
    const days = Math.floor(difference/(1000*60*60*24));
    const hours = Math.floor((difference/(1000*60*60)%24));
    const minutes = Math.floor((difference/1000/60)%60);
    const seconds = Math.floor((difference/1000)%60);

    return{    //после вычислений возвращаем объект со значениями сделанными в ходе вычислений, для удобного назначения и манипуляций потом 
        'total': difference,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    }
}


function setTimer (selector, finish){
    const timer = document.querySelector('.timer')
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds =timer.querySelector('#seconds');
    const interval = setInterval(refreshClock, 1000) //задаем интервал обновления счетсика каждую секунду 

    function refreshClock (){
        const difference = getTimeValues(finish);   //создаём локальную переменную в которую помещаем функцию с аргументом созданную выше 

        days.innerHTML = difference.days;  //привязываем с созданного объекта значения к хтмл ячейкам 
        hours.innerHTML = difference.hours;
        minutes.innerHTML = difference.minutes;
        seconds.innerHTML = difference.seconds;

        if(difference.total <=0){
            clearInterval(interval)  //если отсчет окончен то останавливаем обновление счетчика с помощью команды клир интервал 
            days.innerHTML = 0;    //задаем нули счетчику что бы по истечению таймера он не считал в минусовые значения 
            hours.innerHTML = 0;
            minutes.innerHTML = 0;
            seconds.innerHTML = 0;
        }
    }
}

setTimer('.timer', deadLine)





//--------------------------------кнопка для перемещения по сайту --------------------------------------------------

const beckToTop = document.querySelector('.botton_to_top')

beckToTop.addEventListener('click',()=>{
    document.documentElement.scrollBy(0, 400)  //кнопка прокрутки по определенному колличеству пикселей с места где сейчас есть пользователь (первое значение по иксу второе по игрику )
})


//---------------------------------вызов модального окна -------------------------------------------------------
    let buttons = document.querySelectorAll('[data-modal]');
    let modalWindow = document.querySelector('.modal');
    let modalClose = document.querySelector('.modal__close');

    let showModalWindow = function(){
        modalWindow.classList.add('visibylity_modal')
        document.body.style.overflow = 'hidden'   //выключаем прокрутку сайта при открытом модальном окне (надежнее всего через css)
    //    clearTimeout(timerForModalWindow)    // выключаем таймаут и модальное окно установленное по времени, при условии если клиент нажал на кнопку и уже увидел моальное окно(что б оно не бесило лишний раз)
    }

    buttons.forEach( i =>{
        i.addEventListener('click',()=>{
            showModalWindow()
        })
    })


let modalCloser = function(){
        modalWindow.classList.remove('visibylity_modal')
        document.body.style.overflow = ''        //включаем обратно прокрутку сайта, что б она была при выходе с модального окна 
}


    modalClose.addEventListener('click',()=>{
        modalCloser()
    })

    modalWindow.addEventListener("click",(e)=>{   //вешаем слушатель при клике на все пространство вокруг модального окна, если кликают вокруг модалки то модальное окно закрывается 
        if(e.target === modalWindow){
            modalCloser()
        }
    })

    document.addEventListener('keydown', (e)=>{
        if(e.code === 'Escape' && modalWindow.classList.contains('visibylity_modal')){   //добавляем слушатель событий на кнопку ескейп, что б при нажатии на нее модальное окно закрывалось 
            modalCloser()
        }
    })

   let timerForModalWindow = setTimeout(showModalWindow, 5000)    //добавляем вызов модального окна через 5 сек после открытия страницы 





    let showModalWindowWhenUserScrollToEndOfPage = function (){
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){  //берем проскроленный отрывок, добавляем к нему высоту клиентского окна, сравниваем с высотой всей страницы, если сходится то скрипт идет дальше 
            showModalWindow()
            window.removeEventListener('scroll',showModalWindowWhenUserScrollToEndOfPage) //убераем событие после того как оно отработает один раз 
        }
    }

    
    window.addEventListener('scroll',showModalWindowWhenUserScrollToEndOfPage)  //назначаем слушатель на глобальный объект что бы засечь момент с помощью функции когда пользователь долистает до конца страницы 



//---------пробовал создать универсальный перебор для данных (объект с массивом с объектами с массивами и тд)----------
//const obj = {
//    name: 'roma',
//    age: 28,
//    femel: 'man',
//    skils: ['welding', 'drive on car', 'head without hair'],
//    girlfrend: {
//        name: 'sabina',
//        age: 21,
//        skils: ['coocing', 'drive on car', 'prity hair']
//    }
//}
//
//for (let i in obj){
//    if(Array.isArray(obj[i])){
//        for(let j of obj[i]){
//            console.log(`умения ${j}`)
//        }
//    }
//    if (typeof(obj[i]) === 'object'){
//        for( let k in obj[i]){
//            console.log(`ключь ${k} и его значение ${obj[i][k]}`)
//        }
//    }else{
//        console.log(`ключь ${i} и его значение ${obj[i]}`)
//    }
//
//}

//----------------------построение елемента на странице динамически с помощью конструктора ----------------------

class CardWithMenu {                                                //создаём класс который будет содержать параметры для однотипных объектов (название с большой буквы)
    constructor(src, alt, title, text, price, parentSelector, ...classes){      //даём ему аргументы которые в нем будут лежать 
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.text = text;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector)        //тут мы создали контекстное поле, в которое будет подставлятся селектор в котором будет позже и размещен создаваемый елемент
        this.currency = 42;
        this.changeToUAH();                                         //мы создали переменную с значением курса (currency)которую мы берем и потом подставляем в функцию по переводу с валюты в валюту, ну и сразу вызываем эту функцию что бы автоматически деньги переводились в валюту что мы прописали 
    }
    changeToUAH(){
        this.price = this.price * this.currency
    }

    render (){                                                       //создали елемент обердку (див) и в него поместили целую хтмл структуру готовую в которой просто поеменяли все интересующие нас поля на переменные с зис 
        let card = document.createElement('div');
        if(this.classes.length === 0){                               //так же так как мы добавили дополнительные аргументы для классов в виде спред оператора, мы должны обезопасится что б верстка не поплыла, для етогомы импользуем условие (если массив аргументов спред оператора(а там массив) пуст, то тогда присваиваем напрямую нужный класс, а если там есть аргументы, тогда передераем их, потому что это массив )
            card.classList.add('menu__item')
        }
        else{
            this.classes.forEach(className => card.classList.add(className))
        }
        card.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `
        this.parent.append(card)                                    //прописываем что эта созданная структура должна быть помещена в ту часть сайта где мы пропишем в аргументах при вызове 
    }
}

const fitnes = new CardWithMenu(                                    //можно вызывать конструктор через создаие переменной 
    'img/tabs/vegy.jpg',
    '"vegy"',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    '.menu .container',
    'menu__item',
    'big',

)
fitnes.render()                                                     //и потом переменной давать метод для построения структуры 

new CardWithMenu(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu .container'
).render()                                                          //а можно и не создавать переменную лишнюю и просто потом в конце тоже передать метод описывающий построение конструкции 

new CardWithMenu(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu .container',

).render()

//-----проверка работоспособности нововведения в аргументы после стандарта es6------------------

//let calcOrDuble = function(number, variable = 2){ //если мы не уверены что какой то аргумент прийдет мы можем зарание указатьв него запасное значение что бы небыло ошибки, но при таком присваевании если мы все же укажем какой то свой аргумент потом при вызове, эта присвоенная 2 не юудет учитыватся, и функция возмет все значения как и надо из аргументов 
//    console.log(number*variable)
//}
//calcOrDuble(3,3)


let forms = document.querySelectorAll('form');
let progres = {
    loading: 'загрузка...',
    success: "отправлено !",
    fail: "упс, что то пошло не так",
}

//------------------------------------метод xml устаревший формат общения с сервером ---------------------------

//let requestToForm = function(form){
//
//    form.addEventListener('submit', (e) =>{
//        e.preventDefault();
//
//        let info = document.createElement('div');
//        info.textContent = progres.loading;
//        form.append(info)
//
//        let xhr = new XMLHttpRequest();
//        xhr.open('POST', 'server.php');
//
//        xhr.setRequestHeader('Content-type', 'multipart/form-data');
//        let formData = new FormData();
//
//        xhr.send(formData);
//
//        xhr.addEventListener('load',() =>{
//            if(xhr.status === 200){
//                console.log(xhr.response)
//                info.textContent= progres.success;
//            }else{
//                info.textContent = progres.fail;
//            }
//        })
//
//    })
//}
//
//forms.forEach(item => {
//    requestToForm(item)
//})


let forms2 = document.querySelectorAll('form')
let progresBar ={
    load: "загрузка",
    compleate: "СПАСИБО!, мы с вами свяжемся",
    failrue: "что то пошло не так ..."
}

let sendData = function(form){
    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        let formData = new FormData(form);
        let info = document.createElement('div');
        info.innerText = progresBar.load;

        fetch('server.php', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => console.log(json))
    })
} 

forms2.forEach(item => sendData(item))



fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    body: JSON.stringify({name: 'roma', id: 7}),
    headers:{
        'Content-type': 'application/json'
    }
})
      .then(response => response.json())
      .then(json => console.log(json))


























































})
