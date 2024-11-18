(()=>{(function(){let g=document.createElement("div"),t=g.attachShadow({mode:"open"}),v=document.createElement("style");v.textContent=`
      :host {
        display: block;
      }
    `,t.appendChild(v);let u=document.createElement("link");u.rel="stylesheet",u.href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css",t.appendChild(u);let x=document.createElement("script");x.src="https://cdn.jsdelivr.net/npm/marked/marked.min.js",t.appendChild(x);let w=document.createElement("style");w.innerHTML=`
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
    `,t.appendChild(w);let m=document.createElement("div");m.id="chat-widget-container",t.appendChild(m),document.body.append(g),m.innerHTML=`
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
    `;let d=t.getElementById("chat-input"),r=t.getElementById("chat-submit"),l=t.getElementById("chat-messages"),k=t.getElementById("chat-bubble"),E=t.getElementById("chat-popup"),L=t.getElementById("close-popup"),M=t.getElementById("expand-popop");r.addEventListener("click",async function(){let n=d.value.trim();n&&(l.scrollTop=l.scrollHeight,d.value="",await f(n))}),d.addEventListener("keyup",function(n){n.key==="Enter"&&r.click()}),k.addEventListener("click",function(){b()}),L.addEventListener("click",function(){b()}),M.addEventListener("click",function(){E.classList.toggle("fullscreen")});function b(){let n=document.querySelector(".container");t.querySelector(".mask").classList.toggle("show");let o=t.getElementById("chat-popup");o.classList.toggle("hidden"),o.classList.contains("fullscreen")&&o.classList.toggle("fullscreen"),o.classList.contains("hidden")?(n.style.pointerEvents="auto",document.documentElement.style.overflowY="auto"):(t.getElementById("chat-input").focus(),n.style.pointerEvents="none",document.documentElement.style.overflowY="hidden")}async function f(n){let a=document.createElement("div");a.className="flex justify-end mb-3",a.innerHTML=`
        <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%] text-xl">
          ${n}
        </div>
      `,l.appendChild(a),l.scrollTop=l.scrollHeight,d.value="",r.disabled=!0,r.classList.add("opacity-50","cursor-not-allowed");let o="";for await(let e of T(n)){let s=e.id,p=t.getElementById(s);e.type=="answer"?(o+=e.content,p?C(p,o):B(o,s)):e.type=="follow_up"&&H(e.content,s)}r.disabled=!1,r.classList.remove("opacity-50","cursor-not-allowed")}function B(n,a){let o=marked.parse(n),e=t.getElementById("chat-messages"),s=document.createElement("div");s.id=a,s.className="flex mb-3 text-lg",s.innerHTML=`
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
          <div class="markdown-content max-w-4xl mx-auto px-4">${o}</div>
        </div>
      `,e.appendChild(s),e.scrollTop=e.scrollHeight}function C(n,a){let o=marked.parse(a),e=t.getElementById("chat-messages");n.innerHTML=`
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
            <div class="markdown-content text-xl">${o}</div>
        </div>
      `,e.scrollTop=e.scrollHeight}function H(n,a){let o=t.getElementById("chat-messages"),e=document.createElement("div");e.id=a,e.className="flex mb-3 text-lg",e.innerHTML=`
      <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%] border-2 border-gray-400 cursor-pointer" style="border-width: 1.5px;">
        ${n}
      </div>
      `,e.addEventListener("click",function(){f(n)}),o.appendChild(e),o.scrollTop=o.scrollHeight}async function*T(n){let a="pat_xRZb8zGVA76atWy3qhHPZ6vWacjU9ByOTxiKZic33Q6kK5qB5ZCH8VO6hkQ0XgMF",o=window.location.pathname,e=o.startsWith("/posts")?`https://blog.yuanpei.me${o}`:"",s=await fetch("https://api.coze.cn/v3/chat",{method:"POST",headers:{Accept:"text/event-stream","Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({bot_id:"7359776236354846761",user_id:"blog.yuanpei.me",stream:!0,auto_save_history:!0,additional_messages:[{role:"user",content:n,content_type:"text"}],custom_variables:{post_url:e}})});if(!s.ok)throw console.error(s),new Error(`HTTP error! status: ${s.status}`);let p=s.body.getReader(),I=new TextDecoder,c="";for(;;){let{done:_,value:j}=await p.read();if(_)break;for(c+=I.decode(j);c.indexOf(`
`)!=-1;){let y=c.indexOf(`
`),i=c.slice(0,y);if(c=c.slice(y+1),!(i.startsWith("event:")&&i.trim()=="event:conversation.message.delta")){if(i.startsWith("event:")&&i.trim()=="event:conversation.message.completed")break;if(i.startsWith("data:")){if(i.includes("[DONE]"))break;let h=JSON.parse(i.substring(5));(h.type=="answer"&&!h.created_at||h.type=="follow_up")&&(yield h)}}}}}})();})();
