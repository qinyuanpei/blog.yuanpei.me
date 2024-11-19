(()=>{(function(){let g=document.createElement("div"),o=g.attachShadow({mode:"open"}),x=document.createElement("style");x.textContent=`
      :host {
        display: block;
      }
    `,o.appendChild(x);let m=document.createElement("link");m.rel="stylesheet",m.href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css",o.appendChild(m);let v=document.createElement("script");v.src="https://cdn.jsdelivr.net/npm/marked/marked.min.js",o.appendChild(v);let w=document.createElement("style");w.innerHTML=`
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
      transform: translateX(-50%);
      width: 50vw;
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
    `,o.appendChild(w);let u=document.createElement("div");u.id="chat-widget-container",o.appendChild(u),document.body.append(g),u.innerHTML=`
      <div id="chat-bubble" class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer text-3xl">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <div id="chat-popup" class="hidden absolute bottom-20 right-0 bg-white rounded-md shadow-md flex flex-col transition-all text-lg">
        <div id="chat-header" class="flex justify-between items-center p-4 bg-gray-800 text-white rounded-t-md">
          <h3 class="m-0 text-2xl">\u535A\u5BA2\u52A9\u624B</h3>
          <div class="flex">
            <button id="expand-popop" class="bg-transparent border-none text-white cursor-pointer hover:bg-gray-600 px-1" title="\u5168\u5C4F/\u8FD8\u539F">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"/>
              </svg>
            </button>
            <button id="close-popup" class="bg-transparent border-none text-white cursor-pointer hover:bg-gray-600 px-1" title="\u5173\u95ED">
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
    `;let p=o.getElementById("chat-input"),c=o.getElementById("chat-submit"),d=o.getElementById("chat-messages"),k=o.getElementById("chat-bubble"),E=o.getElementById("chat-popup"),M=o.getElementById("close-popup"),H=o.getElementById("expand-popop"),L="\u4F60\u597D\uFF0C\u8FD9\u91CC\u662F\u535A\u5BA2 [\u201C\u5143\u89C6\u89D2\u201D](https://blog.yuanpei.me) \u7684 AI \u52A9\u624B\uFF0C\u4F60\u53EF\u4EE5\u4ECE\u8FD9\u91CC\u4E86\u89E3\u535A\u4E3B\u7684\u4FE1\u606F\uFF0C\u5BF9\u535A\u5BA2\u7684\u5185\u5BB9\u8FDB\u884C\u68C0\u7D22\u548C\u63D0\u95EE\u3002";c.addEventListener("click",async function(){let t=p.value.trim();t&&(d.scrollTop=d.scrollHeight,p.value="",await f(t))}),p.addEventListener("keyup",function(t){t.key==="Enter"&&c.click()}),k.addEventListener("click",function(){b()}),M.addEventListener("click",function(){b()}),H.addEventListener("click",function(){E.classList.toggle("fullscreen")});function b(){let t=document.querySelector(".container");o.querySelector(".mask").classList.toggle("show");let n=o.getElementById("chat-popup");n.classList.toggle("hidden"),n.classList.contains("fullscreen")&&n.classList.toggle("fullscreen"),n.classList.contains("hidden")?(t.style.pointerEvents="auto",document.documentElement.style.overflowY="auto"):(o.getElementById("chat-input").focus(),t.style.pointerEvents="none",document.documentElement.style.overflowY="hidden"),I(L)}async function f(t){let s=document.createElement("div");s.className="flex justify-end mb-3",s.innerHTML=`
        <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%] text-xl">
          ${t}
        </div>
      `,d.appendChild(s),d.scrollTop=d.scrollHeight,p.value="",c.disabled=!0,c.classList.add("opacity-50","cursor-not-allowed");let n="";for await(let e of _(t)){let a=e.id,i=o.getElementById(a);e.type=="answer"?(n+=e.content,i?C(i,n):B(n,a)):e.type=="follow_up"&&T(e.content,a)}c.disabled=!1,c.classList.remove("opacity-50","cursor-not-allowed")}function B(t,s){let n=marked.parse(t),e=o.getElementById("chat-messages"),a=document.createElement("div");a.id=s,a.className="flex mb-3 text-lg",a.innerHTML=`
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
          <div class="markdown-content text-xl">${n}</div>
        </div>
      `,e.appendChild(a),e.scrollTop=e.scrollHeight}function C(t,s){let n=marked.parse(s),e=o.getElementById("chat-messages");t.innerHTML=`
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
            <div class="markdown-content text-xl">${n}</div>
        </div>
      `,e.scrollTop=e.scrollHeight}function T(t,s){let n=o.getElementById("chat-messages"),e=document.createElement("div");e.id=s,e.className="flex mb-3 text-lg",e.innerHTML=`
      <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%] border-2 border-gray-400 cursor-pointer" style="border-width: 1.5px;">
        ${t}
      </div>
      `,e.addEventListener("click",function(){f(t)}),n.appendChild(e),n.scrollTop=n.scrollHeight}function I(t){let s=o.getElementById("chat-messages");if(s.children.length!=0)return;let n=marked.parse(t),e=document.createElement("div");e.id="welcome",e.className="flex mb-3 text-lg",e.innerHTML=`
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
          <div class="markdown-content text-xl">${n}</div>
        </div>
      `,s.appendChild(e),s.scrollTop=s.scrollHeight}async function*_(t){let s="pat_xRZb8zGVA76atWy3qhHPZ6vWacjU9ByOTxiKZic33Q6kK5qB5ZCH8VO6hkQ0XgMF",n=window.location.pathname,e=n.startsWith("/posts")?`https://blog.yuanpei.me${n}`:"",a=[{role:"user",content:t,content_type:"text"}];e!=""&&a.unshift({role:"user",content:`post_url: ${e}`,content_type:"text"});let i=await fetch("https://api.coze.cn/v3/chat",{method:"POST",headers:{Accept:"text/event-stream","Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({bot_id:"7359776236354846761",user_id:"blog.yuanpei.me",stream:!0,auto_save_history:!0,additional_messages:a,custom_variables:{post_url:e}})});if(!i.ok)throw console.error(i),new Error(`HTTP error! status: ${i.status}`);let j=i.body.getReader(),z=new TextDecoder,l="";for(;;){let{done:P,value:S}=await j.read();if(P)break;for(l+=z.decode(S);l.indexOf(`
`)!=-1;){let y=l.indexOf(`
`),r=l.slice(0,y);if(l=l.slice(y+1),!(r.startsWith("event:")&&r.trim()=="event:conversation.message.delta")){if(r.startsWith("event:")&&r.trim()=="event:conversation.message.completed")break;if(r.startsWith("data:")){if(r.includes("[DONE]"))break;let h=JSON.parse(r.substring(5));(h.type=="answer"&&!h.created_at||h.type=="follow_up")&&(yield h)}}}}}})();})();
