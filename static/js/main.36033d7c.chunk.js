(this["webpackJsonpwarframe-dashboard"]=this["webpackJsonpwarframe-dashboard"]||[]).push([[0],{21:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var r=n(10),i=n(18),a=n(8),s=n(4),o=n(5),c=n(9),l=n(7),u=n(6),d=n(0),p=(n(21),["All","Arcanes","Archwing","Arch-Gun","Arch-Melee","Enemy","Fish","Gear","Glyphs","Melee","Misc","Mods","Pets","Primary","Quests","Relics","Resources","Secondary","Sentinels","Skins","Warframes"]),j="https://cdn.warframestat.us/img/",h=n(2),b=n(3);function m(){var e=Object(h.a)(["\n    background: #070713;\n    border-radius: 5px;\n    border: 1px solid #B5924E;\n    border-bottom: 10px solid #F1E9B3;\n    box-shadow: inset 0 0 100px rgba(199,178,110,0.3);\n    color: #F8F5CB;\n    position: relative;\n    text-align: center;\n    overflow:hidden;\n    max-width: 256px;\n    margin: 10px;\n\n    h1 {\n        padding: 0 0.5em;\n    }\n"]);return m=function(){return e},e}var f=b.a.li(m());function O(){var e=Object(h.a)(["\nborder: 1px solid #7F7A82;\nborder-left:4px solid;\nborder-radius:4px;\nbackground: #28282A;\nmargin: 0 0 1em;\npadding: 1em;\n\nh2 {\n    margin: 0;\n}\n"]);return O=function(){return e},e}var x=b.a.div(O());function y(){var e=Object(h.a)(["\n    background: rgba(77, 75, 84, 0.3);\n    border: 2px solid #28282A;\n    max-width: 100%;\n"]);return y=function(){return e},e}var v=b.a.img(y()),g=n(1),F=n.n(g),k=function(e){return e.abilities.map((function(e){return Object(d.jsx)(C,Object(a.a)({},e),e.name)}))},C=function(e){return Object(d.jsxs)(x,{children:[Object(d.jsx)("h2",{children:e.name}),Object(d.jsx)("p",{children:e.description})]},e.name)},w=function(e){return Object(d.jsxs)(f,{children:[Object(d.jsx)("h1",{children:e.name}),Object(d.jsx)("p",{children:e.description}),Object(d.jsx)(v,{alt:"",src:j+e.imageName}),Object(d.jsx)("h3",{children:"Abilities"}),Object(d.jsx)(k,{abilities:e.abilities})]})};function A(){var e=Object(h.a)(["\n    \n"]);return A=function(){return e},e}function S(){var e=Object(h.a)(["\n    @media (min-width: 1024px) {\n        flex-wrap: nowrap;\n    }\n"]);return S=function(){return e},e}var B=b.a.main(S()),I=b.a.aside(A()),P=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return"Arcane"===this.props.name?null:Object(d.jsxs)(f,{className:"clearfix",children:[Object(d.jsxs)(B,{children:[Object(d.jsx)("h1",{children:this.props.name}),Object(d.jsx)("p",{children:this.props.description}),Object(d.jsx)(v,{alt:"",src:j+this.props.imageName})]}),Object(d.jsxs)(I,{children:[Object(d.jsx)("h3",{children:"Ranks"}),Object(d.jsx)(E,{levelStats:this.props.levelStats})]})]})}}]),n}(F.a.Component),E=function(e){var t=e.levelStats;if(void 0===t)return null;var n=(t=Object.entries(e.levelStats)).map((function(e,t){return Object(d.jsx)(M,Object(a.a)({},e),t)}));return Object(d.jsx)(x,{children:n},e.name)},M=function(e){var t=e[0],n=e[1].stats[0];return Object(d.jsxs)("p",{children:[Object(d.jsxs)("strong",{children:["Rank ",t,": "]}),n]})},N=P,R=(n(1),function(e){return Object(d.jsxs)(f,{children:[Object(d.jsx)("h1",{children:e.name}),Object(d.jsx)(v,{alt:"",src:j+e.imageName}),Object(d.jsx)("p",{children:e.description})]})}),T=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(d.jsxs)(f,{children:[Object(d.jsx)("h1",{children:this.props.name}),Object(d.jsx)(v,{alt:"",src:j+this.props.imageName}),Object(d.jsx)("p",{children:this.props.description})]})}}]),n}(F.a.Component);function L(){var e=Object(h.a)(["\n    display: flex;\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n"]);return L=function(){return e},e}var q=b.a.ul(L()),D=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props.itemSingleComponent;return Object(d.jsx)(q,{children:this.props.items.map((function(t){return Object(d.jsx)(e,Object(a.a)({},t),t.name)}))})}}]),n}(F.a.Component);function G(){var e=Object(h.a)(["\n    display: flex;\n    gap: 0.5em;\n    justify-content: center;\n    list-style-type: none;\n    margin: 0 0 1em;\n\n    li {\n        border: 1px solid #5194B6;\n        background-color: #C2F2FF;\n        border-radius: 50%;\n        width: 8px;\n        height: 8px;\n    }\n"]);return G=function(){return e},e}function J(){var e=Object(h.a)(["\n    flex-basis: 256px;\n    justify-content: space-evenly;\n\n    figure {\n        width: 100%;\n        height: 256px;\n    }\n\n    &.common {\n        border-color: #9E7A5A #9E7A5A #DBB592\n    }\n\n    &.uncommon {\n        border-color: #BABABE #BABABE #FAFAFC\n    }\n\n    &.rare {\n        border-color: #B5924E #B5924E #F1E9B3\n    }\n"]);return J=function(){return e},e}var z=Object(b.a)(f)(J()),Q=b.a.ul(G()),W=(n(1),function(e){var t=j+e.imageName,n={color:"red",backgroundImage:'url("'.concat(t,'")'),backgroundRepeat:"no-repeat",backgroundPosition:"top center"},r=function(e){var t=Array.apply(null,Array(e.fusionLimit));return t=t.map((function(e,t){return Object(d.jsx)("li",{},t)})),Object(d.jsx)(Q,{children:t})};return Object(d.jsxs)(z,{className:e.rarity.toLowerCase(),children:[Object(d.jsx)("figure",{style:n}),Object(d.jsx)("h1",{children:e.name}),Object(d.jsx)("p",{children:e.description}),Object(d.jsx)(r,{fusionLimit:e.fusionLimit})]},e.uniqueName)});function H(){var e=Object(h.a)(["\n    box-sizing: border-box;\n    display: inline-block;\n    max-width: 20%;\n    padding: 1em;\n"]);return H=function(){return e},e}var K=b.a.div(H()),U=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(d.jsxs)(f,{children:[Object(d.jsx)("h1",{children:this.props.name}),Object(d.jsx)("p",{children:this.props.description}),Object(d.jsx)(v,{alt:"",src:j+this.props.imageName,class:"small"}),Object(d.jsxs)("p",{children:["Armor: ",this.props.armor]}),Object(d.jsx)("h3",{children:"Manufacturing Requirements"}),Object(d.jsx)(V,{components:this.props.components})]})}}]),n}(F.a.Component),V=function(e){var t=e.components;return void 0===t?null:(t=Object.entries(e.components),Object(d.jsx)(x,{children:t.map((function(e){return Object(d.jsx)(X,Object(a.a)({},e),e.uniqueName)}))},e.uniqueName))},X=function(e){var t=e[1].description;return Object(d.jsxs)(K,{children:[Object(d.jsxs)("p",{children:[e[1].name," x ",e[1].itemCount]}),Object(d.jsx)(v,{title:t,alt:t,src:j+e[1].imageName})]})},Y=U;function Z(){var e=Object(h.a)(["\n    border: 1px solid #7F7A82;\n    border-left:4px solid;\n    border-radius:4px;\n    background: #28282A;\n    color: #FFF;\n    margin: 10px;\n    padding: 1em;\n\n    select {\n        margin: 0 10px;\n    }\n"]);return Z=function(){return e},e}var $=b.a.section(Z()),_=n(1),ee=n(24),te=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(s.a)(this,n),(r=t.call(this,e)).handleFilterChange=function(e){return function(t){var n=r.state.filters;n[e]=t.target.value,r.setState({filters:n}),r.setFilteredResults()}},r.state={items:{},filters:{category:"",keyword:"",mods:{type:"",polarity:""}},filterProps:{mods:{types:[],polarities:[],rarities:[]}},filteredItems:[],jsonLoaded:!1},r.handleInputChange=r.handleInputChange.bind(Object(c.a)(r)),r.getItemsByCategory=r.getItemsByCategory.bind(Object(c.a)(r)),r.setFilteredResults=r.setFilteredResults.bind(Object(c.a)(r)),r.updateState=r.updateState.bind(Object(c.a)(r)),r.handleFilterChange=r.handleFilterChange.bind(Object(c.a)(r)),r}return Object(o.a)(n,[{key:"getAllItems",value:function(){var e=this;p.forEach((function(t){"all"!==t.toLowerCase()&&e.getItemsByCategory(t)})),this.setState({jsonLoaded:!0})}},{key:"getItemsByCategory",value:function(e){var t=this,n="".concat(window.location.href,"/data/").concat(e,".json");fetch(n).then((function(e){try{var t=e.json();if(t&&"object"===typeof t)return t}catch(n){console.log(n)}})).then((function(n){t.setItems(e,n),"Mods"===e&&n.forEach((function(e){t.setModPolarity(e.polarity),t.setModTypes(e.type)}))})).catch((function(e){console.error("Error:",e)}))}},{key:"setItems",value:function(e,t){var n=Object(a.a)({},this.state.items);n[e]=t,this.setState({items:n})}},{key:"setModPolarity",value:function(e){if(!this.state.filterProps.mods.polarities.includes(e)){var t=Object(i.a)(this.state.filterProps.mods.polarities);t.push(e),this.setState({filterProps:{mods:{polarities:t}}})}}},{key:"updateState",value:function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,i=t.name;this.setState(Object(r.a)({},i,n)),this.setFilteredResults()}},{key:"handleInputChange",value:function(e){this.updateState(e)}},{key:"setModPolarities",value:function(){this.setState((function(e){var t=[];return e.items.Mods.forEach((function(e){t.push(e.polarity)})),e.modPolarities=t,e}))}},{key:"setModTypes",value:function(){this.setState((function(e){var t=[];return e.items.Mods.forEach((function(e){t.includes(e.type)||t.push(e.type)})),e.filterProps.mods.types=t,e}))}},{key:"componentDidMount",value:function(){this.state.jsonLoaded||this.getAllItems()}},{key:"deDupeItems",value:function(e){var t=[],n=[];return e.forEach((function(e){t.includes(e.name)||(t.push(e.name),n.push(e))})),n}},{key:"setFilteredResults",value:function(){var e=this;this.setState((function(t){var n=t.filters.category,r=t.filters.keyword,i=t.filters.mods.polarity,a=t.items[n];return a=e.deDupeItems(a),r&&(a=a.filter((function(e){return e.name.toLowerCase().includes(r)}))),"Mods"===n&&i&&(a=a.filter((function(e){return e.polarity===i}))),t.filteredItems=a,t}))}},{key:"render",value:function(){var e,t=this.state.filterProps,n=this.state.filters,r=p.map((function(e){return Object(d.jsx)("option",{value:e,children:e},e)}));"Mods"===n.category&&(e=Object(d.jsx)(ne,{modTypes:t.mods.types,modPolarities:t.mods.polarities,modTypeFilter:n.mods.type,polarityFilter:n.mods.polarity,onChange:this.handleFilterChange}));var i=this.state.filters.keyword,a=this.state.filters.category;return Object(d.jsxs)("main",{children:[Object(d.jsxs)($,{children:[Object(d.jsx)("input",{type:"text",name:"keyword",value:i,onChange:this.handleFilterChange("keyword")}),Object(d.jsx)("select",{name:"category",value:a,onChange:this.handleFilterChange("category"),children:r})]}),e,Object(d.jsx)("div",{children:Object(d.jsx)(ae,{className:"clearfix",category:a,keyword:i,items:this.state.filteredItems})})]})}}]),n}(_.Component),ne=function(e){return Object(d.jsxs)($,{children:[Object(d.jsx)("label",{children:"Filter mods by:"}),Object(d.jsx)(ie,{polarityFilter:e.polarityFilter,modPolarities:e.modPolarities,handleFilterChange:e.onChange}),Object(d.jsx)(re,{modTypes:e.modTypes,modTypeFilter:e.modTypeFilter,handleFilterChange:e.onChange})]})},re=function(e){var t=e.modTypes.map((function(e){return Object(d.jsx)("option",{value:e,children:e},e)}));return Object(d.jsxs)("select",{name:"modTypeFilter",value:e.modTypeFilter,onChange:e.handleFilterChange("mods.type"),children:[Object(d.jsx)("option",{value:"",children:"-- Type --"},"default"),";",t]})},ie=function(e){var t=e.modPolarities.map((function(e){return Object(d.jsx)("option",{value:e,children:e},e)}));return Object(d.jsxs)("select",{name:"polarityFilter",value:e.polarityFilter,onChange:e.handleFilterChange,children:[Object(d.jsx)("option",{value:"",children:"-- Polarity --"},"default"),";",t]})},ae=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props.keyword,t=this.props.category;if(!e&&!t)return null;var n={Archwing:w,Arcanes:N,Fish:R,Mods:W,Sentinels:Y},r=void 0!==n[t]?n[t]:T,i=this.props.items;return Object(d.jsx)(D,{keyword:e,items:i,itemSingleComponent:r},"ResultList")}}]),n}(_.Component);ee.render(Object(d.jsx)(te,{}),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.36033d7c.chunk.js.map