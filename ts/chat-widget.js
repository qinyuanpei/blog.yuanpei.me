(() => {
  // <stdin>
  (function() {
    const host = document.createElement("div");
    const shadow = host.attachShadow({ mode: "open" });
    const shadowStyle = document.createElement("style");
    shadowStyle.textContent = `
      :host {
        display: block;
      }
    `;
    shadow.appendChild(shadowStyle);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css";
    shadow.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
    shadow.appendChild(script);
    const injectedStyle = document.createElement("style");
    injectedStyle.innerHTML = `
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
    `;
    shadow.appendChild(injectedStyle);
    const chatWidgetContainer = document.createElement("div");
    chatWidgetContainer.id = "chat-widget-container";
    shadow.appendChild(chatWidgetContainer);
    document.body.append(host);
    chatWidgetContainer.innerHTML = `
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
    `;
    const chatInput = shadow.getElementById("chat-input");
    const chatSubmit = shadow.getElementById("chat-submit");
    const chatMessages = shadow.getElementById("chat-messages");
    const chatBubble = shadow.getElementById("chat-bubble");
    const chatPopup = shadow.getElementById("chat-popup");
    const closePopup = shadow.getElementById("close-popup");
    const expandPopup = shadow.getElementById("expand-popop");
    const welcomeMessage = "\u4F60\u597D\uFF0C\u8FD9\u91CC\u662F\u535A\u5BA2 [\u201C\u5143\u89C6\u89D2\u201D](https://blog.yuanpei.me) \u7684 AI \u52A9\u624B\uFF0C\u4F60\u53EF\u4EE5\u4ECE\u8FD9\u91CC\u4E86\u89E3\u535A\u4E3B\u7684\u4FE1\u606F\uFF0C\u5BF9\u535A\u5BA2\u7684\u5185\u5BB9\u8FDB\u884C\u68C0\u7D22\u548C\u63D0\u95EE\u3002";
    chatSubmit.addEventListener("click", async function() {
      const message = chatInput.value.trim();
      if (!message)
        return;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      chatInput.value = "";
      await onUserRequest(message);
    });
    chatInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        chatSubmit.click();
      }
    });
    chatBubble.addEventListener("click", function() {
      togglePopup();
    });
    closePopup.addEventListener("click", function() {
      togglePopup();
    });
    expandPopup.addEventListener("click", function() {
      chatPopup.classList.toggle("fullscreen");
    });
    function togglePopup() {
      const mainCotainer = document.querySelector(".container");
      const maskElement = shadow.querySelector(".mask");
      maskElement.classList.toggle("show");
      const chatPopup2 = shadow.getElementById("chat-popup");
      chatPopup2.classList.toggle("hidden");
      if (chatPopup2.classList.contains("fullscreen")) {
        chatPopup2.classList.toggle("fullscreen");
      }
      if (!chatPopup2.classList.contains("hidden")) {
        shadow.getElementById("chat-input").focus();
        mainCotainer.style.pointerEvents = "none";
        document.documentElement.style.overflowY = "hidden";
      } else {
        mainCotainer.style.pointerEvents = "auto";
        document.documentElement.style.overflowY = "auto";
      }
      showWelcome(welcomeMessage);
    }
    async function onUserRequest(message) {
      const messageElement = document.createElement("div");
      messageElement.className = "flex justify-end mb-3";
      messageElement.innerHTML = `
        <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%] text-xl">
          ${message}
        </div>
      `;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      chatInput.value = "";
      chatSubmit.disabled = true;
      chatSubmit.classList.add("opacity-50", "cursor-not-allowed");
      let replyMessage = "";
      for await (const result of callCozeApi(message)) {
        const messageId = result.id;
        const replyElement = shadow.getElementById(messageId);
        if (result.type == "answer") {
          replyMessage += result.content;
          if (replyElement) {
            updateReply(replyElement, replyMessage);
          } else {
            reply(replyMessage, messageId);
          }
        } else if (result.type == "follow_up") {
          addSuggestion(result.content, messageId);
        }
      }
      chatSubmit.disabled = false;
      chatSubmit.classList.remove("opacity-50", "cursor-not-allowed");
    }
    function reply(message, id) {
      const markedHtml = marked.parse(message);
      const chatMessages2 = shadow.getElementById("chat-messages");
      const replyElement = document.createElement("div");
      replyElement.id = id;
      replyElement.className = "flex mb-3 text-lg";
      replyElement.innerHTML = `
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
          <div class="markdown-content text-xl">${markedHtml}</div>
        </div>
      `;
      chatMessages2.appendChild(replyElement);
      chatMessages2.scrollTop = chatMessages2.scrollHeight;
    }
    function updateReply(replyElement, message) {
      const markedHtml = marked.parse(message);
      const chatMessages2 = shadow.getElementById("chat-messages");
      replyElement.innerHTML = `
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
            <div class="markdown-content text-xl">${markedHtml}</div>
        </div>
      `;
      chatMessages2.scrollTop = chatMessages2.scrollHeight;
    }
    function addSuggestion(content, id) {
      const chatMessages2 = shadow.getElementById("chat-messages");
      const suggestElement = document.createElement("div");
      suggestElement.id = id;
      suggestElement.className = "flex mb-3 text-lg";
      suggestElement.innerHTML = `
      <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%] border-2 border-gray-400 cursor-pointer" style="border-width: 1.5px;">
        ${content}
      </div>
      `;
      suggestElement.addEventListener("click", function() {
        onUserRequest(content);
      });
      chatMessages2.appendChild(suggestElement);
      chatMessages2.scrollTop = chatMessages2.scrollHeight;
    }
    function showWelcome(message) {
      const chatMessages2 = shadow.getElementById("chat-messages");
      if (chatMessages2.children.length != 0)
        return;
      const markedHtml = marked.parse(message);
      const welcomeElement = document.createElement("div");
      welcomeElement.id = "welcome";
      welcomeElement.className = "flex mb-3 text-lg";
      welcomeElement.innerHTML = `
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
          <div class="markdown-content text-xl">${markedHtml}</div>
        </div>
      `;
      chatMessages2.appendChild(welcomeElement);
      chatMessages2.scrollTop = chatMessages2.scrollHeight;
    }
    async function* callCozeApi(input) {
      const token = "pat_xRZb8zGVA76atWy3qhHPZ6vWacjU9ByOTxiKZic33Q6kK5qB5ZCH8VO6hkQ0XgMF";
      const path_name = window.location.pathname;
      const post_url = path_name.startsWith("/posts") ? `https://blog.yuanpei.me${path_name}` : "";
      const messages = [{
        role: "user",
        content: input,
        content_type: "text"
      }];
      if (post_url != "") {
        messages.unshift({
          role: "user",
          content: `post_url: ${post_url}`,
          content_type: "text"
        });
      }
      const response = await fetch(`https://api.coze.cn/v3/chat`, {
        method: "POST",
        headers: {
          "Accept": "text/event-stream",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          bot_id: "7359776236354846761",
          user_id: "blog.yuanpei.me",
          stream: true,
          auto_save_history: true,
          additional_messages: messages,
          custom_variables: {
            post_url
          }
        })
      });
      if (!response.ok) {
        console.error(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let resultData = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done)
          break;
        resultData += decoder.decode(value);
        while (resultData.indexOf("\n") != -1) {
          const messageIndex = resultData.indexOf("\n");
          const message = resultData.slice(0, messageIndex);
          resultData = resultData.slice(messageIndex + 1);
          if (message.startsWith("event:") && message.trim() == "event:conversation.message.delta")
            continue;
          if (message.startsWith("event:") && message.trim() == "event:conversation.message.completed")
            break;
          if (message.startsWith("data:")) {
            if (message.includes("[DONE]"))
              break;
            const jsonMessage = JSON.parse(message.substring(5));
            if (jsonMessage.type == "answer" && !jsonMessage.created_at || jsonMessage.type == "follow_up") {
              yield jsonMessage;
            }
          }
        }
      }
    }
  })();
})();
