window.ChecConsoleHelper=function(a,b,c,d){var e,f,g,h,i,j,k;switch(e=void 0,f=void 0,g=void 0,h=void 0,i=void 0,j=void 0,k=void 0,a=a||"black",e="White",h=!1,a){case"success":a="#488f5a",f="✅   ";break;case"info":a="DodgerBlue",f="";break;case"error":"validation"===d.error.type?(a="rgba(244, 67, 54, 1)",f="🚫 Validation/Missing Fields",b=""):(a="rgba(244, 67, 54, 1)",f="❌ HTTP ERROR ",e="rgba(244, 67, 54, 0.15)"),h=!0;break;case"warning":a="rgba(208, 154, 35, 1)",f="⚠️  "}if(h===!0){if(console.log("%c"+f+b,"color:"+a+";display:block; width: 100%;padding:2px 2px 2px 0px;font-family: Open Sans, Helvetica, Sans-serif;font-weight:bold;background-color:"+e+";"),"object"==typeof d.error.message){for(j=d.error.message,g=0,i=j.length,k=[];g<i;)console.log("%c"+j[g].field+" %c"+j[g].error,"color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:800;","color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:400;"),k.push(g++);return k}return console.log("%c"+d.error.message,"color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:400;")}"object"==typeof a?(console.log("%c"+b,"color: PowderBlue;font-weight:bold;font-family: Open Sans, Helvetica, Sans-serif; background-color: RoyalBlue;"),console.log(a)):(console.log("%c"+f+b,"color:"+a+";display:block;font-family: Open Sans, Helvetica, Sans-serif;line-height:28px; width: 100%;padding:2px 2px 2px 0px;font-weight:bold;background-color:"+e+";"),c&&console.log("%c"+c,"color:#515D6D;line-height:22px;font-weight:400; font-family: Open Sans, Helvetica, Sans-serif;"))};var Commerce,indexOf=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};Commerce=function(){"use strict";function a(b,c){switch(null==c&&(c=!1),c&&this.DebuggerIsLive(),this.options=this.Merge(this.options,{publicKey:b,debug:c}),this.Storage=new a.Storage,window.location.hostname){case"checkout.chec.dev":this.options.url="api.chec.dev";break;case"spaces.chec.dev":this.options.url="api.chec.dev";break;case"stage.checkout.chec.io":this.options.url="stage.api.chec.io";break;case"checkout.chec.io":this.options.url="api.chec.io";break;default:this.options.url="api.chec.io"}this.Cart=new a.Cart(this),this.Checkout=new a.Checkout(this),this.Products=new a.Products(this),this.Services=new a.Services(this)}return a.prototype.options={publicKey:"",auth:{},version:"v1",methods:["GET","POST","PUT","DELETE"],debug:!1},a.prototype.DebuggerIsLive=function(){var a;return a="\r\n \r\n                           Che         EcC\r\n                         c....c2    2c....:C\r\n                       c........c2   2c.....:C\r\n                     c............c2   2c.....:C\r\n                   c................c2   2c.....:C\r\n                 c....................c2   2c.....:C\r\n               c........................c2   2c.....:C\r\n             c............................c2   2c.....:C\r\n           c.......:E2  2c..................c2   2c.....:C\r\n         c........h  $$   2c..................c2   2c.....:C\r\n       c.........:C  $cc$  E....................c2   2c.....:C\r\n     c............h    $$  c......................c2   2c.....:C\r\n   c...............:E    E:.........................c2   2c.....:C\r\n   E............................:C c..................h2   2c...:C\r\n     E........................:C     c..................h2   2hC\r\n       E....................:C         c..................h2\r\n         E................:C             c................:C\r\n           E............:C                 c............:C\r\n             E........:C                     c........:C\r\n               E....:C                         c....:C\r\n                 EcC                             EcC\r\n \r\n \r\n \r\n",console.log("%c"+a,"font-family: 'Courier New', Courier, monospace; color: #788ba4; font-weight:bold; font-size: 11px;"),console.log("%cCommerce.js console debugger is on!  🎉","text-align:center; display:block; font-family: 'Open Sans', Helvetica, Sans-serif; color: #488f5a; line-height:28px; font-size: 14px"),console.log("%c💬   Need some help? Join our Slack channel - https://chec-commercejs-community.herokuapp.com \r\n","text-align:center; display:block; font-family: 'Open Sans', Helvetica, Sans-serif; color: #515D6D; line-height:20px; font-size: 12px")},a.prototype.Merge=function(a,b){var c,d,e;d={};for(c in a)e=a[c],d[c]=e;for(c in b)e=b[c],d[c]=e;return d},a.prototype.Event=function(a){return window.dispatchEvent(new CustomEvent("Commercejs."+a))},a.prototype.InArray=function(a,b){return!(!b||indexOf.call(b,a)<0)},a.prototype.Serialize=function(a,b){var c,d,e;null==b&&(b=null),d=[];for(c in a)e=a[c],c=null!==b?b+"["+c+"]":c,d.push("object"==typeof e?this.Serialize(e,c):encodeURIComponent(c)+"="+encodeURIComponent(e));return d.join("&")},a.prototype.Error=function(a){var b,c;return c="["+a.status_code+"] Type: "+a.error.type,b=""+a.error.message,ChecConsoleHelper("error",c,b,a)},a.prototype.Ajax=function(a){var b,c,d,e,f,g,h;b={method:"GET",async:!0,data:null,timeout:6e4,headers:{},host:this.options.url,port:"api.chec.io"===this.options.url?443:80,path:"/",success:function(a,b,c){},error:function(a,b,c){}},b=this.Merge(b,a),b.method=b.method.toUpperCase();try{f=new XMLHttpRequest}catch(a){c=a;try{f=new ActiveXObject("Msxml2.XMLHTTP")}catch(a){return c=a,!1}}b.url=(443===b.port?"https://":"http://")+b.host+("/"!==b.path.substr(0,1)?"/"+this.options.version+"/"+b.path:b.path),"GET"===b.method?(b.url+="?"+this.Serialize(b.data),b.data=null):b.data=this.Serialize(b.data),f.open(b.method,b.url,b.async),g=setTimeout(function(a){return function(){return f.abort(),b.error(f,408,"Your request timed out")}}(this),b.timeout),e=b.headers;for(d in e)h=e[d],f.setRequestHeader(d,h);return f.onreadystatechange=function(){var a;return 4!==f.readyState?null:(clearTimeout(g),a=JSON.parse(f.responseText),"2"!==f.status.toString().charAt(0)?b.error(a,f.status,f):b.success(a,f.status,f))},f.send(b.data)},a.prototype.Request=function(a,b,c,d,e){var f,g;if(null==b&&(b="GET"),null==c&&(c=null),f={},g={"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json","X-Authorization":this.options.publicKey,"X-Chec-Agent":"commerce.js/v1"},null===this.options.publicKey&&alert("Please enter your public api key"),this.InArray(b,this.options.methods)||"function"==typeof e&&e("error","Invalid request method ("+b+")",400),this.Ajax({method:b,path:a,data:c,async:!0,headers:g,success:function(a){return function(b,c,e){return a.options.debug===!0&&"object"==typeof b._console&&ChecConsoleHelper(b._console[0],b._console[1],b._console[2]),"function"==typeof d?d(b,"undefined"!=typeof b.pagination?b.pagination:null):b}}(this),error:function(a){return function(b,c,g){if("function"==typeof e)e(b);else{if(a.options.debug===!0&&a.Error(b),"function"!=typeof d)return b;d(b,"undefined"!=typeof b.pagination?b.pagination:null)}return f=b}}(this)}),"undefined"==typeof d)return f.r},a}(),Commerce.Storage=function(){function a(){}return a.prototype.set=function(a,b,c){var d,e;return d=void 0,e=void 0,e="",c&&(d=new Date,d.setTime(d.getTime()+24*c*60*60*1e3),e="; expires="+d.toGMTString()),document.cookie=a+"="+b+e+"; path=/"},a.prototype.get=function(a){var b,c,d,e;for(a+="=",e=document.cookie.split(";"),c=0,d=e.length;c<d;c++){for(b=e[c];" "===b.charAt(0);)b=b.substring(1,b.length);if(0===b.indexOf(a))return b.substring(a.length,b.length)}return null},a.prototype.remove=function(a){return this.set(a,"",-1)},a}(),Commerce.Cart=function(){function a(a){this.c=a,this.init()}return a.prototype.init=function(a){var b;return null==a&&(a=!1),b=this.c,a||null===this.c.Storage.get("commercejs_cart_id")?a?this.c.Request("carts/"+a,"GET",null,function(a){return b.Storage.set("commercejs_cart_id",a.id,30),b.Cart.cart_id=a.id,b.Event("Cart.Ready")},function(a){return b.Cart.refresh()}):this.refresh():this.c.Request("carts/"+this.c.Storage.get("commercejs_cart_id"),"GET",null,function(a){return b.Cart.cart_id=a.id,b.Event("Cart.Ready")},function(a){return b.Cart.refresh()})},a.prototype.refresh=function(a,b){var c;return c=this.c,this.c.Request("carts","GET",null,function(a){return c.Storage.set("commercejs_cart_id",a.id,30),c.Cart.cart_id=a.id,c.Event("Cart.Ready")})},a.prototype.id=function(){return this.cart_id},a.prototype.add=function(a,b,c){return this.c.Request("carts/"+this.cart_id,"POST",a,b,c)},a.prototype.retrieve=function(a,b){return this.c.Request("carts/"+this.cart_id,"GET",null,a,b)},a.prototype.remove=function(a,b,c){return this.c.Request("carts/"+this.cart_id+"/items/"+a,"DELETE",null,b,c)},a.prototype.delete=function(a,b){return this.c.Request("carts/"+this.cart_id,"DELETE",null,a,b)},a.prototype.update=function(a,b,c,d){return this.c.Request("carts/"+this.cart_id+"/items/"+a,"PUT",b,c,d)},a.prototype.contents=function(a,b){return this.c.Request("carts/"+this.cart_id+"/items","GET",null,a,b)},a.prototype.empty=function(a,b){return this.c.Request("carts/"+this.cart_id+"/items","DELETE",null,a,b)},a}(),Commerce.Checkout=function(){function Checkout(a){this.c=a}return Checkout.prototype.protect=function(token){return this.c.Request("checkouts/"+token+"/protect","GET",null,function(data){return eval(data.sift_js)})},Checkout.prototype.generateToken=function(a,b,c,d){return"function"==typeof b?this.c.Request("checkouts/"+a,"GET",null,b,c):this.c.Request("checkouts/"+a,"GET",{type:b},c,d)},Checkout.prototype.capture=function(a,b,c,d){return this.c.Request("checkouts/"+a,"POST",b,c,d)},Checkout.prototype.checkPaypalStatus=function(a,b,c){return this.c.Request("checkouts/"+a+"/check/paypal/payment","GET",{},b,c)},Checkout.prototype.checkPaypalOrderCaptured=function(a,b,c){return this.c.Request("checkouts/"+a+"/check/paypal/captured","GET",{},b,c)},Checkout.prototype.receipt=function(a,b,c){return this.c.Request("checkouts/"+a+"/receipt","GET",{},b,c)},Checkout.prototype.checkPayWhatYouWant=function(a,b,c,d){return this.c.Request("checkouts/"+a+"/check/pay_what_you_want","GET",{customer_set_price:b},c,d)},Checkout.prototype.fields=function(a,b,c){return this.c.Request("checkouts/"+a+"/fields","GET",null,b,c)},Checkout.prototype.setTaxZone=function(a,b,c,d){return this.c.Request("checkouts/"+a+"/helper/set_tax_zone","GET",b,c,d)},Checkout.prototype.getLocationFromIP=function(a,b,c,d){return null===b&&(b=""),"function"==typeof b?this.c.Request("checkouts/"+a+"/helper/location_from_ip","GET",null,b,d):this.c.Request("checkouts/"+a+"/helper/location_from_ip","GET",{ip_address:b},c,d)},Checkout.prototype.isFree=function(a,b,c){return this.c.Request("checkouts/"+a+"/check/is_free","GET",null,b,c)},Checkout.prototype.checkVariant=function(a,b,c,d,e,f){return this.c.Request("checkouts/"+a+"/check/"+b+"/variant","GET",{variant_id:c,option_id:d},e,f)},Checkout.prototype.checkDiscount=function(a,b,c,d){return this.c.Request("checkouts/"+a+"/check/discount","GET",{code:b},c,d)},Checkout.prototype.checkShippingOption=function(a,b,c,d,e){return this.c.Request("checkouts/"+a+"/check/shipping","GET",{country:b,id:c},d,e)},Checkout.prototype.getShippingOptions=function(a,b,c,d){return this.c.Request("checkouts/"+a+"/helper/shipping_options","GET",{country:b},c,d)},Checkout.prototype.checkQuantity=function(a,b,c,d,e){return this.c.Request("checkouts/"+a+"/check/"+b+"/quantity","GET",{amount:c},d,e)},Checkout.prototype.helperValidation=function(a,b,c){return this.c.Request("checkouts/"+a+"/helper/validation","GET",null,b,c)},Checkout.prototype.getLive=function(a,b,c){return this.c.Request("checkouts/"+a+"/live","GET",null,b,c)},Checkout.prototype.getToken=function(a,b,c){return this.c.Request("checkouts/tokens/"+a,"GET",null,b,c)},Checkout}(),Commerce.Products=function(){function a(a){this.c=a}return a.prototype.list=function(a,b,c){return"function"==typeof a?this.c.Request("products","GET",null,a,b):this.c.Request("products","GET",a,b,c)},a.prototype.retrieve=function(a,b,c,d){return this.c.Request("products/"+a,"GET",{type:b},c,d)},a}(),Commerce.Services=function(){function a(a){this.c=a}return a.prototype.localeListCountries=function(a,b){return this.c.Request("services/locale/countries","GET",null,a,b)},a.prototype.localeListShippingCountries=function(a,b,c){return this.c.Request("services/locale/"+a+"/countries","GET",null,b,c)},a.prototype.localeListSubdivisions=function(a,b,c){return this.c.Request("services/locale/"+a+"/subdivisions","GET",{},b,c)},a}();