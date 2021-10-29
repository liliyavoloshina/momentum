(()=>{var e={52:()=>{const e=document.querySelector("#time");!function t(){const o=(new Date).toLocaleTimeString();e.textContent=o,setTimeout(t,1e3)}()},396:()=>{const e=document.querySelector("#settingBtn"),t=document.querySelector("#settingArea"),o=document.querySelector("#todoBtn"),n=document.querySelector("#todoPopup");let a=!1,c=!1;function i(){c&&d(),e.classList.toggle("revert"),t.classList.toggle("show"),a=!a}function d(){a&&i(),o.classList.toggle("revert"),n.classList.toggle("show"),c=!c}document.addEventListener("DOMContentLoaded",(()=>{window.addEventListener("click",(r=>{const l=r.target;if(c&&l!==n&&!n.contains(l)&&l!==o){if(l.classList.contains("todo-item-move")||l.classList.contains("todo-item-delete"))return;d()}a&&l!==t&&!t.contains(l)&&l!==e&&i()}))})),e.addEventListener("click",i),o.addEventListener("click",d)}},t={};function o(n){var a=t[n];if(void 0!==a)return a.exports;var c=t[n]={exports:{}};return e[n](c,c.exports,o),c.exports}(()=>{"use strict";function e(e){e.target.classList.contains("input-inactive")?(e.target.classList.add("input-active"),e.target.classList.remove("input-inactive")):(e.target.classList.add("input-inactive"),e.target.classList.remove("input-active"))}function t(){return localStorage.getItem("lang")?localStorage.getItem("lang"):"en"}const n=new Array;!function(e){for(let t=0;t<e.length;t++)n[t]=new Image,n[t].src=e[t]}(["../img/unmute.png","../img/mute.png","../img/play-audio.png","../img/pause-audio.png"]),function(e){for(let t=0;t<e.length;t++){const o=new Audio;o.src=e[t],o.load()}}(["./audio/chill-vibes.mp3","./audio/chillout.mp3","./audio/easy-guitar.mp3"]);let a=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",`${a}px`),window.addEventListener("resize",(()=>{let e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`)}));const c=document.querySelector("#quoteChangeBtn"),i=document.querySelector("#quoteText"),d=document.querySelector("#quoteAuthor");let r,l,s;function u(){const e=t();l="en"===e?r.text_en:r.text_ru,s="en"===e?r.author_en:r.author_ru,i.textContent=`«${l}»`,d.textContent=`— ${s}`}async function m(){c.classList.toggle("revert"),await async function(){const e=await async function(){const e=await fetch("data/quotes.json");return await e.json()}();r=e[Math.floor(Math.random()*e.length)],u()}()}c.addEventListener("click",m),m();const y=document.querySelector("#greetingDaytime");async function g(){const e=(new Date).getHours();return e>=6&&e<12?"morning":e>=12&&e<18?"afternoon":e>=18&&e<24?"evening":e>=0||e<6?"night":void 0}async function h(){const e=`${await async function(){const e=await g(),o=t();return"morning"===e?"en"==o?"Good morning":"Доброе утро":"afternoon"===e?"en"==o?"Good afternoon":"Добрый день":"evening"===e?"en"==o?"Good evening":"Добрый вечер":"night"===e?"en"==o?"Good night":"Доброй ночи":void 0}()},`;y.textContent=e,setTimeout(h,1e3)}h();const p=document.querySelector("#greetingName");async function v(){const e=t();p.placeholder="en"===e?"[Enter name]":"[Введите имя]"}function f(){const e=localStorage.getItem("username");e&&(p.value=e)}v(),p.addEventListener("input",(()=>{localStorage.setItem("username",document.querySelector("#greetingName").value)})),p.addEventListener("focus",(t=>e(t))),p.addEventListener("blur",(t=>e(t))),window.addEventListener("load",(()=>{f()}));const S=[{id:1,title_en:"Chill Vibes",title_ru:"Чиллово",src:"./audio/chill-vibes.mp3",duration:32},{id:2,title_en:"Chillout",title_ru:"Расслабон",src:"./audio/chillout.mp3",duration:22},{id:3,title_en:"Easy Guitar",title_ru:"Гитарка",src:"./audio/easy-guitar.mp3",duration:20}],x=document.querySelector("#audioPlayMain"),L=document.querySelector("#audioNextMain"),q=document.querySelector("#audioPrevMain"),w=document.querySelector("#audioName"),E=document.querySelector("#audioProgress"),b=document.querySelector("#audioProgressFill"),C=document.querySelector("#audioDurationEnd"),k=document.querySelector("#audioDurationCur"),$=document.querySelector("#audioVolumeRange"),_=document.querySelector("#audioVolumeBtn"),M=document.querySelector("#playlist");let T=t();M.innerHTML=`${S.length>0?S.map((e=>`<li class="playlist-item" data-id="${e.id}">\n              <button class="playlist-item__small-btn btn play" title="Play/Pause Audio"></button>\n              <div class="playlist-item__name">${"en"==T?e.title_en:e.title_ru}</div>\n            </li>`)).join(""):"---"}`;const I=document.querySelectorAll(".playlist-item"),A=document.querySelectorAll(".playlist-item__small-btn");let D,H=!1,N=0,P=S[0].duration;const j=new Audio;j.volume=.5,j.src=S[N].src,j.currentTime=0,j.dataset.id=S[N].id,D=document.querySelector(`[data-id="${j.dataset.id}"]`),D.classList.add("active"),w.textContent="en"==T?S[N].title_en:S[N].title_ru,C.textContent=`00:${P}`;let O=D.querySelector("button");function B(){H?(x.classList.add("audio-widget-pause-btn"),x.classList.remove("audio-widget-play-btn")):(x.classList.remove("audio-widget-pause-btn"),x.classList.add("audio-widget-play-btn"))}function G(){H?(O.classList.add("pause"),O.classList.remove("play")):(O.classList.remove("pause"),O.classList.add("play"))}function U(){H?j.pause():j.play(),H=!H,B(),G()}function J(){D.classList.remove("active"),O.classList.remove("pause"),O.classList.add("play"),O.addEventListener("click",U),j.src=S[N].src,j.currentTime=0,j.dataset.id=S[N].id,D=document.querySelector(`[data-id="${j.dataset.id}"]`),O=D.querySelector("button"),j.play(),D.classList.add("active"),O.classList.add("pause"),O.classList.remove("play"),H=!0,B(),G(),w.textContent="en"==T?S[N].title_en:S[N].title_ru,P=S[N].duration,C.textContent=`00:${P}`}function R(){N+1>=S.length?N=0:N++,J()}function W(){const e=[...this.parentElement.childNodes].indexOf(this);e!==N&&(N=e,J())}function V(){j.muted=!0,_.style.backgroundImage="url('./img/mute.png')",$.value=0,Q(0)}function z(){j.muted=!1,_.style.backgroundImage="url('./img/unmute.png')",$.value=j.volume,Q(j.volume)}function Q(e){$.style.background=`linear-gradient(to right, #d8d8d8 0%, #d8d8d8 ${70*e}%, #383838 ${100*e}%, #383838 100%)`}$.addEventListener("input",(e=>{!function(e){const t=+e.value;j.volume=t,Q(t),j.muted&&z(),0===t&&V()}(e.target)})),_.addEventListener("click",(function(){j.muted?z():V()})),x.addEventListener("click",U),L.addEventListener("click",R),q.addEventListener("click",(function(){N-1<0?N=S.length-1:N--,J()})),j.addEventListener("timeupdate",(function(){const e=j.currentTime/j.duration*100,t=Math.floor(j.currentTime).toString().padStart(2,0);b.style.flexBasis=`${e}%`,k.textContent=`00:${t}`,j.currentTime===j.duration&&R()})),A.forEach((e=>{e.addEventListener("click",U)})),I.forEach((e=>{e.addEventListener("click",W)})),E.addEventListener("click",(function(e){const t=e.offsetX/E.offsetWidth*j.duration;j.currentTime=t,b.classList.add("active"),setTimeout((()=>{b.classList.remove("active")}),500)}));const X=document.querySelector("#date"),Y={month:"long",day:"numeric",weekday:"long"};function Z(){const e="en"===t()?"en-US":"ru-RU",o=(new Date).toLocaleDateString(e,Y);X.textContent=o,setTimeout(Z,1e3)}Z();const F=document.querySelector("#weatherCity"),K=document.querySelector("#weatherIcon"),ee=document.querySelector("#weatherTemp"),te=document.querySelector("#weatherDesc"),oe=document.querySelector("#weatherWind"),ne=document.querySelector("#weatherHumidity"),ae=document.querySelector(".weather-widget__error"),ce=document.querySelector(".weather-widget__info");let ie;async function de(){const e=t();document.querySelector("#weatherCity").placeholder="en"===e?"[Enter city]":"[Введите город]";try{"Минск"!==ie&&"Minsk"!==ie||(document.querySelector("#weatherCity").value="en"===e?"Minsk":"Минск");const t=`https://api.openweathermap.org/data/2.5/weather?q=${ie}&lang=${e}&appid=01d522b353a969527c35ef13f4db2c3e&units=metric`,o=await fetch(t),n=await o.json(),a=n.weather[0].id,c=n.weather[0].description,i=Math.floor(n.main.temp),d=Math.floor(n.wind.speed),r=Math.floor(n.main.humidity);K.classList.add(`owf-${a}`),ee.textContent=`${i} °C`,te.textContent=c,oe.textContent=`${"en"==e?"Wind speed":"Скорость ветра"}: ${d} m/c`,ne.textContent=`${"en"==e?"Humidity":"Влажность"}: ${r} %`,ae.classList.add("hidden"),ce.classList.remove("hidden")}catch(t){ae.classList.remove("hidden"),ce.classList.add("hidden"),ae.textContent="en"===e?`Unfortunately, "${ie}" does not exist :(`:`К сожалению, "${ie}" не существует :(`}}F.addEventListener("focus",(t=>e(t))),F.addEventListener("blur",(t=>e(t))),F.addEventListener("change",(e=>{ie=e.target.value,de()})),window.addEventListener("beforeunload",(()=>{localStorage.setItem("city",document.querySelector("#weatherCity").value)})),window.addEventListener("load",(()=>{localStorage.getItem("city")?(ie=localStorage.getItem("city"),document.querySelector("#weatherCity").value=localStorage.getItem("city")):(ie="Minsk",document.querySelector("#weatherCity").value="Minsk"),de()}));const re=document.querySelectorAll('input[name="lang"]'),le=document.querySelector(".langs-title"),se=document.querySelector(".en-radio"),ue=document.querySelector(".ru-radio"),me=document.querySelector(".widgets-title"),ye=document.querySelector(".audio-checkbox"),ge=document.querySelector(".weather-checkbox"),he=document.querySelector(".time-checkbox"),pe=document.querySelector(".date-checkbox"),ve=document.querySelector(".greeting-checkbox"),fe=document.querySelector(".quote-checkbox"),Se=document.querySelector(".todo-checkbox"),xe=document.querySelector(".photos-title"),Le=document.querySelector(".phototag-title"),qe=document.querySelector(".photo-note");function we(){"ru"===t()?(le.textContent="Настройки",se.textContent="Английский",ue.textContent="Русский",me.textContent="Активные виджеты",ye.textContent="Аудио",ge.textContent="Погода",he.textContent="Время",pe.textContent="Дата",ve.textContent="Приветствие",fe.textContent="Цитата",Se.textContent="Дела",xe.textContent="Фон",Le.textContent="Фото тэг",qe.textContent="*если выбран не github может быть задержка"):(le.textContent="Settings",se.textContent="English",ue.textContent="Russian",me.textContent="Active widgets",ye.textContent="Audio",ge.textContent="Weather",he.textContent="Time",pe.textContent="Date",ve.textContent="Greeting",fe.textContent="Quote",Se.textContent="Todo",xe.textContent="Photo Source",Le.textContent="Photo Tag",qe.textContent="*if you chose not github, changing images can be slow")}we(),re.forEach((e=>{e.addEventListener("change",ze)}));const Ee=document.querySelectorAll("input[data-todolist]"),be=document.querySelectorAll("ul[data-todolist]"),Ce=document.querySelector("#newtodo"),ke=document.querySelector(".inbox-title"),$e=document.querySelector(".today-title"),_e=document.querySelector(".done-title"),Me=document.querySelector(".new-todo-input");let Te,Ie,Ae="inbox",De=document.querySelector('ul[data-todolist="inbox"]');function He(){Ae=this.dataset.todolist,De=document.querySelector(`ul[data-todolist="${Ae}"]`),be.forEach((e=>e.dataset.todolist===Ae?e.classList.remove("hidden"):e.classList.add("hidden"))),Ge()}function Ne(e){const t=e.target.dataset.id,o=e.target.dataset.category;let n;"done"===Ae?(n=Te[o].map((e=>e.id==t?{...e,completed:!1}:e)),Te[o]=n):n=Te[Ae].map((e=>e.id==t?{...e,completed:!e.completed}:e)),Te[Ae]=n;let a=Te.inbox.filter((e=>e.completed)),c=Te.today.filter((e=>e.completed));Te.done=a.concat(c),Ue(),Ge()}function Pe(e){const t=e.target,o=t.closest(".todo-item"),n=o.attributes["data-todoid"].value,a=o.attributes["data-category"].value;t.parentElement.parentElement.classList.add("hidden");let c=Te[a].findIndex((e=>e.id==n));Te[a].splice(c,1);let i=Te.inbox.filter((e=>e.completed)),d=Te.today.filter((e=>e.completed));Te.done=i.concat(d),Ue(),Ge()}function je(){const e=this.closest(".todo-item"),t=e.querySelector(".todo-item-text"),o=e.attributes["data-todoid"].value;this.parentElement.parentElement.classList.add("todo-menu-hidden"),t.disabled=!1,t.focus();let n=t.value;t.value="",t.value=n,t.addEventListener("change",(()=>function(e,t){const o=Te[Ae].map((o=>o.id==t?{...o,text:e.value}:o));Te[Ae]=o,e.disabled=!0;let n=Te.inbox.filter((e=>e.completed)),a=Te.today.filter((e=>e.completed));Te.done=n.concat(a),Ue(),Ge()}(t,o)))}function Oe(){const e=this.closest(".todo-item"),t=e.attributes["data-todoid"].value,o=e.attributes["data-category"].value,n="inbox"==o?"today":"inbox",a={...Te[o].find((e=>e.id==t)),category:n};let c=Te[o].findIndex((e=>e.id==t));Te[o].splice(c,1),Te[n].push(a),Ue(),Ge()}function Be(e){const t=e.target.parentNode.querySelector(".todo-menu");Ie&&Ie!=t&&Ie.classList.add("todo-menu-hidden"),t.classList.contains("todo-menu-hidden")?t.classList.remove("todo-menu-hidden"):t.classList.add("todo-menu-hidden"),Ie=t}async function Ge(){De.innerHTML=Te[Ae].length>0?Te[Ae].map((e=>`\n        <li class="${!0===e.completed?"todo-item todo-item--completed":"todo-item"}" data-todoid="${e.id}" data-category="${e.category}">\n        \n          <label class="checkbox-container">\n            <input class="checkbox-input todo-checkbox" type="checkbox" data-id="${e.id}" data-category="${e.category}" ${!0===e.completed?"checked":""}>\n            <span class="checkbox-checkmark"></span>\n          </label>\n          \n          <input class="input todo-item-text" value="${e.text}" disabled />\n          <div class="todo-item-menu-area">\n            <button class="todo-item-menu btn input-inactive" title="Todo Menu" data-id="${e.id}" data-category="${e.category}"></button>\n            <div class="todo-menu todo-menu-hidden">\n              <ul class="todo-menu-list">\n                <li class="${"done"===Ae?"todo-item-edit hidden":"todo-item-edit"}">\n                  Edit\n                </li>\n                <li class="${"done"===Ae?"todo-item-move hidden":"todo-item-move"}">Move\n                </li>\n                <li class="todo-item-delete">\n                  Delete\n                </li>\n              </ul>\n            </div>\n          </div>\n        </li>`)).join(""):`<div class="todolist-empty">\n          <h3>${"done"===Ae?'<div class="todo-empty-done"></div>':"today"===Ae?'<div class="todo-empty-today"></div>':'<div class="todo-empty-inbox"></div>'}</h3>\n        </div>`;const e=document.querySelectorAll(".todo-checkbox"),t=document.querySelectorAll(".todo-item-menu"),o=document.querySelectorAll(".todo-item-edit"),n=document.querySelectorAll(".todo-item-delete"),a=document.querySelectorAll(".todo-item-move");e.forEach((e=>e.addEventListener("change",Ne))),t.forEach((e=>e.addEventListener("click",Be))),n.forEach((e=>e.addEventListener("click",Pe))),o.forEach((e=>e.addEventListener("click",je))),a.forEach((e=>e.addEventListener("click",Oe))),Je()}function Ue(){localStorage.setItem("todos",JSON.stringify(Te))}function Je(){const e=t(),o=document.querySelectorAll(".todo-item-edit"),n=document.querySelectorAll(".todo-item-delete"),a=document.querySelectorAll(".todo-item-move"),c=document.querySelector(".todo-empty-done"),i=document.querySelector(".todo-empty-today"),d=document.querySelector(".todo-empty-inbox");"ru"===e?(ke.textContent="Общее",$e.textContent="Сегодня",_e.textContent="Выполнено",o.forEach((e=>e.textContent="Изменить")),n.forEach((e=>e.textContent="Удалить")),a.forEach((e=>e.textContent="Переместить")),c&&(c.innerHTML='Вы не закончили ни одно дело... <span class="note">Скорее выполните что-то!</span>'),i&&(i.innerHTML='Здесь будут ваши дела на сегодня <span class="note">(наконец помыть посуду?)</span>'),d&&(d.innerHTML='Здесь будут ваши общие дела <span class="note">(может жизненная цель?)</span>'),Me.placeholder="Новое дело..."):(ke.textContent="Inbox",$e.textContent="Today",_e.textContent="Done",o.forEach((e=>e.textContent="Edit")),n.forEach((e=>e.textContent="Delete")),a.forEach((e=>e.textContent="Move")),c&&(c.innerHTML='You haven\'t completed any todo yet... <span class="note">Hurry up to do something!</span>'),i&&(i.innerHTML='Place for your today\'s todo <span class="note">(finally wash the dishes?)</span>'),d&&(d.innerHTML='The place for your general todo <span class="note">(maybe a lifegoal?)</span>'),Me.placeholder="New todo...")}Ee.forEach((e=>e.addEventListener("change",He))),Ce.addEventListener("focus",(t=>e(t))),Ce.addEventListener("blur",(t=>e(t))),Ce.addEventListener("keyup",(e=>{13===e.keyCode&&(e.preventDefault(),function(e){const t=e.target,o=t.value;let n;"done"===Ae?(n={id:Date.now(),text:o,category:"inbox",completed:!0},Te.inbox.push(n)):n={id:Date.now(),text:o,category:Ae,completed:!1},Te[Ae].push(n),Ue(),Ge(),t.value=""}(e))})),window.addEventListener("load",(async()=>{Te=localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):{inbox:[],today:[],done:[]},await Ge()}));const Re=document.querySelector("#enLang"),We=document.querySelector("#ruLang");let Ve;function ze(){const e=this.value;localStorage.setItem("lang",e),Ve=this.value,u(),h(),v(),f(),async function(){T=t(),I.forEach((e=>e.querySelector(".playlist-item__name").textContent="en"==T?S[e.dataset.id-1].title_en:S[e.dataset.id-1].title_ru)),w.textContent="en"==T?S[N].title_en:S[N].title_ru}(),Z(),de(),we(),Je()}window.addEventListener("load",(()=>{"en"==t()?Re.checked=!0:(Re.checked=!1,We.checked=!0)})),o(52);const Qe=document.querySelectorAll(".source-radio"),Xe=document.querySelector("#photoTag");let Ye,Ze;async function Fe(){Ye=this.dataset.source,localStorage.setItem("source",JSON.stringify(Ye)),it()}function Ke(){return Ye=localStorage.getItem("source")?JSON.parse(localStorage.getItem("source")):"github",Ye}function et(){return localStorage.getItem("tag")?(Ze=JSON.parse(localStorage.getItem("tag")),Xe.value=Ze):(Xe.value="",Ze=""),"github"===Ye?(Xe.value="-",Xe.disabled=!0):(Xe.value=Ze,Xe.disabled=!1),Ze}window.addEventListener("load",(()=>{Ze=et(),Ye=Ke(),Qe.forEach((e=>{e.dataset.source===Ye?e.checked=!0:e.checked=!1}))})),Qe.forEach((e=>{e.addEventListener("change",Fe)})),Xe.addEventListener("change",(function(){Ze=this.value,localStorage.setItem("tag",JSON.stringify(Ze)),it()}));const tt=document.querySelector("#slidePrev"),ot=document.querySelector("#slideNext"),nt=document.querySelector("#imageLoader");tt.addEventListener("click",(function(){1!=at?at--:at=20,it()})),ot.addEventListener("click",(function(){20!=at?at++:at=1,it()}));let at=Math.floor(20*Math.random())+1;function ct(e){return e.toString().padStart(2,0)}async function it(){nt.classList.add("show");const e=await g(),t=Ke(),o=et();let n;const a=""!==o?o:e;if("unsplash"===t){const e=await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${a}&client_id=ZMe8BGgm8MXpmbZUBCgMi4m1CTgEQhzy90dkk9gjcpY`);n=(await e.json()).urls.raw,console.log(`✨ URL изображения: ${e.url}`),console.log(`✨ Тэг: ${a}`)}if("flickr"===t){const e=await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d67d8fac287c9a1f0a13e08a11231403&tags=${a}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`),t=(await e.json()).photos.photo;n=t[Math.floor(Math.random()*t.length)].url_h,console.log(`✨ URL изображения: ${e.url}`),console.log(`✨ Тэг: ${a}`)}"github"===t&&(console.log(`✨ Изображения перелистываются последовательно: ${ct(at)}`),n=`https://raw.githubusercontent.com/liliyavoloshina/stage1-tasks/assets/images/${e}/${ct(at)}.jpg`,console.log(`✨ URL изображения: ${n}`));const c=new Image;c.src=n,c.addEventListener("load",(()=>{document.body.style.backgroundImage=`url('${c.src}')`,nt.classList.remove("show")}))}it(),o(396)})()})();