var Lab=function(){function t(t,n){var a=this;this.variants=[],this.report=function(t){a.collectionUrl?fetch("".concat(a.collectionUrl,"?test=").concat(a.name,"&variant=").concat(a.chosenVariant.variantIndex,"&property=").concat(t)):window.plausible(a.name,{props:{variant:a.chosenVariant.variantIndex,property:t}})},this.name=t,n?this.collectionUrl=n:window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}}return t.prototype.addVariant=function(t){this.variants.push({html:null==t?void 0:t.html,container:null==t?void 0:t.container,css:null==t?void 0:t.css,javascript:null==t?void 0:t.javascript,variantIndex:["A","B","C"][this.variants.length]})},t.prototype.start=function(){var t=Math.floor(Math.random()*this.variants.length);if(this.chosenVariant=this.variants[t],this.report("view"),this.chosenVariant.html){var n=document.querySelector(this.chosenVariant.container||"body");null==n||n.insertAdjacentHTML("afterbegin",this.chosenVariant.html)}if(this.chosenVariant.css){var a=document.createElement("style");a.innerText=this.chosenVariant.css,document.head.appendChild(a)}this.chosenVariant.javascript&&this.chosenVariant.javascript(this.report)},t}();