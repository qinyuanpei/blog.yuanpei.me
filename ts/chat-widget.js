(()=>{(function(){let m=document.createElement("div"),n=m.attachShadow({mode:"open"}),g=document.createElement("style");g.textContent=`
      :host {
        display: block;
      }
    `,n.appendChild(g);let h=document.createElement("link");h.rel="stylesheet",h.href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css",n.appendChild(h);let v=document.createElement("script");v.src="https://cdn.jsdelivr.net/npm/marked/marked.min.js",n.appendChild(v);let x=document.createElement("style");x.innerHTML=`
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
      width: 20vw;
      transition: all 0.3s;
      overflow: hidden;
      z-index: 1000;
      pointer-events: auto;
    }

    #chat-popup.fullscreen {
      width: 80vw;
      height: 80vh;
      max-height: 80vh;
    }

    #chat-bubble {
      background-color: var(--accent-color);
    }

    #chat-header {
      background-color: var(--accent-color);
    }

    #chat-submit {
      background-color: var(--accent-color);
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
    
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 999;
      pointer-events: none;
      touch-action: none;
    }
    .mask.show {
      display: block;
    }

    @media (max-width: 768px) {
      #chat-widget-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        flex-direction: column;
      }
      #chat-popup {
        position: fixed;
        top: 10vh;
        right: 0px;
        bottom: 0px;
        left: 0;
        width: 100vw;
        height: 90vh;
        max-height: 90vh;
        border-radius: .375rem;
        box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);
        background: #fff;
        z-index: 1000;
        pointer-events: auto;
      }
      #expand-popop {
        display: none;
      }
    }
    `,n.appendChild(x);let u=document.createElement("div");u.id="chat-widget-container",n.appendChild(u),document.body.append(m),u.innerHTML=`
      <div id="chat-bubble" class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer text-3xl">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <div id="chat-popup" class="hidden absolute bottom-20 right-0 bg-white rounded-md shadow-md flex flex-col transition-all text-lg">
        <div id="chat-header" class="flex justify-between items-center p-4 bg-gray-800 text-white rounded-t-md">
          <h3 class="m-0 text-2xl">\u535A\u5BA2\u52A9\u624B</h3>
          <div class="flex">
            <button id="expand-popop" class="bg-transparent border-none text-white cursor-pointer hover:bg-gray-600" title="\u5168\u5C4F/\u8FD8\u539F">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"/>
              </svg>
            </button>
            <button id="close-popup" class="bg-transparent border-none text-white cursor-pointer hover:bg-gray-600" title="\u5173\u95ED">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div id="chat-messages" class="flex-1 p-4 overflow-y-auto"></div>
        <div id="chat-input-container" class="p-4 border-t border-gray-200">
          <div class="flex space-x-4 items-center">
            <input type="text" id="chat-input" class="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none w-3/4 hover:border-blue-300" placeholder="\u5728\u8FD9\u91CC\u8F93\u5165\u4F60\u7684\u95EE\u9898..." text-xl>
            <button id="chat-submit" class="bg-gray-800 text-white rounded-md px-4 py-2 cursor-pointer" title="\u53D1\u9001">\u53D1\u9001</button>
          </div>
          <div class="flex text-center text-base pt-4">
            <span class="flex-1 text-black">Prompted by <a href="https://twitter.com/anantrp" target="_blank" class="text-indigo-600">@anantrp</a> & Powered by <a href="https://www.coze.cn" target="_blank" class="text-indigo-600"/>Coze</a></span>
          </div>
        </div>
      </div>
      <div class="mask"></div>
    `;let l=n.getElementById("chat-input"),c=n.getElementById("chat-submit"),d=n.getElementById("chat-messages"),y=n.getElementById("chat-bubble"),k=n.getElementById("chat-popup"),E=n.getElementById("close-popup"),L=n.getElementById("expand-popop");c.addEventListener("click",async function(){let o=l.value.trim();o&&(d.scrollTop=d.scrollHeight,l.value="",await b(o))}),l.addEventListener("keyup",function(o){o.key==="Enter"&&c.click()}),y.addEventListener("click",function(){w()}),E.addEventListener("click",function(){w()}),L.addEventListener("click",function(){k.classList.toggle("fullscreen")});function w(){let o=document.querySelector(".container");n.querySelector(".mask").classList.toggle("show");let e=n.getElementById("chat-popup");e.classList.toggle("hidden"),e.classList.contains("fullscreen")&&e.classList.toggle("fullscreen"),e.classList.contains("hidden")?(o.style.pointerEvents="auto",document.documentElement.style.overflowY="auto"):(n.getElementById("chat-input").focus(),o.style.pointerEvents="none",document.documentElement.style.overflowY="hidden")}async function b(o){let s=document.createElement("div");s.className="flex justify-end mb-3",s.innerHTML=`
        <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%] text-xl">
          ${o}
        </div>
      `,d.appendChild(s),d.scrollTop=d.scrollHeight,l.value="",c.disabled=!0,c.classList.add("opacity-50","cursor-not-allowed");let e="";for await(let t of H(o)){let a=t.id,i=n.getElementById(a);t.type=="answer"?(e+=t.content,i?B(i,e):M(e,a)):t.type=="follow_up"&&C(t.content,a)}c.disabled=!1,c.classList.remove("opacity-50","cursor-not-allowed")}function M(o,s){let e=marked.parse(o),t=n.getElementById("chat-messages"),a=document.createElement("div");a.id=s,a.className="flex mb-3 text-lg",a.innerHTML=`
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
          <div class="markdown-content">${e}</div>
        </div>
      `,t.appendChild(a),t.scrollTop=t.scrollHeight}function B(o,s){let e=marked.parse(s),t=n.getElementById("chat-messages");o.innerHTML=`
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
            <div class="markdown-content text-xl">${e}</div>
        </div>
      `,t.scrollTop=t.scrollHeight}function C(o,s){let e=n.getElementById("chat-messages"),t=document.createElement("div");t.id=s,t.className="flex mb-3 text-lg",t.innerHTML=`
      <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%] border-2 border-gray-400 cursor-pointer" style="border-width: 1.5px;">
        ${o}
      </div>
      `,t.addEventListener("click",function(){b(o)}),e.appendChild(t),e.scrollTop=e.scrollHeight}async function*H(o){let e=await fetch("https://api.coze.cn/v3/chat",{method:"POST",headers:{Accept:"text/event-stream","Content-Type":"application/json",Authorization:"Bearer pat_xRZb8zGVA76atWy3qhHPZ6vWacjU9ByOTxiKZic33Q6kK5qB5ZCH8VO6hkQ0XgMF"},body:JSON.stringify({bot_id:"7359776236354846761",user_id:"blog.yuanpei.me",stream:!0,auto_save_history:!0,additional_messages:[{role:"user",content:o,content_type:"text"}]})});if(!e.ok)throw console.error(e),new Error(`HTTP error! status: ${e.status}`);let t=e.body.getReader(),a=new TextDecoder,i="";for(;;){let{done:T,value:I}=await t.read();if(T)break;for(i+=a.decode(I);i.indexOf(`
`)!=-1;){let f=i.indexOf(`
`),r=i.slice(0,f);if(i=i.slice(f+1),!(r.startsWith("event:")&&r.trim()=="event:conversation.message.delta")){if(r.startsWith("event:")&&r.trim()=="event:conversation.message.completed")break;if(r.startsWith("data:")){if(r.includes("[DONE]"))break;let p=JSON.parse(r.substring(5));(p.type=="answer"&&!p.created_at||p.type=="follow_up")&&(yield p)}}}}}})();})();
