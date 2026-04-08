(function () {
  const desktopIconsEl = document.getElementById("desktop-icons");
  const windowLayerEl = document.getElementById("window-layer");
  const taskbarWindowsEl = document.getElementById("taskbar-windows");
  const startButtonEl = document.getElementById("start-button");
  const startMenuEl = document.getElementById("start-menu");
  const startMenuItemsEl = document.getElementById("start-menu-items");
  const clockEl = document.getElementById("taskbar-clock");
  const helperPanelEl = document.getElementById("helper-panel");
  const helperShowEl = document.getElementById("helper-show");
  const notificationHostEl = document.getElementById("notification-host");
  const dialogHostEl = document.getElementById("dialog-host");

  const EMAIL_CONFIG = {
    serviceId: "service_zgrqxna",
    templateId: "template_zr9taaq",
    publicKey: "97UebG1s_xNtEOrFV",
    toEmail: "spencer@generalintelligencecompany.com",
  };

  const DESKTOP_ITEMS = [
    { id: "computer", title: "My Computer", icon: "computer" },
    { id: "pictures", title: "My Pictures", icon: "pictures" },
    { id: "videos", title: "My Videos", icon: "videos" },
    { id: "music", title: "My Music", icon: "music" },
    { id: "chat", title: "AI Chat", icon: "chat" },
    { id: "mail", title: "Mail Me", icon: "mail" },
    { id: "secret", title: "Secrets", icon: "secret" },
    { id: "recycle", title: "Recycle Bin", icon: "recycle" },
  ];

  const START_MENU_ITEMS = [
    { id: "computer", title: "My Computer", icon: "computer" },
    { id: "pictures", title: "My Pictures", icon: "pictures" },
    { id: "videos", title: "My Videos", icon: "videos" },
    { id: "music", title: "My Music", icon: "music" },
    { id: "chat", title: "AI Chat", icon: "chat" },
    { id: "mail", title: "Mail Me", icon: "mail" },
    { id: "secret", title: "Secrets", icon: "secret" },
    { id: "recycle", title: "Recycle Bin", icon: "recycle" },
    { divider: true },
    { id: "resume", title: "Resume.txt", icon: "text" },
    { divider: true },
    { id: "shutdown", title: "Shut Down...", icon: "computer" },
  ];

  const HELPER_TIPS = [
    { label: "Where is Spencer's Resume?", icon: "text", action: function () { openDocument("resume"); } },
    { label: "What is Spencer interested in?", icon: "folder", action: function () { openDocument("about"); } },
    { label: "I just want to watch his videos.", icon: "videos", action: function () { openPrimaryWindow("videos"); } },
    { label: "How do I contact Spencer?", icon: "mail", action: function () { openPrimaryWindow("mail"); } },
    { label: "Are there any easter eggs?", icon: "secret", action: function () { openPrimaryWindow("secret"); } },
    { label: "Wave", icon: "chat", action: function () { showDialog("Assistant", "The assistant waves enthusiastically."); } },
  ];

  const NOTIFICATIONS = [
    { icon: "&#128227;", title: "I moved jobs!", message: "Learn more about my new work in Resume.txt and About Me.txt." },
  ];

  const IMAGES = [
    { name: "cofounder.jpg", src: "./pictures/cofounder.jpg", caption: "Cofounder" },
    { name: "locked_in.jpg", src: "./pictures/locked_in.jpg", caption: "Locked in" },
    { name: "my_home.jpg", src: "./pictures/my_home.jpg", caption: "My home" },
  ];

  const VIDEOS = [
    { id: "m-617tsKQkk", title: "just the two of us - bill withers", description: "arrangement by seiji igusa" },
    { id: "3DnauBiIjzk", title: "isn't she lovely? - stevie wonder", description: "arrangement by kazuki isogai" },
    { id: "7AxIA9tsjYA", title: "ê³ ë¯¼ì¤‘ë… (tbh) - qwer", description: "arrangement by LiNela. my confession." },
    { id: "1dRmR_Zvqng", title: "bohemian rhapsody - queen", description: "arrangement by kenneth." },
    { id: "caNwN1ENMzE", title: "i want to be close to you - the carpenters", description: "arrangement by kazuki isogai." },
    { id: "fCECnGZXEbg", title: "ë´„ì—¬ë¦„ê°€ì„ê²¨ìš¸ (still life) - bigbang", description: "arranged by me, inspired by others." },
    { id: "NfF9dMV8DN0", title: "dilemma - nelly", description: "slowed and reverbed. arranged by torbjÃ¸rn hoelsveen." },
  ];

  const MUSIC_TRACKS = [
    { artist: "070 shake", title: "guilty conscience", file: "070 shake - guilty conscience.mp3" },
    { artist: "day6", title: "happy", file: "day6 - happy.mp3" },
    { artist: "hump back", title: "haikei shounen yo", file: "hump back - haikei shounen yo.mp3" },
    { artist: "kang suji", title: "violet fragrance", file: "kang suji - violet fragrance.mp3" },
    { artist: "rumble fish", title: "eurachacha", file: "rumble fish - eurachacha.mp3" },
    { artist: "xg", title: "left right", file: "xg - left right.mp3" },
    { artist: "lim jaebum", title: "after this night", file: "lim jaebum - after this night.mp3" },
  ];

  const PUBLICATIONS = [
    { name: "DF-RAG.pdf", url: "https://arxiv.org" },
    { name: "RAFFLES.pdf", url: "https://arxiv.org" },
    { name: "Nature Communications.pdf", url: "https://arxiv.org" },
    { name: "PNAS.pdf", url: "https://arxiv.org" },
    { name: "RAG Coherence.pdf", url: "https://arxiv.org" },
  ];

  const RECYCLE_ITEMS = [
    {
      id: "ski",
      name: "telemark_skiing.txt",
      icon: "computer",
      dateDeleted: "Jan 2022",
      content: "I broke the same part of my wrist twice skiing and snowboarding. I used to teach skiing and was an avid nordic (telemark) skier, but this is no longer possible for me.\n\nI now have a metal plate in my wrist and set off TSA alarms occasionally.",
    },
    {
      id: "mbti",
      name: "mbti.txt",
      icon: "text",
      dateDeleted: "Mar 2024",
      content: "Like most Koreans, I used to be obsessed with Myers-Briggs personality tests. When I was younger, it became a social crutch. I'd use it to figure out how I felt about someone without needing to go through the actual process to getting to know them. Eventually, I realized I'd become way too dependent on it, constantly categorizing people based on their type. I don't do that anymore. People are so much more complex and nuanced than 16 boxes, no matter how tempting it is to sort everyone into them.\n\nI'm an INFJ, so you can imagine how satisfying it felt to put people into neat little categories. Even when they didn't really fit.",
    },
    {
      id: "top10",
      name: "top10_lists.txt",
      icon: "folder",
      dateDeleted: "Sep 2023",
      content: "I used to be obsessed with tracking every single interest I had with analytics. Think Spotify Wrapped, but for everything: fitness, music, books, movies, food, etc.\n\nThen I realized that I wasn't choosing things based on what I actually wanted anymore. I was choosing based on how it would show up later. If I really wanted to listen to a song, I'd skip it because I didn't want it messing up my top 10. I'd pick books not because they interested me, but because they'd look good next to the ones I'd already read.\n\nAt some point, I just stopped caring about how it all looked, to others, or even to some future version of myself looking back. Now I just do whatever I feel like in the moment. No tracking, no curating. I think curation is overrated.",
    },
  ];

  const COMPUTER_FOLDERS = {
    Documents: [
      { id: "resume", name: "Resume.txt", type: "document", icon: "text", description: "Work experience, education, and selected publications." },
      { id: "about", name: "About Me.txt", type: "document", icon: "text", description: "Research interests, current work, and links." },
      { id: "skills", name: "Skills.txt", type: "document", icon: "text", description: "Technical skills, tools, and specializations." },
    ],
    Writings: [
      { id: "writing1", name: "On Agentic Memory.txt", type: "document", icon: "text", description: "Essay dated January 15, 2025." },
      { id: "writing2", name: "íŒŒëž€ ëŒ.txt", type: "document", icon: "text", description: "A Korean poem by Han Kang." },
    ],
    Publications: PUBLICATIONS.map(function (publication) {
      return { id: publication.name, name: publication.name, type: "pdf", icon: "pdf", url: publication.url, description: "Open publication link" };
    }),
  };

  const FILES = {
    resume: { title: "Resume.txt", icon: "text" },
    about: { title: "About Me.txt", icon: "text" },
    skills: { title: "Skills.txt", icon: "text" },
    writing1: { title: "On Agentic Memory.txt", icon: "text" },
    writing2: { title: "íŒŒëž€ ëŒ.txt", icon: "text" },
  };

  const state = {
    windows: new Map(),
    zIndex: 100,
    offset: 0,
    selectedDesktop: null,
    activeWindowId: null,
    lastDesktopTap: null,
  };

  function getViewportWidth() {
    return Math.max(320, Math.round(window.visualViewport ? window.visualViewport.width : window.innerWidth));
  }

  function getViewportHeight() {
    return Math.max(320, Math.round(window.visualViewport ? window.visualViewport.height : window.innerHeight));
  }

  function isTouchDevice() {
    return window.matchMedia("(pointer: coarse)").matches || getViewportWidth() <= 768;
  }

  function getTaskbarHeight() {
    if (getViewportWidth() <= 480) return 32;
    if (getViewportWidth() <= 768) return 36;
    return 40;
  }

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .svg-icon{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}.svg-icon svg{width:100%;height:100%;display:block;shape-rendering:crispEdges}.svg-icon.size-16{width:16px;height:16px}.svg-icon.size-20{width:20px;height:20px}.svg-icon.size-32{width:32px;height:32px}.svg-icon.size-40{width:40px;height:40px}.svg-icon.size-48{width:48px;height:48px}.icon-image{width:40px;height:40px;display:flex;align-items:center;justify-content:center}.desktop-icon{width:74px;padding:5px 2px}.icon-label{font-size:11px;line-height:1.15}.window-icon,.taskbar-window-icon,.start-menu-icon,.tree-icon,.file-icon,.video-icon,.preview-icon{display:inline-flex;align-items:center;justify-content:center}.window-icon .svg-icon,.taskbar-window-icon .svg-icon,.preview-icon .svg-icon{width:16px;height:16px}.start-menu-icon .svg-icon,.tree-icon .svg-icon,.file-icon .svg-icon,.video-icon .svg-icon{width:20px;height:20px}.window-button.minimize span{font-size:12px;margin-top:0!important;line-height:1;transform:translateY(-2px);display:block}.window-button.maximize span,.window-button.close span{line-height:1}.explorer-shell,.music-window,.full-image-viewer{display:flex;flex-direction:column;height:100%;background:silver;font-family:W95FA,"MS Sans Serif",Arial,sans-serif}.explorer-toolbar,.music-toolbar,.image-status,.music-status{display:flex;align-items:center;gap:8px;padding:4px 8px;background:silver;border-bottom:1px solid #808080;font-size:11px}.explorer-main,.music-main{display:flex;flex:1;overflow:hidden;gap:4px;padding:4px}.folder-panel,.explorer-preview,.music-player{background:silver;border:2px solid;border-color:#fff #000 #000 #fff;box-shadow:inset 1px 1px #dfdfdf,inset -1px -1px gray}.folder-panel{width:250px;display:flex;flex-direction:column}.panel-header{padding:4px 8px;background:linear-gradient(90deg,navy,#1084d0);color:#fff;font-weight:700;font-size:11px}.panel-content{flex:1;overflow-y:auto;background:#fff;padding:8px 4px;border:2px solid;border-color:#808080 #fff #fff #808080;margin:2px}.explorer-list,.music-playlist{flex:1;background:#fff;border:2px solid;border-color:#808080 #fff #fff #808080;overflow:auto;padding:8px}.file-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px}.file-card{display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px 8px;border:1px solid transparent;text-align:center;cursor:pointer;user-select:none}.file-card:hover,.image-file-tile:hover,.music-track:hover{background:#efefef}.file-card.selected,.image-file-tile.selected,.music-track.selected{background:navy;color:#fff}.file-card span:last-child{font-size:11px;line-height:1.35;word-break:break-word}.explorer-preview{width:280px;display:flex;flex-direction:column}.preview-section{flex:1;margin:2px;background:#fff;border:2px solid;border-color:#808080 #fff #fff #808080;padding:14px;overflow:auto}.preview-section h3{font-size:13px;margin:0 0 8px}.preview-section p{font-size:11px;line-height:1.5;margin:0 0 6px}.preview-muted{color:#666}.image-file-tile{display:flex;align-items:center;gap:8px;padding:6px 8px;cursor:pointer}.full-image-stage{flex:1;margin:4px;background:#fff;border:2px solid;border-color:#808080 #fff #fff #808080;display:flex;align-items:center;justify-content:center;padding:12px}.full-image-stage img,.preview-image{max-width:100%;max-height:100%;object-fit:contain}.music-playlist{width:280px;padding:0}.music-track{display:flex;gap:8px;padding:8px 10px;border-bottom:1px solid #ddd;cursor:pointer}.music-track-title{font-size:11px;font-weight:700}.music-track-artist{font-size:10px;opacity:.85}.music-player{flex:1;display:flex;flex-direction:column}.music-player-inner{flex:1;margin:2px;background:#fff;border:2px solid;border-color:#808080 #fff #fff #808080;padding:14px;display:flex;flex-direction:column;gap:14px}.music-player h3{margin:0;font-size:18px;color:navy}.music-player p{margin:0;font-size:12px;line-height:1.5}.music-player audio{width:100%}.music-note{padding:10px 12px;background:#f3f3f3;border-left:3px solid #008080;font-size:11px}.clippy-helper{position:fixed;right:20px;bottom:56px;z-index:10002}.clippy-helper-content{width:300px;background:silver;border:2px solid;border-color:#fff #000 #000 #fff;box-shadow:inset 1px 1px #dfdfdf,inset -1px -1px gray,2px 2px 6px #0006}.clippy-header{background:linear-gradient(90deg,navy,#1084d0);color:#fff;padding:3px 4px;display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:11px}.clippy-close{width:16px;height:16px;background:silver;border:1px solid;border-color:#fff #000 #000 #fff;box-shadow:inset 1px 1px #dfdfdf,inset -1px -1px gray;cursor:pointer;font-family:W95FA,"MS Sans Serif",Arial,sans-serif;line-height:1}.clippy-body{display:flex;gap:10px;padding:10px;align-items:center}.helper-avatar{width:56px;height:56px;border:2px solid;border-color:#808080 #fff #fff #808080;background:#fff;display:flex;align-items:center;justify-content:center}.clippy-message{font-size:11px;line-height:1.45}.helper-placeholder-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px}.helper-placeholder-grid img{width:100%;display:block;border:1px solid #bbb}.mail-content{display:flex;flex-direction:column;height:100%;background:#c5c4c4;overflow:hidden}.mail-form-wrapper{flex:1;display:flex;flex-direction:column;overflow:auto;padding:0 4px 8px}.form-container{display:flex;flex-direction:column;gap:8px;width:100%;margin:0;background:#c5c4c4;padding:6px 4px 8px;border:none;overflow:visible;cursor:default}.mail-textarea{position:relative!important;left:auto!important;transform:none!important;width:100%!important;height:180px!important;min-height:180px;max-height:none;display:block;margin-top:2px;padding:.5rem;font-size:14px;border:1px solid black;border-bottom-color:#fff;border-top-color:#000;border-left-color:#000;border-right-color:#fff;resize:vertical;border-radius:0;letter-spacing:.5px;background:#fff;font-family:W95FA,"MS Sans Serif",Arial,sans-serif;outline:none}.mail-status{font-size:11px;padding:4px 8px 0;color:#333}.mail-actions{display:flex;gap:6px;padding:2px 0 0}.mail-action-btn{display:inline-flex;align-items:center;justify-content:center;min-height:26px;padding:4px 10px;background:silver;border:2px solid;border-color:#fff #000 #000 #fff;box-shadow:inset 1px 1px #dfdfdf,inset -1px -1px gray;font-family:W95FA,"MS Sans Serif",Arial,sans-serif;font-size:11px;cursor:pointer;text-decoration:none;color:#000}.mail-action-btn:active{border-color:#000 #fff #fff #000;box-shadow:inset 1px 1px gray,inset -1px -1px #dfdfdf}.pdf-empty{padding:22px;font-size:12px;line-height:1.5}.pdf-empty a{color:#00e}@media(max-width:900px){.explorer-preview{width:240px}.music-main{flex-direction:column}.music-playlist{width:100%;max-height:220px}}@media(max-width:768px){.desktop-icon{width:72px;padding:5px 2px}.icon-image{width:40px;height:40px}.icon-label{font-size:10px;line-height:1.12}#desktop-icons{display:grid!important;grid-template-columns:repeat(2,72px);grid-auto-rows:min-content;justify-content:start;align-content:start;align-items:start;column-gap:8px;row-gap:6px;padding:10px 6px;width:152px;max-height:none;overflow:visible}.window{left:4px!important;top:4px!important;max-width:calc(100vw - 8px)!important;max-height:calc(100vh - 44px)!important}.window-resize-handle{display:none}.explorer-main{flex-direction:column}.folder-panel,.explorer-preview{width:100%}.clippy-helper,.clippy-show-button{display:none!important}.mail-actions{flex-wrap:wrap}.mail-textarea{height:160px!important;min-height:160px}.sendmail-icon{display:none}}@media(min-width:769px){#desktop-icons{padding:10px 8px;gap:8px}}
    `;
    document.head.appendChild(style);
  }

  function escapeHtml(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function iconSvg(key) {
    const common = 'viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"';
    switch (key) {
      case "computer": return '<svg ' + common + '><rect x="4" y="4" width="24" height="16" fill="#c0c0c0" stroke="#000"/><rect x="6" y="6" width="20" height="12" fill="#1084d0"/><rect x="12" y="21" width="8" height="3" fill="#c0c0c0" stroke="#000"/><rect x="9" y="24" width="14" height="3" fill="#c0c0c0" stroke="#000"/></svg>';
      case "pictures": return '<svg ' + common + '><rect x="4" y="5" width="24" height="22" fill="#fff7d1" stroke="#000"/><rect x="7" y="8" width="18" height="12" fill="#87ceeb"/><polygon points="8,20 14,14 18,18 21,15 25,20" fill="#2e8b57"/><circle cx="22" cy="11" r="2" fill="#ffd447"/><rect x="8" y="22" width="16" height="2" fill="#c09a5b"/></svg>';
      case "videos": return '<svg ' + common + '><rect x="4" y="7" width="18" height="18" fill="#dcdcdc" stroke="#000"/><rect x="8" y="11" width="10" height="10" fill="#000"/><polygon points="12,13 17,16 12,19" fill="#fff"/><polygon points="22,11 28,8 28,24 22,21" fill="#c0c0c0" stroke="#000"/><rect x="5" y="8" width="2" height="2" fill="#000"/><rect x="5" y="12" width="2" height="2" fill="#000"/><rect x="5" y="16" width="2" height="2" fill="#000"/><rect x="5" y="20" width="2" height="2" fill="#000"/></svg>';
      case "music": return '<svg ' + common + '><rect x="4" y="6" width="24" height="20" fill="#fff7d1" stroke="#000"/><rect x="7" y="9" width="12" height="2" fill="#000"/><rect x="7" y="13" width="12" height="2" fill="#000"/><path d="M22 9v10.5A3.5 3.5 0 1 1 20 16.4V11l6-1.5v8A3.5 3.5 0 1 1 24 14V8z" fill="#1084d0" stroke="#000"/></svg>';
      case "chat": return '<svg ' + common + '><path d="M5 7h16v11H11l-4 4v-4H5z" fill="#fff" stroke="#000"/><path d="M15 10h12v10h-6l-3 3v-3h-3z" fill="#d6f4ff" stroke="#000"/><circle cx="10" cy="12.5" r="1.1" fill="#1084d0"/><circle cx="13.5" cy="12.5" r="1.1" fill="#1084d0"/><circle cx="17" cy="12.5" r="1.1" fill="#1084d0"/></svg>';
      case "mail": return '<svg ' + common + '><rect x="4" y="7" width="24" height="18" fill="#fff" stroke="#000"/><path d="M4 9l12 8 12-8" fill="none" stroke="#000"/><path d="M4 24l8-8" fill="none" stroke="#000"/><path d="M28 24l-8-8" fill="none" stroke="#000"/><rect x="22" y="5" width="6" height="5" fill="#ff6b6b" stroke="#000"/></svg>';
      case "secret": return '<svg ' + common + '><rect x="8" y="14" width="16" height="12" rx="1" fill="#fff1a8" stroke="#000"/><path d="M11 14v-3a5 5 0 0 1 10 0v3" fill="none" stroke="#000" stroke-width="2"/><circle cx="16" cy="19" r="2" fill="#000"/><rect x="15" y="19" width="2" height="4" fill="#000"/></svg>';
      case "recycle": return '<svg ' + common + '><rect x="10" y="8" width="12" height="3" fill="#c0c0c0" stroke="#000"/><rect x="8" y="11" width="16" height="16" fill="#d6f4ff" stroke="#000"/><path d="M12 14v9M16 14v9M20 14v9" stroke="#1084d0"/><path d="M13 8l1-2h4l1 2" fill="none" stroke="#000"/></svg>';
      case "folder": return '<svg ' + common + '><path d="M4 10h9l2 2h13v12H4z" fill="#ffd15c" stroke="#000"/><path d="M4 10V7h9l2 2h13v3" fill="#ffe28a" stroke="#000"/></svg>';
      case "folder-open": return '<svg ' + common + '><path d="M4 11h9l2 2h13l-3 11H7z" fill="#ffd15c" stroke="#000"/><path d="M4 11V7h9l2 2h11v4" fill="#ffe28a" stroke="#000"/></svg>';
      case "pdf": return '<svg ' + common + '><path d="M8 4h12l4 4v20H8z" fill="#fff" stroke="#000"/><path d="M20 4v4h4" fill="#dcdcdc"/><rect x="10" y="16" width="12" height="8" fill="#c00"/><text x="16" y="22" font-size="6" text-anchor="middle" fill="#fff" font-family="Arial">PDF</text></svg>';
      case "image": return '<svg ' + common + '><rect x="5" y="6" width="22" height="20" fill="#fff" stroke="#000"/><rect x="8" y="9" width="16" height="10" fill="#87ceeb"/><polygon points="8,19 13,14 16,17 19,14 24,19" fill="#2e8b57"/><circle cx="20" cy="12" r="2" fill="#ffd447"/></svg>';
      default: return '<svg ' + common + '><path d="M8 4h12l4 4v20H8z" fill="#fff" stroke="#000"/><path d="M20 4v4h4" fill="#dcdcdc"/><rect x="11" y="11" width="10" height="1.5" fill="#000"/><rect x="11" y="15" width="10" height="1.5" fill="#000"/><rect x="11" y="19" width="8" height="1.5" fill="#000"/></svg>';
    }
  }

  function iconMarkup(key, size) {
    return '<span class="svg-icon size-' + (size || 32) + '">' + iconSvg(key) + '</span>';
  }

  function formatDesktopIconTitle(title) {
    return escapeHtml(title).replace(" ", "<br />");
  }

  function nextWindowBounds(defaultWidth, defaultHeight) {
    const viewportWidth = getViewportWidth();
    const viewportHeight = getViewportHeight();
    const taskbarHeight = getTaskbarHeight();
    if (isTouchDevice()) {
      return {
        x: 4,
        y: 4,
        width: Math.max(280, viewportWidth - 8),
        height: Math.max(260, viewportHeight - taskbarHeight - 8),
      };
    }
    const offset = (state.offset % 10) * 24;
    state.offset += 1;
    return {
      x: Math.max(16, 80 + offset),
      y: Math.max(16, 48 + offset),
      width: Math.min(defaultWidth, viewportWidth - 40),
      height: Math.min(defaultHeight, viewportHeight - taskbarHeight - 30),
    };
  }

  function setClock() {
    clockEl.textContent = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  function isRapidRepeat(lastTap, key) {
    return lastTap && lastTap.key === key && Date.now() - lastTap.time < 450;
  }

  function renderDesktopIcons() {
    desktopIconsEl.innerHTML = DESKTOP_ITEMS.map(function (item) {
      return '<div class="desktop-icon' + (state.selectedDesktop === item.id ? " selected" : "") + '" data-id="' + item.id + '"><div class="icon-image">' + iconMarkup(item.icon, 32) + '</div><div class="icon-label">' + formatDesktopIconTitle(item.title) + "</div></div>";
    }).join("");
    desktopIconsEl.querySelectorAll(".desktop-icon").forEach(function (element) {
      element.addEventListener("click", function (event) {
        event.stopPropagation();
        const id = element.dataset.id;
        if (isTouchDevice()) {
          state.selectedDesktop = id;
          renderDesktopIcons();
          openDesktopItem(id);
          return;
        }
        if (isRapidRepeat(state.lastDesktopTap, id)) {
          state.lastDesktopTap = null;
          openDesktopItem(id);
          return;
        }
        state.lastDesktopTap = { key: id, time: Date.now() };
        state.selectedDesktop = id;
        renderDesktopIcons();
      });
    });
  }

  function renderStartMenu() {
    startMenuItemsEl.innerHTML = START_MENU_ITEMS.map(function (item) {
      if (item.divider) {
        return '<div class="start-menu-divider"></div>';
      }
      return '<button class="start-menu-item" type="button" data-id="' + item.id + '"><span class="start-menu-icon">' + iconMarkup(item.icon, 20) + '</span><span class="start-menu-label">' + escapeHtml(item.title) + "</span></button>";
    }).join("");
    startMenuItemsEl.querySelectorAll(".start-menu-item").forEach(function (button) {
      button.addEventListener("click", function () {
        toggleStartMenu(false);
        const id = button.dataset.id;
        if (id === "resume") return openDocument("resume");
        if (id === "shutdown") return showDialog("Shut Down Windows", "It is now safe to turn off your computer.");
        openDesktopItem(id);
      });
    });
  }

  function renderHelper() {
    helperPanelEl.innerHTML = '<div class="clippy-helper-content"><div class="clippy-header"><span>Portfolio Assistant</span><button id="helper-close" class="clippy-close" type="button">&times;</button></div><div class="clippy-body"><div class="helper-avatar">' + iconMarkup("chat", 48) + '</div><p class="clippy-message">It looks like you\'re exploring Spencer\'s portfolio. Want a quick shortcut?</p></div><div id="helper-tips" class="clippy-tips"></div><div class="clippy-footer"><button id="helper-hide" class="clippy-action-button" type="button">Hide Assistant</button></div></div>';
    const helperTipsEl = helperPanelEl.querySelector("#helper-tips");
    helperTipsEl.innerHTML = HELPER_TIPS.map(function (tip, index) {
      return '<button class="clippy-tip-button" type="button" data-index="' + index + '"><span class="tip-icon">' + iconMarkup(tip.icon, 20) + '</span><span class="tip-label">' + escapeHtml(tip.label) + "</span></button>";
    }).join("");
    helperTipsEl.querySelectorAll(".clippy-tip-button").forEach(function (button) {
      button.addEventListener("click", function () {
        HELPER_TIPS[Number(button.dataset.index)].action();
      });
    });
  }

  function toggleStartMenu(force) {
    const shouldShow = typeof force === "boolean" ? force : startMenuEl.classList.contains("helper-hidden");
    startMenuEl.classList.toggle("helper-hidden", !shouldShow);
    startButtonEl.classList.toggle("active", shouldShow);
  }

  function showDialog(title, message) {
    const backdrop = document.createElement("div");
    backdrop.className = "dialog-backdrop";
    backdrop.innerHTML = '<div class="dialog-window visible"><div class="dialog-titlebar"><div class="dialog-title">' + iconMarkup("computer", 16) + "<span>" + escapeHtml(title) + '</span></div><button class="dialog-close-btn" type="button">&times;</button></div><div class="dialog-content"><div class="dialog-icon">&#128172;</div><div class="dialog-message">' + escapeHtml(message) + '</div></div><div class="dialog-buttons"><button class="dialog-btn primary" type="button">OK</button></div></div>';
    dialogHostEl.appendChild(backdrop);
    function close() { backdrop.remove(); }
    backdrop.querySelector(".dialog-close-btn").addEventListener("click", close);
    backdrop.querySelector(".dialog-btn").addEventListener("click", close);
    backdrop.addEventListener("click", function (event) { if (event.target === backdrop) close(); });
  }

  function queueNotifications() {
    let index = 0;
    function showNext() {
      if (index >= NOTIFICATIONS.length) return;
      const notification = NOTIFICATIONS[index];
      index += 1;
      const node = document.createElement("div");
      node.className = "notification-container";
      node.style.right = "16px";
      node.style.top = String(16 + (index - 1) * 12) + "px";
      node.innerHTML = '<div class="notification-header"><div class="notification-header-left"><span class="notification-icon-small">&#128227;</span><span class="notification-header-text">Notification</span></div><button class="notification-close" type="button">&times;</button></div><div class="notification-body"><div class="notification-icon-large">' + notification.icon + '</div><div class="notification-content"><div class="notification-title">' + escapeHtml(notification.title) + '</div><div class="notification-message">' + escapeHtml(notification.message) + '</div></div></div><div class="notification-footer"><span class="notification-time">Just now</span><button class="notification-dismiss" type="button">Dismiss</button></div>';
      notificationHostEl.appendChild(node);
      function dismiss() {
        node.remove();
        setTimeout(showNext, 900);
      }
      node.querySelector(".notification-close").addEventListener("click", dismiss);
      node.querySelector(".notification-dismiss").addEventListener("click", dismiss);
      node.addEventListener("click", dismiss);
      setTimeout(dismiss, 6500);
    }
    setTimeout(showNext, 2500);
  }

  function openDesktopItem(id) {
    if (id === "computer" || id === "pictures" || id === "videos" || id === "music" || id === "chat" || id === "mail" || id === "secret" || id === "recycle") {
      openPrimaryWindow(id);
    }
  }

  function openPrimaryWindow(type) {
    if (type === "computer") return createWindow({ id: "window-computer", type: "computer", title: "My Computer", icon: "computer", width: 860, height: 610, data: { folder: "Documents", selected: "resume" } });
    if (type === "pictures") return createWindow({ id: "window-pictures", type: "pictures", title: "My Pictures", icon: "pictures", width: 780, height: 560, data: { selected: IMAGES[0].name } });
    if (type === "videos") return createWindow({ id: "window-videos", type: "videos", title: "My Videos", icon: "videos", width: 760, height: 520, data: { selected: VIDEOS[0].id } });
    if (type === "music") return createWindow({ id: "window-music", type: "music", title: "My Music", icon: "music", width: 760, height: 520, data: { selected: MUSIC_TRACKS[0].file, status: "Select a track to try playback." } });
    if (type === "chat") return createWindow({ id: "window-chat", type: "chat", title: "MSN Messenger - AI Chat", icon: "chat", width: 620, height: 520, data: {} });
    if (type === "mail") return createWindow({ id: "window-mail", type: "mail", title: "Mail", icon: "mail", width: 560, height: 500, data: { status: "", draft: { name: "", email: "", subject: "", message: "" } } });
    if (type === "secret") return createWindow({ id: "window-secret", type: "secret", title: "Secrets", icon: "secret", width: 760, height: 580, data: { unlocked: false, error: "" } });
    if (type === "recycle") return createWindow({ id: "window-recycle", type: "recycle", title: "Recycle Bin", icon: "recycle", width: 920, height: 620, data: { selected: RECYCLE_ITEMS[0].id } });
  }

  function openDocument(fileId) {
    const file = FILES[fileId];
    if (!file) return;
    createWindow({ id: "document-" + fileId, type: "document", title: file.title, icon: file.icon, width: fileId === "resume" ? 760 : 620, height: fileId === "resume" ? 560 : 500, data: { fileId: fileId } });
  }

  function openPublication(name, url) {
    createWindow({ id: "publication-" + name, type: "pdf", title: name, icon: "pdf", width: 820, height: 620, data: { name: name, url: url } });
  }

  function openImageWindow(name) {
    createWindow({ id: "image-" + name, type: "image", title: name, icon: "image", width: 760, height: 560, data: { imageName: name } });
  }

  function createWindow(config) {
    const existing = state.windows.get(config.id);
    if (existing) {
      existing.minimized = false;
      existing.el.style.display = "";
      focusWindow(existing.id);
      updateTaskbar();
      return existing;
    }
    const bounds = nextWindowBounds(config.width, config.height);
    const win = { id: config.id, type: config.type, title: config.title, icon: config.icon, x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height, minimized: false, maximized: false, lastBounds: null, data: config.data || {}, el: document.createElement("div"), contentEl: null };
    if (isTouchDevice()) win.maximized = true;
    win.el.className = "window";
    win.el.innerHTML = '<div class="window-title-bar"><div class="window-title"><span class="window-icon">' + iconMarkup(win.icon, 16) + "</span><span>" + escapeHtml(win.title) + '</span></div><div class="window-controls"><button class="window-button minimize" type="button" title="Minimize"><span>_</span></button><button class="window-button maximize" type="button" title="Maximize"><span>&#9633;</span></button><button class="window-button close" type="button" title="Close"><span>&times;</span></button></div></div><div class="window-content"></div><div class="window-resize-handle"></div>';
    win.contentEl = win.el.querySelector(".window-content");
    windowLayerEl.appendChild(win.el);
    state.windows.set(win.id, win);
    attachWindowFrame(win);
    updateWindowContent(win);
    focusWindow(win.id);
    updateTaskbar();
    return win;
  }

  function attachWindowFrame(win) {
    const titleBar = win.el.querySelector(".window-title-bar");
    const resizeHandle = win.el.querySelector(".window-resize-handle");
    function applyBounds() {
      win.el.style.left = win.x + "px";
      win.el.style.top = win.y + "px";
      win.el.style.width = win.width + "px";
      win.el.style.height = win.height + "px";
      win.el.style.zIndex = String(state.zIndex);
    }
    win.applyBounds = applyBounds;
    applyBounds();
    win.el.addEventListener("mousedown", function () { focusWindow(win.id); });
    titleBar.addEventListener("mousedown", function (event) {
      if (win.maximized || event.target.closest(".window-button")) return;
      focusWindow(win.id);
      const startX = event.clientX;
      const startY = event.clientY;
      const originX = win.x;
      const originY = win.y;
      function onMove(moveEvent) {
        win.x = Math.max(0, Math.min(getViewportWidth() - 160, originX + moveEvent.clientX - startX));
        win.y = Math.max(0, Math.min(getViewportHeight() - 90, originY + moveEvent.clientY - startY));
        win.applyBounds();
      }
      function onUp() {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      }
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    });
    resizeHandle.addEventListener("mousedown", function (event) {
      if (win.maximized) return;
      event.preventDefault();
      focusWindow(win.id);
      const startX = event.clientX;
      const startY = event.clientY;
      const originWidth = win.width;
      const originHeight = win.height;
      function onMove(moveEvent) {
        win.width = Math.max(320, Math.min(getViewportWidth() - win.x - 4, originWidth + moveEvent.clientX - startX));
        win.height = Math.max(220, Math.min(getViewportHeight() - win.y - getTaskbarHeight() - 4, originHeight + moveEvent.clientY - startY));
        win.applyBounds();
      }
      function onUp() {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      }
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    });
    win.el.querySelector(".minimize").addEventListener("click", function () {
      win.minimized = true;
      win.el.style.display = "none";
      if (state.activeWindowId === win.id) state.activeWindowId = null;
      updateTaskbar();
    });
    win.el.querySelector(".maximize").addEventListener("click", function () { toggleMaximize(win.id); });
    win.el.querySelector(".close").addEventListener("click", function () { closeWindow(win.id); });
  }

  function focusWindow(id) {
    const win = state.windows.get(id);
    if (!win) return;
    state.activeWindowId = id;
    state.zIndex += 1;
    state.windows.forEach(function (entry) {
      entry.el.classList.toggle("active", entry.id === id);
    });
    win.el.style.zIndex = String(state.zIndex);
    updateTaskbar();
  }

  function closeWindow(id) {
    const win = state.windows.get(id);
    if (!win) return;
    win.el.remove();
    state.windows.delete(id);
    if (state.activeWindowId === id) state.activeWindowId = null;
    updateTaskbar();
  }

  function toggleMaximize(id) {
    const win = state.windows.get(id);
    if (!win) return;
    if (!win.maximized) {
      win.lastBounds = { x: win.x, y: win.y, width: win.width, height: win.height };
      win.maximized = true;
      win.x = 0;
      win.y = 0;
      win.width = getViewportWidth() - 4;
      win.height = getViewportHeight() - getTaskbarHeight() - 4;
    } else if (win.lastBounds) {
      win.maximized = false;
      win.x = win.lastBounds.x;
      win.y = win.lastBounds.y;
      win.width = win.lastBounds.width;
      win.height = win.lastBounds.height;
    }
    win.applyBounds();
  }

  function updateTaskbar() {
    taskbarWindowsEl.innerHTML = Array.from(state.windows.values()).map(function (win) {
      return '<button class="taskbar-window' + (state.activeWindowId === win.id && !win.minimized ? " active" : "") + '" type="button" data-id="' + win.id + '"><span class="taskbar-window-icon">' + iconMarkup(win.icon, 16) + '</span><span class="taskbar-window-title">' + escapeHtml(win.title) + "</span></button>";
    }).join("");
    taskbarWindowsEl.querySelectorAll(".taskbar-window").forEach(function (button) {
      button.addEventListener("click", function () {
        const win = state.windows.get(button.dataset.id);
        if (!win) return;
        if (!win.minimized && state.activeWindowId === win.id) {
          win.minimized = true;
          win.el.style.display = "none";
          state.activeWindowId = null;
          return updateTaskbar();
        }
        win.minimized = false;
        win.el.style.display = "";
        focusWindow(win.id);
      });
    });
  }

  const POEM_TEXT = "*íŒŒëž€ ëŒ*\\n\\nì‹­ ë…„ ì „ ê¿ˆì— ë³¸\\níŒŒëž€ ëŒ\\nì•„ì§ ê·¸ ëƒ‡ë¬¼ ì•„ëž˜ ìžˆì„ê¹Œ\\n\\në‚œ ì£½ì–´ ìžˆì—ˆëŠ”ë°\\nì£½ì–´ì„œ ë´„ë‚ ì˜ ëƒ‡ê°€ë¥¼ ê±·ê³  ìžˆì—ˆëŠ”ë°\\nì•„, ì£½ì–´ì„œ ì¢‹ì•˜ëŠ”ë°\\ní™˜í–ˆëŠ”ë° ì†œí„¸ì²˜ëŸ¼\\nê°€ë²¼ì› ëŠ”ë°\\n\\níˆ¬ëª…í•œ ë¬¼ê²° ì•„ëž˜\\ní¬ê³  ë‘¥ê·¼\\nì¡°ì•½ëŒë“¤ ë³´ì•˜ì§€\\ní•´ë§‘ì•„ë¼,\\ní•˜ë‚˜, ë‘˜, ì…‹\\n\\nê±°ê¸° ìžˆì—ˆë„¤\\níŒŒë¥´ìŠ¤ë¦„í•´ ë” ê³ ìš”í•˜ë˜\\nê·¸ ëŒ\\n\\në‚˜ë„ ëª¨ë¥´ê²Œ íŒ” ë»—ì–´ ì¤ê³  ì‹¶ì—ˆì§€\\nê·¸ë•Œ ì•Œì•˜ë„¤\\n\\nì‹­ ë…„ ì „ ê¿ˆì— ë³¸ íŒŒëž€ ëŒ\\n\\nê·¸ë™ì•ˆ ì£¼ìš´ ì  ìžˆì„ê¹Œ\\në†“ì¹œ ì ë„ ìžˆì„ê¹Œ\\nì˜ì˜ ìžƒì€ ì ë„ ìžˆì„ê¹Œ\\nìƒˆë²½ì´ë©´ ì„ ìž  ì†ì— ìŠ¤ë©°ë“¤ë˜ ê²ƒ\\nê·¸ í‘¸ë¥¸ ê·¸ë¦¼ìžì˜€ì„ê¹Œ\\n\\nì‹­ ë…„ ì „ ê¿ˆì— ë³¸\\níŒŒëž€ ëŒ\\n\\nê·¸ ë¹›ë‚˜ëŠ” ë‚´ë¡œ\\nëŒì•„ê°€ ë“¤ì—¬ë‹¤ë³´ë©´\\nì•„ì§ ê±°ê¸°\\nëˆˆë™ìžì²˜ëŸ¼ ê³ ìš”í• ê¹Œ\\n\\nâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€\\n\\ní•œê°•, 'ì„œëžì— ì €ë…ì„ ë„£ì–´ ë‘ì—ˆë‹¤'";

  function getDocumentHtml(fileId) {
    if (fileId === "resume") return '<div class="resume-formatted"><h1 class="resume-name">Spencer ì„ ìš° Hong</h1><p class="resume-subtitle">AI Researcher &amp; Data Scientist</p><p class="resume-link"><span class="link-label">LinkedIn:</span><a href="https://www.linkedin.com/in/hongspencer/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/hongspencer/</a></p><p class="resume-link"><span class="link-label">GitHub:</span><a href="https://github.com/spencer-hong" target="_blank" rel="noopener noreferrer">https://github.com/spencer-hong</a></p><h2 class="resume-section-title">Education</h2><div class="resume-item-title">Doctorate of Philosophy from Northwestern University</div><p class="resume-text">Advised by Luis Amaral (Applied Mathematics) and Thomas Stoeger (Medicine)</p><p class="resume-text">Thesis: Born physical, studied digitally: framework for document artificial intelligence</p><p class="resume-text">Funded by NVIDIA, National Science Foundation, and National Institutes of Health</p><div class="resume-spacer"></div><div class="resume-item-title">Bachelor of Science from Cornell University</div><p class="resume-text">in Chemical and Biomolecular Engineering</p><p class="resume-text">Magna Cum Laude</p><h2 class="resume-section-title">Experience</h2><div class="resume-item-title">Founding Applied Researcher - General Intelligence Company of New York</div><p class="resume-text">Nov 2025 - Current</p><ul><li class="resume-bullet">Creating novel memory architecture to handle long-horizon tasks and complex agentic patterns</li><li class="resume-bullet">Developing AI observability and live monitoring for agents automating business decisions for thousands of customers</li><li class="resume-bullet">Leading the applied AI research team, setting research agenda and shaping the product from the ground up</li></ul><div class="resume-item-title">Principal Data Scientist - Capital One</div><p class="resume-text">May 2025 - Nov 2025</p><ul><li class="resume-bullet">Pioneered novel autonomous evaluation methods for AI agents in production</li><li class="resume-bullet">Developed the first Generative AI solution for reviewing and drafting anti-money laundering reports</li><li class="resume-bullet">Designed and developed the first proof of concept agentic framework for "AI for Data" at Capital One</li></ul><div class="resume-item-title">Senior Deep Learning Engineer - Renota</div><p class="resume-text">Jan 2023 - Jan 2024</p><ul><li class="resume-bullet">Responsible for all deep learning projects at Renota, an educational technology startup</li><li class="resume-bullet">Launched the first flagship product to automate math grading for K-12 school systems</li><li class="resume-bullet">Supervised junior engineers to help develop proprietary large language models to improve optical character recognition for downstream tasks</li><li class="resume-bullet">Migrated training and testing AI workflows to AWS and Azure</li></ul><h2 class="resume-section-title">Skills</h2><p class="resume-text">Python Â· Rust Â· SQL Â· Cypher Â· Git Â· AWS Â· Docker Â· CI/CD</p><p class="resume-text">Neo4J Â· Kubernetes Â· Spark Â· LangChain/Graph/Smith</p><p class="resume-text">PyTorch Â· Agentic Evaluations Â· Science of Science</p><p class="resume-text">Network Science Â· Agentic Memory Â· Korean (native)</p><h2 class="resume-section-title">Selected Publications</h2><div class="resume-publication-title">DF-RAG: Query-Aware Diversity for Retrieval-Augmented Generation</div><p class="resume-text">Saadat Hasan Khan, Spencer Hong, Jingyu Wu, Kevin Lybarger, Youbing Yin, Erin Babinsky, Daben Liu</p><p class="resume-text">Review in ACL</p><div class="resume-publication-title">The entities enabling scientific fraud at scale are large, resilient, and growing rapidly</div><p class="resume-text">Reese A. K. Richardson, Spencer S. Hong, Jennifer A. Byrne, LuÃ­s A. Nunes Amaral</p><p class="resume-text">Accepted in PNAS</p><div class="resume-publication-title">RAFFLES: Reasoning-based Attribution of Faults for LLM Systems</div><p class="resume-text">Chenyang Zhu, Spencer Hong, Jingyu Wu, Kushal Chawla, Charlotte Tang, Youbing Yin, Nathan Wolfe, Erin Babinsky, Daben Liu</p><p class="resume-text">Accepted in NeurIPS</p><div class="resume-publication-title">A digital archive reveals how a funding agency cooperated with academics to support a nascent field of science</div><p class="resume-text">Spencer S. Hong, Zachary Utz, Mohammad Hosseini, Cleber Zanchettin, Heliodoro Tejedor Navarro, Kristi Holmes, Kris A. Wetterstrand, Sarah A. Bates, Luis A. Nunes Amaral, Christopher R. Donohue, Thomas Stoeger</p><p class="resume-text">Accepted in Nature Communications</p><div class="resume-publication-title">Evaluating Between-Chunk Coherence in RAG Systems</div><p class="resume-text">Tong Qi, Spencer Hong, Jingyu Wu, Youbing Yin, Erin Babinsky, Daben Liu</p><p class="resume-text">Review in ACL</p></div>';
    if (fileId === "about") return '<div class="about-formatted"><p class="about-text">Hi, I\'m an AI researcher and data scientist passionate about evaluating autonomous agents, helping them execute complex tasks reliably over long time horizons. I\'m particularly interested in the dynamics that emerge when agents collaborate, coordinate, and manage one another.</p><div class="about-divider"></div><p class="about-text">During my PhD, I was the first researcher to analyze millions of internal documents from a major funding agency using multimodal AI. I examined why certain scientific proposals succeed, why others fail, and reconstructed networks from the Human Genome Project. I also became the first PhD student ever to present findings to the National Advisory Council for Genome Research.</p><div class="about-link"><a href="https://www.youtube.com/watch?v=nlK0JQFmyiQ&t=23652s" target="_blank" rel="noopener noreferrer">Watch the National Advisory Council talk</a></div><p class="about-text">This research catalyzed the founding of the $5M Born Digital, Studied Digitally Consortium.</p><div class="about-link"><a href="https://studieddigitally.org" target="_blank" rel="noopener noreferrer">https://studieddigitally.org</a></div><div class="about-divider"></div><p class="about-text">At Capital One, I pioneered a novel evaluation methodology for multi-component agentic systems and designed the first proof-of-concept for an AI agent integrated across all data stack layers to recommend new data transformations.</p><p class="about-text">Today, I lead research at the General Intelligence Company of New York, where I evaluate Cofounder, develop novel memory architectures, and work toward autonomous agents managing entire businesses.</p><div class="about-link"><a href="https://www.generalintelligencecompany.com" target="_blank" rel="noopener noreferrer">General Intelligence Company of New York</a></div><div class="about-link"><a href="https://cofounder.co" target="_blank" rel="noopener noreferrer">Cofounder</a></div><div class="about-divider"></div><p class="about-text">I\'d love to connect. Reach out through the contact form or find me on LinkedIn.</p></div>';
    if (fileId === "skills") return '<div class="skills-formatted"><div class="skills-section-title">Programming Languages</div><div class="skill-item">Python                     Expert</div><div class="skill-item">Rust                       Intermediate</div><div class="skill-item">SQL                        Advanced</div><div class="skill-item">Cypher                     Intermediate</div><div class="skills-section-title">Frameworks &amp; Tools</div><div class="skill-item">PyTorch                    Advanced</div><div class="skill-item">LangChain/Graph/Smith      Expert</div><div class="skill-item">Docker                     Advanced</div><div class="skill-item">AWS                        Intermediate</div><div class="skill-item">Git                        Expert</div><div class="skill-item">Neo4J                      Intermediate</div><div class="skill-item">Kubernetes                 Intermediate</div><div class="skill-item">Apache Spark               Intermediate</div><div class="skills-section-title">Specializations</div><div class="skill-item">Agentic AI Systems</div><div class="skill-item">Retrieval-Augmented Generation (RAG)</div><div class="skill-item">AI Evaluation &amp; Observability</div><div class="skill-item">Network Science</div><div class="skill-item">Science of Science</div><div class="skills-section-title">Spoken Languages</div><div class="skill-item">English (fluent)</div><div class="skill-item">Korean (native)</div></div>';
    if (fileId === "writing1") return '<div class="about-formatted"><h2 class="resume-section-title">On Agentic Memory</h2><p class="writing-date">DATE: January 15, 2025</p><p class="about-text">Memory was never an external extension of intelligence. It has always been core to it.</p><p class="about-text">People often mistake memory as something bolted onto intelligent systems: an external database, a vector store, a retrieval mechanism appended to the "real" intelligence. This is how we\'ve approached RAG, how we think about knowledge bases, how we design our systems today.</p><p class="about-text">But this framing is fundamentally wrong.</p><p class="about-text">From the very first machine intelligence system, the Logic Theorist in 1956, memory was intrinsic. The Logic Theorist didn\'t just process logical statements; it remembered which proof strategies worked, which failed, and used that memory to guide future reasoning. Memory wasn\'t a feature. It was the foundation.</p><p class="about-text">The mistake of treating memory as external storage has led us to build systems that accumulate without learning. We append new experiences to a growing queue: new documents to a vector database, new messages to a context window, new facts to a knowledge graph.</p><p class="about-text">But real intelligence doesn\'t work this way.</p><p class="about-text">Real intelligence reconciles. When you learn something new that contradicts what you believed, you don\'t just add it to a list. You revise your understanding. You reinterpret old memories in light of new experiences. You connect seemingly unrelated events. You build a coherent model of the world that updates when reality teaches you otherwise.</p><p class="about-text">The next era of agentic systems will not be about better retrieval. It will be about reconciliation.</p><p class="about-text">How does a new reward signal from the environment change what the agent remembers? How does a surprising observation reshape its understanding of past experiences? How does contradiction lead to learning rather than just conflicting entries in a database?</p><p class="about-text">This is memory as it should be: not a passive store, but an active process of synthesis, revision, and growth. Memory as the mechanism through which agents truly learn, not just accumulate, but understand.</p><p class="about-text">We\'re building systems that can do this. Not agents that remember everything, but agents that reconcile what was once old with what is newly experienced. Agents that learn, in the deepest sense of the word.</p></div>';
    return '<pre class="text-content wrap">' + escapeHtml(POEM_TEXT) + "</pre>";
  }

  function renderComputerWindow(win) {
    const currentFolder = win.data.folder || "Documents";
    const items = COMPUTER_FOLDERS[currentFolder] || [];
    const selectedItem = items.filter(function (item) { return item.id === win.data.selected; })[0] || items[0] || null;
    return '<div class="explorer-shell"><div class="explorer-toolbar"><strong>Address</strong><span>My Computer\\' + escapeHtml(currentFolder) + '</span></div><div class="explorer-main"><div class="folder-panel"><div class="panel-header">Folders</div><div class="panel-content"><div class="folder-tree">' + Object.keys(COMPUTER_FOLDERS).map(function (folder) { return '<div class="tree-item" data-folder="' + folder + '"><span class="tree-icon">' + iconMarkup(folder === currentFolder ? "folder-open" : "folder", 20) + '</span><span class="tree-label">' + escapeHtml(folder) + "</span></div>"; }).join("") + '</div></div></div><div class="explorer-list"><div class="file-grid">' + items.map(function (item) { return '<div class="file-card' + (selectedItem && selectedItem.id === item.id ? " selected" : "") + '" data-item="' + item.id + '">' + iconMarkup(item.icon, 32) + "<span>" + escapeHtml(item.name) + "</span></div>"; }).join("") + '</div></div><div class="explorer-preview"><div class="panel-header">Preview</div><div class="preview-section">' + (selectedItem ? "<h3>" + escapeHtml(selectedItem.name) + "</h3><p>" + escapeHtml(selectedItem.description || "") + "</p><p class=\"preview-muted\">Location: My Computer\\" + escapeHtml(currentFolder) + "</p>" : '<p class="preview-muted">Select a file or folder to preview it.</p>') + "</div></div></div><div class=\"image-status\"><strong>Tip:</strong> " + escapeHtml(isTouchDevice() ? "Tap a file to open it." : "Double-click a file to open it.") + "</div></div>";
  }

  function renderPicturesWindow(win) {
    const image = IMAGES.filter(function (entry) { return entry.name === win.data.selected; })[0] || IMAGES[0];
    return '<div class="image-viewer"><div class="image-viewer-toolbar"><div class="toolbar-section"><span class="toolbar-label">Folder:</span><select class="win95-select"><option>My Pictures</option></select></div><div class="toolbar-section"><span class="toolbar-label">View:</span><select class="win95-select"><option>Preview</option></select></div></div><div class="image-viewer-content"><div class="folder-panel"><div class="panel-header">Pictures</div><div class="panel-content">' + IMAGES.map(function (entry) { return '<div class="image-file-tile' + (entry.name === image.name ? " selected" : "") + '" data-image="' + entry.name + '"><span class="tree-icon">' + iconMarkup("image", 20) + '</span><span>' + escapeHtml(entry.name) + "</span></div>"; }).join("") + '</div></div><div class="preview-panel"><div class="preview-header"><span class="preview-label">Selected:</span><input class="preview-path" readonly value="' + escapeHtml(image.name) + '" /></div><div class="preview-content"><div class="preview-image-container"><img class="preview-image" src="' + image.src + '" alt="' + escapeHtml(image.caption) + '" /></div></div><div class="preview-info">' + escapeHtml(image.caption) + '</div></div></div><div class="image-status"><strong>Tip:</strong> ' + escapeHtml(isTouchDevice() ? "Tap a picture to open it." : "Double-click any file to open it in its own window.") + '</div></div>';
  }

  function renderImageWindow(win) {
    const image = IMAGES.filter(function (entry) { return entry.name === win.data.imageName; })[0];
    if (!image) return '<div class="pdf-empty">Image not found.</div>';
    return '<div class="full-image-viewer"><div class="image-status"><strong>File:</strong> ' + escapeHtml(image.name) + '</div><div class="full-image-stage"><img src="' + image.src + '" alt="' + escapeHtml(image.caption) + '" /></div></div>';
  }

  function renderVideosWindow(win) {
    const selected = VIDEOS.filter(function (video) { return video.id === win.data.selected; })[0] || VIDEOS[0];
    return '<div class="youtube-viewer"><div class="video-list"><div class="video-list-header">Guitar Covers</div>' + VIDEOS.map(function (video) { return '<div class="video-item' + (video.id === selected.id ? " selected" : "") + '" data-video="' + video.id + '"><div class="video-icon">' + iconMarkup("videos", 20) + '</div><div class="video-info"><div class="video-title">' + escapeHtml(video.title) + '</div><div class="video-description">' + escapeHtml(video.description) + "</div></div></div>"; }).join("") + '</div><div class="video-player"><iframe src="https://www.youtube.com/embed/' + selected.id + '" title="' + escapeHtml(selected.title) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><div class="video-details"><h3>' + escapeHtml(selected.title) + "</h3><p>" + escapeHtml(selected.description) + "</p></div></div></div>";
  }

  function renderMusicWindow(win) {
    const selected = MUSIC_TRACKS.filter(function (track) { return track.file === win.data.selected; })[0] || MUSIC_TRACKS[0];
    return '<div class="music-window"><div class="music-toolbar"><strong>Winamp Playlist</strong><span>Original track list extracted from the site bundle.</span></div><div class="music-main"><div class="music-playlist">' + MUSIC_TRACKS.map(function (track) { return '<div class="music-track' + (track.file === selected.file ? " selected" : "") + '" data-track="' + track.file + '"><span>' + iconMarkup("music", 20) + '</span><div><div class="music-track-title">' + escapeHtml(track.title) + '</div><div class="music-track-artist">' + escapeHtml(track.artist) + "</div></div></div>"; }).join("") + '</div><div class="music-player"><div class="music-player-inner"><h3>' + escapeHtml(selected.title) + '</h3><p>' + escapeHtml(selected.artist) + '</p><audio controls preload="none"><source src="./music/' + encodeURIComponent(selected.file).replace(/%2F/g, "/") + '" /></audio><div class="music-note">Track path: <code>./music/' + escapeHtml(selected.file) + '</code><br />The original mirrored site referenced local <code>/music</code> files and a Winamp skin, but those assets were not bundled with the live page shell.</div></div></div></div><div class="music-status"><strong>Status:</strong> ' + escapeHtml(win.data.status || "Ready") + "</div></div>";
  }

  function renderChatWindow() {
    return '<div class="msn-chat"><div class="msn-toolbar"><div class="msn-toolbar-section"></div></div><div class="msn-chat-container"><div class="msn-loading" data-chat-loading><div class="loading-spinner"></div><p>Connecting to AI chat...</p></div><iframe src="https://cofounder.co" class="msn-iframe" title="AI Chat" allow="microphone; camera" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"></iframe></div><div class="msn-input-area"><div class="msn-input-info"><span class="msn-status-icon">ðŸŸ¢</span><span class="msn-status-text">Connected to AI Agent</span></div><div class="msn-input-hint">ðŸ’¬ Chat with the AI agent in the window above</div></div><div class="msn-statusbar"><span>AI Chat Powered by cofounder.co</span><span class="msn-connection-status">â— Online</span></div></div>';
  }

  function renderMailWindow(win) {
    const draft = win.data.draft || { name: "", email: "", subject: "", message: "" };
    return '<div class="mail-content"><div class="file-edit-container-mail"><p>File</p><p>Edit</p><p>Format</p><p>Help</p></div><div class="mail-form-wrapper"><form class="form-container" data-mail-form><div class="to-container"><div class="to-icon"><p>To:</p></div><div class="myemail-container"><input type="text" value="' + escapeHtml(EMAIL_CONFIG.toEmail) + '" readonly /></div></div><div class="to-container"><div class="to-icon"><p>From:</p></div><div class="myemail-container"><input name="name" type="text" placeholder="Your name" value="' + escapeHtml(draft.name || "") + '" required /></div></div><div class="to-container"><div class="to-icon"><p>Email:</p></div><div class="myemail-container"><input name="email" type="email" placeholder="you@example.com" value="' + escapeHtml(draft.email || "") + '" required /></div></div><div class="to-container"><div class="to-icon"><p>Subject:</p></div><div class="myemail-container"><input name="subject" type="text" placeholder="Quick hello" value="' + escapeHtml(draft.subject || "") + '" required /></div></div><textarea class="mail-textarea" name="message" placeholder="Write your message..." required>' + escapeHtml(draft.message || "") + '</textarea><div class="mail-actions"><button class="mail-action-btn" type="submit">Open Email App</button><button class="mail-action-btn" type="button" data-mail-copy>Copy Email</button></div></form><div class="mail-status">' + escapeHtml(win.data.status || "This opens your email app with the message prefilled, which is more reliable on static hosting and mobile.") + "</div></div></div>";
  }

  function readMailDraft(form) {
    return {
      name: String(form.querySelector('[name=\"name\"]').value || ""),
      email: String(form.querySelector('[name=\"email\"]').value || ""),
      subject: String(form.querySelector('[name=\"subject\"]').value || ""),
      message: String(form.querySelector('[name=\"message\"]').value || ""),
    };
  }

  function buildMailtoLink(draft) {
    const subject = encodeURIComponent(draft.subject || "");
    const body = encodeURIComponent("From: " + (draft.name || "") + "\nEmail: " + (draft.email || "") + "\n\n" + (draft.message || ""));
    return "mailto:" + EMAIL_CONFIG.toEmail + "?subject=" + subject + "&body=" + body;
  }

  function renderSecretWindow(win) {
    if (win.data.unlocked) return '<div class="secret-content"><div class="secret-header"><h1 class="secret-title">For my å°è±†</h1><p class="secret-date">October 26, 2025</p></div><div class="secret-divider"></div><div class="secret-message"><p class="secret-text">My small bean! You\'re here at Chez Spencer so I created this special place just for you.</p><p class="secret-text">Every day with you is an adventure, and I\'m so grateful to have you in my life.</p><p class="secret-text"><strong>I like you a lot</strong> â™¡</p></div><div class="secret-divider"></div><div class="secret-gallery"><h3 class="secret-gallery-title">Our Memories</h3><div class="helper-placeholder-grid">' + IMAGES.map(function (image) { return '<div class="secret-photo"><img src="' + image.src + '" alt="' + escapeHtml(image.caption) + '" /><p class="secret-photo-caption"><strong>' + escapeHtml(image.caption) + '</strong>' + escapeHtml(image.name) + "</p></div>"; }).join("") + '</div></div><div class="secret-divider"></div><div class="secret-footer"><p class="secret-signature">Love always,<br />Wheezy â™¡</p></div></div>';
    return '<div class="secret-lock-screen"><div class="secret-lock-content"><div class="secret-lock-icon">ðŸ”’</div><h2 class="secret-lock-title">Enter Password</h2><p class="secret-lock-hint">Hint: the original client-side password still works here.</p><form data-secret-form><input class="secret-password-input" name="password" type="password" placeholder="Password..." autofocus />' + (win.data.error ? '<p class="secret-error">' + escapeHtml(win.data.error) + '</p>' : "") + '<button class="secret-submit-btn" type="submit">Unlock</button></form></div></div>';
  }

  function renderRecycleWindow(win) {
    const selected = RECYCLE_ITEMS.filter(function (item) { return item.id === win.data.selected; })[0] || null;
    return '<div class="recycle-bin"><div class="recycle-bin-toolbar"><button class="toolbar-btn" type="button" disabled>Restore</button><button class="toolbar-btn" type="button" disabled>Delete</button><div class="toolbar-separator"></div><button class="toolbar-btn" type="button" disabled>Empty Recycle Bin</button></div><div class="recycle-bin-content"><div class="deleted-files-list"><div class="recycle-bin-header"><div class="header-icon">ðŸ—‘ï¸</div><div class="header-text"><h2>Recycle Bin</h2><p>' + RECYCLE_ITEMS.length + ' deleted items</p></div></div><div class="files-grid">' + RECYCLE_ITEMS.map(function (item) { return '<div class="deleted-file-item' + (selected && selected.id === item.id ? " selected" : "") + '" data-recycle-item="' + item.id + '"><div class="file-icon">' + iconMarkup(item.icon, 20) + '</div><div class="file-info"><div class="file-name">' + escapeHtml(item.name) + '</div><div class="file-date">' + escapeHtml(item.dateDeleted) + "</div></div></div>"; }).join("") + '</div></div><div class="file-preview">' + (selected ? '<div class="preview-content"><div class="preview-header"><div class="preview-icon">' + iconMarkup(selected.icon, 16) + '</div><div class="preview-title">' + escapeHtml(selected.name) + '</div></div><div class="preview-body"><pre class="preview-text">' + escapeHtml(selected.content) + '</pre></div><div class="preview-footer"><button class="preview-btn" type="button">Close</button><span class="preview-meta">Deleted ' + escapeHtml(selected.dateDeleted) + "</span></div></div>" : '<div class="preview-empty"><div class="empty-icon">ðŸ—‘ï¸</div><p>Select a file to preview it.</p><p class="empty-hint">Deleted thoughts live here.</p></div>') + '</div></div><div class="recycle-bin-statusbar"><span>' + RECYCLE_ITEMS.length + ' object(s)</span><span>All items are for reading only</span></div></div>';
  }

  function renderPdfWindow(win) {
    return '<div class="pdf-viewer"><div class="pdf-toolbar"><div class="pdf-toolbar-section"><a class="pdf-toolbar-btn" href="' + win.data.url + '" target="_blank" rel="noopener noreferrer">ðŸ”— Open in New Tab</a><a class="pdf-toolbar-btn" href="' + win.data.url + '" download="' + escapeHtml(win.data.name) + '">ðŸ’¾ Download</a></div></div><div class="pdf-container"><iframe class="pdf-iframe" src="' + win.data.url + '" title="' + escapeHtml(win.data.name) + '"></iframe></div><div class="pdf-empty">If the document does not load inside the frame, use <a href="' + win.data.url + '" target="_blank" rel="noopener noreferrer">Open in New Tab</a>.</div></div>';
  }

  function renderDocumentWindow(win) {
    return '<div class="text-file-viewer"><div class="notepad-menubar"><div class="notepad-menu-item"><span class="menu-label">File</span></div><div class="notepad-menu-item"><span class="menu-label">Edit</span></div><div class="notepad-menu-item"><span class="menu-label">Format</span></div><div class="notepad-menu-item"><span class="menu-label">Help</span></div></div><div class="notepad-content">' + getDocumentHtml(win.data.fileId) + "</div></div>";
  }

  function updateWindowContent(win) {
    let html = '<div class="pdf-empty">Unknown window type.</div>';
    if (win.type === "computer") html = renderComputerWindow(win);
    else if (win.type === "pictures") html = renderPicturesWindow(win);
    else if (win.type === "image") html = renderImageWindow(win);
    else if (win.type === "videos") html = renderVideosWindow(win);
    else if (win.type === "music") html = renderMusicWindow(win);
    else if (win.type === "chat") html = renderChatWindow();
    else if (win.type === "mail") html = renderMailWindow(win);
    else if (win.type === "secret") html = renderSecretWindow(win);
    else if (win.type === "recycle") html = renderRecycleWindow(win);
    else if (win.type === "pdf") html = renderPdfWindow(win);
    else if (win.type === "document") html = renderDocumentWindow(win);
    win.contentEl.innerHTML = html;
    attachWindowInteractions(win);
  }

  function attachWindowInteractions(win) {
    if (win.type === "computer") {
      win.contentEl.querySelectorAll("[data-folder]").forEach(function (node) { node.addEventListener("click", function () { win.data.folder = node.dataset.folder; win.data.selected = (COMPUTER_FOLDERS[win.data.folder][0] || {}).id || null; updateWindowContent(win); }); });
      win.contentEl.querySelectorAll("[data-item]").forEach(function (node) {
        node.addEventListener("click", function () {
          const itemId = node.dataset.item;
          const item = (COMPUTER_FOLDERS[win.data.folder] || []).filter(function (entry) { return entry.id === itemId; })[0];
          if (!item) return;
          if (isTouchDevice()) {
            win.data.selected = itemId;
            if (item.type === "document") openDocument(item.id);
            else if (item.type === "pdf") openPublication(item.name, item.url);
            return;
          }
          if (isRapidRepeat(win.lastItemTap, itemId)) {
            win.lastItemTap = null;
            if (item.type === "document") openDocument(item.id);
            else if (item.type === "pdf") openPublication(item.name, item.url);
            return;
          }
          win.lastItemTap = { key: itemId, time: Date.now() };
          win.data.selected = itemId;
          updateWindowContent(win);
        });
      });
    } else if (win.type === "pictures") {
      win.contentEl.querySelectorAll("[data-image]").forEach(function (node) {
        node.addEventListener("click", function () {
          const imageName = node.dataset.image;
          if (isTouchDevice()) {
            win.data.selected = imageName;
            openImageWindow(imageName);
            return;
          }
          if (isRapidRepeat(win.lastImageTap, imageName)) {
            win.lastImageTap = null;
            openImageWindow(imageName);
            return;
          }
          win.lastImageTap = { key: imageName, time: Date.now() };
          win.data.selected = imageName;
          updateWindowContent(win);
        });
      });
    } else if (win.type === "videos") {
      win.contentEl.querySelectorAll("[data-video]").forEach(function (node) { node.addEventListener("click", function () { win.data.selected = node.dataset.video; updateWindowContent(win); }); });
    } else if (win.type === "music") {
      win.contentEl.querySelectorAll("[data-track]").forEach(function (node) { node.addEventListener("click", function () { win.data.selected = node.dataset.track; win.data.status = "Trying local playback from ./music/"; updateWindowContent(win); }); });
    } else if (win.type === "chat") {
      const iframe = win.contentEl.querySelector("iframe");
      const loading = win.contentEl.querySelector("[data-chat-loading]");
      if (iframe && loading) iframe.addEventListener("load", function () { loading.remove(); });
    } else if (win.type === "mail") {
      const form = win.contentEl.querySelector("[data-mail-form]");
      if (form) {
        form.querySelectorAll("input[name], textarea[name]").forEach(function (field) {
          field.addEventListener("input", function () {
            win.data.draft = readMailDraft(form);
          });
        });
        form.addEventListener("submit", function (event) {
          event.preventDefault();
          if (!form.reportValidity()) return;
          win.data.draft = readMailDraft(form);
          win.data.status = "Opening your email app with a prefilled message...";
          updateWindowContent(win);
          window.location.href = buildMailtoLink(win.data.draft);
        });
      }
      const copyButton = win.contentEl.querySelector("[data-mail-copy]");
      if (copyButton) copyButton.addEventListener("click", async function () {
        try {
          await navigator.clipboard.writeText(EMAIL_CONFIG.toEmail);
          if (form) win.data.draft = readMailDraft(form);
          win.data.status = "Email address copied to clipboard.";
        } catch (error) {
          win.data.status = "Copy failed. Use " + EMAIL_CONFIG.toEmail + " manually.";
        }
        updateWindowContent(win);
      });
    } else if (win.type === "secret") {
      const form = win.contentEl.querySelector("[data-secret-form]");
      if (form) form.addEventListener("submit", function (event) { event.preventDefault(); const password = new FormData(form).get("password"); if (String(password).toLowerCase() === "princess") { win.data.unlocked = true; win.data.error = ""; } else { win.data.error = "Incorrect password. Try again!"; } updateWindowContent(win); });
    } else if (win.type === "recycle") {
      win.contentEl.querySelectorAll("[data-recycle-item]").forEach(function (node) { node.addEventListener("click", function () { win.data.selected = node.dataset.recycleItem; updateWindowContent(win); }); });
      const closeButton = win.contentEl.querySelector(".preview-btn");
      if (closeButton) closeButton.addEventListener("click", function () { win.data.selected = null; updateWindowContent(win); });
    }
  }

  function initialize() {
    const mobileMode = isTouchDevice();
    injectStyles();
    renderDesktopIcons();
    renderStartMenu();
    renderHelper();
    if (mobileMode) {
      helperPanelEl.classList.add("helper-hidden");
      helperShowEl.classList.add("helper-hidden");
    }
    setClock();
    setInterval(setClock, 1000);
    if (!mobileMode) queueNotifications();
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".desktop-icon")) { state.selectedDesktop = null; renderDesktopIcons(); }
      if (!event.target.closest("#start-button") && !event.target.closest("#start-menu")) toggleStartMenu(false);
    });
    startButtonEl.addEventListener("click", function (event) { event.stopPropagation(); toggleStartMenu(); });
    if (!mobileMode) {
      helperPanelEl.addEventListener("click", function (event) {
        if (event.target.id === "helper-close" || event.target.id === "helper-hide") {
          helperPanelEl.classList.add("helper-hidden");
          helperShowEl.classList.remove("helper-hidden");
        }
      });
      helperShowEl.addEventListener("click", function () {
        helperPanelEl.classList.remove("helper-hidden");
        helperShowEl.classList.add("helper-hidden");
      });
    }
    function syncWindowLayout() {
      state.windows.forEach(function (win) {
        if (win.maximized || isTouchDevice()) {
          win.x = 0;
          win.y = 0;
          win.width = getViewportWidth() - 4;
          win.height = getViewportHeight() - getTaskbarHeight() - 4;
          if (isTouchDevice()) win.maximized = true;
        } else {
          win.x = Math.min(win.x, Math.max(0, getViewportWidth() - win.width - 10));
          win.y = Math.min(win.y, Math.max(0, getViewportHeight() - win.height - getTaskbarHeight() - 10));
        }
        win.applyBounds();
      });
    }
    window.addEventListener("resize", syncWindowLayout);
    if (window.visualViewport) window.visualViewport.addEventListener("resize", syncWindowLayout);
    document.addEventListener("dblclick", function (event) {
      if (isTouchDevice()) event.preventDefault();
    });
  }

  initialize();
})();
