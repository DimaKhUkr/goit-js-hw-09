!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},n.parcelRequired7c6=i);var r=i("6JpON");function u(n,t){(function(e,n){return new Promise((function(t,o){var i=Math.random()>.3;setTimeout((function(){i?t({position:e,delay:n}):o({position:e,delay:n})}),n)}))})(n,t).then((function(n){!function(n,t){e(r).Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"))}(n.position,n.delay)})).catch((function(n){!function(n,t){e(r).Notify.failure("❌ Rejected promise ".concat(n," in ").concat(t,"ms"))}(n.position,n.delay)}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();for(var n=e.currentTarget.elements,t=n.amount,o=n.step,i=n.delay,r=0;r<t.value;r++){var a=r*Number(o.value)+Number(i.value);u(r,a)}}))}();
//# sourceMappingURL=03-promises.78e91bcc.js.map
