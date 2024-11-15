(()=>{(function(){let u=document.createElement("div"),t=u.attachShadow({mode:"open"}),m=document.createElement("style");m.textContent=`
      :host {
        display: block;
      }
    `,t.appendChild(m);let l=document.createElement("link");l.rel="stylesheet",l.href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css",t.appendChild(l);let g=document.createElement("script");g.src="https://cdn.jsdelivr.net/npm/marked/marked.min.js",t.appendChild(g);let x=document.createElement("style");x.innerHTML=`
    .hidden {
      display: none;
    }
    #chat-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      flex-direction: column;
    }
    #chat-popup {
      height: 70vh;
      max-height: 70vh;
      transition: all 0.3s;
      overflow: hidden;
    }

    .markdown-content a {
      color: #1d4ed8;
      text-decoration: none;
      padding: 1.5px 1.5px;
      border-radius: 4px;
      transition: background-color 0.3s, color 0.3s;
    }

    .markdown-content a:hover {
      color: #1e40af;
      text-decoration: underline;
      background-color: rgba(29, 78, 216, 0.1);
    }

    .markdown-content img {
      margin: 2.5px
    }

    @media (max-width: 768px) {
      #chat-popup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
        display: none;
      }

      #chat-widget-container {
        display: none;
      }
    }
    `,t.appendChild(x);let p=document.createElement("div");p.id="chat-widget-container",t.appendChild(p),document.body.append(u),p.innerHTML=`
      <div id="chat-bubble" class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer text-3xl">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <div id="chat-popup" class="hidden absolute bottom-20 right-0 bg-white rounded-md shadow-md flex flex-col transition-all text-lg" style="width: calc(100vw / 6);">
        <div id="chat-header" class="flex justify-between items-center p-4 bg-gray-800 text-white rounded-t-md">
          <h3 class="m-0 text-lg">BlogGPT AI \u52A9\u624B</h3>
          <button id="close-popup" class="bg-transparent border-none text-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="chat-messages" class="flex-1 p-4 overflow-y-auto"></div>
        <div id="chat-input-container" class="p-4 border-t border-gray-200">
          <div class="flex space-x-4 items-center">
            <input type="text" id="chat-input" class="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none w-3/4" placeholder="\u5728\u8FD9\u91CC\u8F93\u5165\u4F60\u7684\u95EE\u9898...">
            <button id="chat-submit" class="bg-gray-800 text-white rounded-md px-4 py-2 cursor-pointer">\u53D1\u9001</button>
          </div>
          <div class="flex text-center text-xs pt-4">
            <span class="flex-1">Prompted by <a href="https://twitter.com/anantrp" target="_blank" class="text-indigo-600">@anantrp</a></span>
          </div>
        </div>
      </div>
    `;let r=t.getElementById("chat-input"),v=t.getElementById("chat-submit"),d=t.getElementById("chat-messages"),b=t.getElementById("chat-bubble"),I=t.getElementById("chat-popup"),f=t.getElementById("close-popup");v.addEventListener("click",async function(){let e=r.value.trim();e&&(d.scrollTop=d.scrollHeight,r.value="",await k(e))}),r.addEventListener("keyup",function(e){e.key==="Enter"&&v.click()}),b.addEventListener("click",function(){y()}),f.addEventListener("click",function(){y()});function y(){let e=t.getElementById("chat-popup");e.classList.toggle("hidden"),e.classList.contains("hidden")||t.getElementById("chat-input").focus()}async function k(e){console.log("User request:",e);let i=document.createElement("div");i.className="flex justify-end mb-3",i.innerHTML=`
        <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%]">
          ${e}
        </div>
      `,d.appendChild(i),d.scrollTop=d.scrollHeight,r.value="";let n="";for await(let o of M(e)){let s=o.id,a=t.getElementById(s);n+=o.content,a?B(a,n):E(n,s)}}function E(e,i){let n=marked.parse(e),o=t.getElementById("chat-messages"),s=document.createElement("div");s.id=i,s.className="flex mb-3 text-lg",s.innerHTML=`
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
          <div class="markdown-content">${n}</div>
        </div>
      `,o.appendChild(s),o.scrollTop=o.scrollHeight}function B(e,i){let n=marked.parse(i),o=t.getElementById("chat-messages");e.innerHTML=`
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
            <div class="markdown-content">${n}</div>
        </div>
      `,o.scrollTop=o.scrollHeight}async function*M(e){let n=await fetch("https://api.coze.cn/v3/chat",{method:"POST",headers:{Accept:"text/event-stream","Content-Type":"application/json",Authorization:"Bearer pat_xRZb8zGVA76atWy3qhHPZ6vWacjU9ByOTxiKZic33Q6kK5qB5ZCH8VO6hkQ0XgMF"},body:JSON.stringify({bot_id:"7359776236354846761",user_id:"blog.yuanpei.me",stream:!0,auto_save_history:!0,additional_messages:[{role:"user",content:e,content_type:"text"}]})});if(!n.ok)throw console.error(n),new Error(`HTTP error! status: ${n.status}`);let o=n.body.getReader(),s=new TextDecoder,a="";for(;;){let{done:T,value:H}=await o.read();if(T)break;for(a+=s.decode(H);a.indexOf(`
`)!=-1;){let w=a.indexOf(`
`),c=a.slice(0,w);if(a=a.slice(w+1),!(c.startsWith("event:")&&c.trim()=="event:conversation.message.delta")){if(c.startsWith("event:")&&c.trim()=="event:conversation.message.completed")break;if(c.startsWith("data:")){if(c.includes("[DONE]"))break;let h=JSON.parse(c.substring(5));h.type=="answer"&&!h.created_at&&(yield h)}}}}}})();})();
