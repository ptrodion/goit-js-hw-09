!function(){var t={startEl:document.querySelector("[data-start]"),stopEl:document.querySelector("[data-stop]")};t.stopEl.disabled=!0;var a=null;function e(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.startEl.addEventListener("click",(function(){t.startEl.disabled=!0,t.stopEl.disabled=!1,a=setInterval(e,1e3)})),t.stopEl.addEventListener("click",(function(){clearInterval(a),t.stopEl.disabled=!0,t.startEl.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.39f95703.js.map