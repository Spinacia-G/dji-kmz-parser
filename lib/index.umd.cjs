(function(t,n){typeof exports=="object"&&typeof module<"u"?n(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],n):(t=typeof globalThis<"u"?globalThis:t||self,n(t["sdk-name"]={},t.Vue))})(this,function(t,n){"use strict";const l=(e,o)=>isNaN(Number(e))||isNaN(Number(o))?(console.log("invalid input"),0):(console.log(e,o,e+o),e+o),i=(e=>(e.install=o=>{const s=e.name;o.component(s,e)},e))(n.defineComponent({name:"ExampleComp",__name:"ExampleComp",props:{propName:{default:0}},setup(e){const o=e,s=n.ref("Res: ");return(r,m)=>(n.openBlock(),n.createElementBlock("button",null,n.toDisplayString(s.value)+n.toDisplayString(o.propName),1))}})),u={install:e=>{e.use(i)}};t.ExampleComp=i,t.default=u,t.testSum=l,Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
