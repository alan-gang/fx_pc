(this.webpackJsonpxystc_fxweb_fast=this.webpackJsonpxystc_fxweb_fast||[]).push([[12],{229:function(e,n,t){"use strict";t.d(n,"a",(function(){return i}));var i={SSC:"ssc",G11X5:"11x5",PK10:"pk10",K3:"k3"};i.SSC,i.G11X5,i.PK10,i.K3,i.SSC,i.G11X5,i.PK10,i.K3},252:function(e,n,t){"use strict";var i=t(6),a=t(7),m=function(){function e(n,t,a){Object(i.a)(this,e),this.timerItval=0,this.fn=void 0,this.fn=t,this.start(n,t,a)}return Object(a.a)(e,[{key:"start",value:function(e,n){var t=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;this.timerItval=window.setInterval((function(){if(e<=0)return clearInterval(t.timerItval),void n(0,!0);n(e,!1),e--}),i)}},{key:"close",value:function(){clearInterval(this.timerItval)}}]),e}();n.a=m},253:function(e,n,t){"use strict";t.d(n,"a",(function(){return A}));var i=1e3,a=60*i,m=60*a;function A(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"hh:mm:ss").replace("hh",String(Math.floor(e/m)).padStart(2,"0")).replace("mm",String(Math.floor(e%m/a)).padStart(2,"0")).replace("ss",String(Math.floor(e%m%a/i)).padStart(2,"0"))}},313:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdDMTQ4NDI3RTk3MzExRTk5N0I3RkEzQTZGNDBCNEFDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdDMTQ4NDI4RTk3MzExRTk5N0I3RkEzQTZGNDBCNEFDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0MxNDg0MjVFOTczMTFFOTk3QjdGQTNBNkY0MEI0QUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0MxNDg0MjZFOTczMTFFOTk3QjdGQTNBNkY0MEI0QUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6KJxv4AAACoklEQVR42mKMC0hiIADUgDgAiN2AWAuIhaHib4H4GhDvAuINQHwLnyGMIIsWrp+LIREfmGwPpJqB2JaBOHAYiGuBZh3EJsmCxQIOIDUBiNNADmEgHoActB+ofxaQLgBa+ANZkgnNEiEgtQ+I03FZAvI9thCAhRBU7z6oWZgWASW4gNQ2ILZkoByAzNgGNRPDRxOB2BzEUNVQYYhJiWJgYmIi2mQWFhaGxMw4BjkFWZiQOdRMhEXQiE+GCdq72jHYOFoxiEmIEm2RlKwUg5W9JYONkzWycDLUbEiqg6YYG5gsMzMzg7ikGMOzJ89JCi9pOSmG509eMPz79w9Z+AgwTm1BFukDORcoiRBGRkaG////41NiAAq6IHIt0NHXYohNjSZkCQgEsZCQIeEAlFhCY4IZ1LXVGHqa+onRYgeySINYCwSEBBgSMuIYDE31wfyb124xXD5/hRit6ixIZRdGRgSmGBR+THIk3BIQWLtsPdYMjcUMYSZy4+fCmYsMN6/eIj7BAFPdMyAtSYxiETERhqikCIZfP38yrFiwiuHD+4/E2vMcFHQ3iLXozas3DJM6ppATADeZoJmV1uAwyKJ1dLBoLciii6BiAlkUVARJSkuSbJo0sLzDUhCDiqCLMNEaIIZn78SseIb6rmoGCSlxoi2RU5RjaOiuZYhICEMWBplZCy+9odXvbJjswd2HGI7sP8bw6sVroiu+Z4+fMRw7dAKsDwnMBqo9gF6VFwIxKDea375xhwGESQF//vxhmD9tIbLQSaiZqBUf0OZvQMobqoBSADLDG2omZpsBKAFqQjkC8UzkOCMB/IfqdYKaRXRzqw2IrYi0BBQ51bA4IdjcQvIdKIFYAy0Ele7+QOwOxJpoDcjrQLwTiDcC1d/A5wqAAAMANtrP37gflg8AAAAASUVORK5CYII="},314:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgzNjlERkQzRTk3MjExRTlBQUQ4OEQ3MDI2NUNEQkQxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgzNjlERkQ0RTk3MjExRTlBQUQ4OEQ3MDI2NUNEQkQxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODM2OURGRDFFOTcyMTFFOUFBRDg4RDcwMjY1Q0RCRDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODM2OURGRDJFOTcyMTFFOUFBRDg4RDcwMjY1Q0RCRDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Ncaw9AAAEeklEQVR42qxWe1CUVRT/7bIs7qKT2SgChu1U7MJurlRACFiivYSK2TBzKC21kUaNf6yBSYYMg8JMHBuDsaaZxl5jNVbmCFiI2DaCBsb7ISDpKMI6MbxcYNnOuX4wu+u3Wzadmd989zv33vO755x7z72Ktanr8Q8STkglPEaIJNwh6W2EJkIZ4TChzZcRlY++hwl5hEQv/cESlhPeI1QRcgiVcoOVMroZhGJChQ8SOUmU5hRLNnx6NIdwhBAnZ2n1ulUIvTME1b/W4FSFVW6IgrCJsIiQQrgm55GWcNQbyZbXX8XK1CdQWX4SqaufxjtFO6Dy9xr5OMmWVo5oLyFWbpbRHInoJQ/io90l6GjtxNyguViwcAGck05foYyVbLqFjhO/wduMtHSL+I6Pj2PgrwEUFexDc30LHA7HDSMqFSYmJuSmss2DvEGmiHZK8b1JAmdqcdfdC0V79pzZ4ltbXYfg0PmwrEkVfdpALZxOJ1ob2/DFp1/B1nfNNWdsO5GJzIQEN58TYhBhMuDQwW+gVCoFWDQajfhu3LoeiUnxNy1qcbQZpigT9ubvQ1N985SabZuZyOI6OCh4Hhl6GWq1Gl3nu0XyXUVvDHcjaWlsxYmySvxOXtqv2xH/SBweWhrrSsRiUXmelUeTV6CIVsTGGusahW50ZBQarQYJSUtQ89tZkSeFQoGSoo/RII1hyczeAq1Wi2M/lHo6u5RjYnArBysScTvlonjPAfT32YTu688OYcw+hkt/Xkbv5V5sy8jCm5m5wrvN2zIQMCNAjLs/JgoGk542hsOTSO9nNkTlU8NvSsNJffGVdJHsScek0DX90QzrydOoKD0h/nm3hYaFYFPmRvqGIiY+mkJcJcLX1tKOM+S1hwQoqKjaqaF21b61azt09+im/4eHRnCx56IwUHbk+LT+/eJ3xZkSuWpoRUFOobcTMqaUqrCb5GXlizLjusX1keFY9cKzIjccrufWpiF7aw66OrrEGA5ZxH0Gb0Q2Dl0yNXSuWg5fjfUM2praMTw4RDvQH4P05byZFhuRYlmJ8Ih7Uf7Tzyj9sRzLn1wm8uSgUNfW1MkRnVVJ5X2ZXC9vUY9titeyNk+31QE3Ir5rxx7kfZALnXSwZaSKQ/edXA+vMHvnG8IAh46FVx44M1C02Zv+q/2i3dPVgwudPXQGg7wRfctE5winPHv8/f1hMOoRpgvD9VG7yE36hjWib4jC+PknX4owFu7PF7mpttagr7dPjoRtn+Mc8U8nYZ1rvfNT+WHWbbNwnqo1b+e3d+eKasHGCrYXEtkwnkpLgXFRpPCEF1N5vApXLl1xSzfhJUL3FNEFQgjhgen7g+obH86g+fPwPF14THb08DHsp6ticGBQjOFF2K7a0E1ha2/pQH1tg6c3Bwgfiurq8jjhRPzi7U76D3KakEQY8bz4WJEsDfg/SJKnSOQeJzZpq5dI8b1VcUpzkzwLgdwraJSQIRFab4HEKhFkuHryb951/D6Ll6r7M4THCREeD0g+zXwnfM/lztcq/hZgAOhOgSxo4QnyAAAAAElFTkSuQmCC"},315:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdBNEEyNUM4RTk3MzExRTk4OTk2QTZEQTc1OUU0NjhBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdBNEEyNUM5RTk3MzExRTk4OTk2QTZEQTc1OUU0NjhBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0E0QTI1QzZFOTczMTFFOTg5OTZBNkRBNzU5RTQ2OEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0E0QTI1QzdFOTczMTFFOTg5OTZBNkRBNzU5RTQ2OEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7QqvenAAABqElEQVR42mKMC0hiAAJVIO4AYhcg5mMgD3wC4j1AXAHEt1mAhDoQnwBiAQbKAMhBQUDsBMQWTECijQqGIgOQWW0sUO/DgZSMJIONkzUDw38Ghl1bdjN8eP+RHMPdWJDDFGRoY08dAxs7G5hv7WjFUJVXy/D1y1dSDeZhQubZOtvADQX7SZCfwdjckKzwQDH4379/GAr+//9PucH7dxxg+PjhE5z/5NFThlPHzpBlMCMwHaM4iZePl8HQVJ/h9+/fDOdPXWD48eMnWQazoAt8/vSZ4dDeIyhi0rJSDO5+bgx/fv9h2LtjH8PTR89INxgdiIqLMtR11TBwcLDDU0pNQT3D65eviQ9jbMDSzhxuKAiA2CAxkiIPG8CWholJ1wQNPnrgOMP9O/fhfBAbJEZyqsAGmJmZGfSMdIAp5Q/D9cs3GP7+/Usw+7MQk3RABp0/fZEBvUzBl/2ZyC3CCGV/sg0mlP2ZoCU/yYBA9v/CAq1Ogkg1+M3rtwzV+XUo2f8nIvvvAqUKDSDjOBVrkQ+gfAUKihugOgqI14GKCgoM/Aw1A2TWDYAAAwAaIKK2KwerbAAAAABJRU5ErkJggg=="},316:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgyQTlBQTAyRTk3MjExRTk5OTFGRjhFOEMzQkQxNEQ3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgyQTlBQTAzRTk3MjExRTk5OTFGRjhFOEMzQkQxNEQ3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJBOUFBMDBFOTcyMTFFOTk5MUZGOEU4QzNCRDE0RDciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODJBOUFBMDFFOTcyMTFFOTk5MUZGOEU4QzNCRDE0RDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6sdfU6AAACi0lEQVR42mKMC0hiIADUgDgAiN2AWAuIhaHib4H4GhDvAuINQHwLnyEseOTsgbgZiG1xyEtCsTMQdwLxYSCuBeKD2BQzYRHjAOIZQLwfjyXYgC1UzwyoGXgtEgLifUCcDsSMDKQDRqjefVCzsFrEBcTbgNiSgXJgCTWLC5tFE4HYnIF6wBxqJopFoIhPZqA+SIaaDU91LehxIqMgzdDa34Si69mTZwxTe2cwPHnwlMEnxIshNDoYLP7+3XuGPdv3gflbN25nWLVgDXKcgcy2BflIH4ht0J0CMuzyxStg9t3bd8EGSMlIMZTUFoLFtqzZBld77PAJhsN7j4AtRLIEBkBm64MsCsLl7+9fv8PZ9+/cB9OCQoIMjh72KOq+ffnG4O7vBrYQBwhiIjGvgAE3DzeGmKGxPsOxA8dxabEDWaRBaYyLiouAg1VVQwWXEnUmpLKLaPD1y1fUdGwNyRUKyvK4tAgzEWu4oooiPIXt34FanHFyQkocNQ1VnPqZoKUwXqCsqszg7e8JTt4zJ87BkD917DSYBgUfDvAWlI9uQEthnACUvJvK2nDKP7z/iMHMyhTM1tTTYLh+6Qa6kptM0OKdYgDyLQjoGulgkz4MsmgdpZZw8XAx3LpxG8yWU5DFpmQtyKKLQHwEXQZUBMGCAxRHpjbGKPKgIggGNLTUGPSN9CA+0tcB60UCILMvMkKrcntopcVI5UL1PxA7AfEBWPIGpdfZNCi9QWYeQK+PQKXlSSpachJqJkbF9w2Ivalk2UmoWd9wtRlAmdcRiGdCw5ecOJkJjZe3hFpBoLohA2rhMRIsOQa1IAPZJ8S060AJxBpauvsDsTso46M1IK8D8U4g3ggtYXACgAADABXOo/2moynaAAAAAElFTkSuQmCC"},470:function(e,n,t){var i=t(471);"string"===typeof i&&(i=[[e.i,i,""]]);var a={insert:"head",singleton:!1};t(32)(i,a);i.locals&&(e.exports=i.locals)},471:function(e,n,t){n=e.exports=t(31)(!1);var i=t(88),a=i(t(472)),m=i(t(473)),A=i(t(313)),c=i(t(314)),u=i(t(315)),l=i(t(316)),g=i(t(474)),o=i(t(475));n.push([e.i,".game-menu-view {\n  width: 2rem;\n  top: 1.4rem;\n  position: fixed;\n  left: 1rem;\n  z-index: 2;\n}\n.game-menu-view .game-menu-header {\n  height: 0.5rem;\n  line-height: 0.5rem;\n  background: #252224 url("+a+") center no-repeat;\n  color: #fff;\n  border-top-left-radius: 0.08rem;\n  border-top-right-radius: 0.08rem;\n}\n.game-menu-view .game-type-icon {\n  display: inline-block;\n  width: 0.22rem;\n  height: 0.22rem;\n  margin-right: 0.1rem;\n}\n.game-menu-view .game-type-icon.icon-box {\n  background: url("+m+") center no-repeat;\n  background-size: 0.22rem;\n}\n.game-menu-view .game-type-icon.icon-ssc {\n  background: url("+A+") center no-repeat;\n  background-size: 0.22rem;\n}\n.game-menu-view .game-type-icon.icon-11x5 {\n  background: url("+c+") center no-repeat;\n  background-size: 0.22rem;\n}\n.game-menu-view .game-type-icon.icon-k3 {\n  background: url("+u+") center no-repeat;\n  background-size: 0.22rem;\n}\n.game-menu-view .game-type-icon.icon-pk10 {\n  background: url("+l+") center no-repeat;\n  background-size: 0.22rem;\n}\n.game-menu-view .game-menu-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.game-menu-view .game-menu-item .nav-link-wp {\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.game-menu-view .game-menu-item .nav-link-wp > a {\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.game-menu-view .game-menu-item .nav-link-wp .game-timer {\n  padding-right: 0.02rem;\n}\n.game-menu-view .game-menu-item .favourite {\n  visibility: hidden;\n}\n.game-menu-view .game-menu-item:hover .favourite {\n  visibility: visible;\n}\n.game-menu-view .sub-menu-box .favourite {\n  visibility: visible;\n}\n.game-menu-view .favourite {\n  display: inline-block;\n  width: 0.17rem;\n  height: 0.17rem;\n  background-image: url("+g+");\n  background-size: 100%;\n  background-repeat: no-repeat;\n}\n.game-menu-view .favourite.selected {\n  background-image: url("+o+");\n}\n.game-menu-view .ant-menu-root {\n  border-bottom-left-radius: 0.08rem;\n  border-bottom-right-radius: 0.08rem;\n}\n.game-menu-view .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {\n  background: linear-gradient(to right, #f17d0b, #f86919, #ff5529);\n  color: #fff;\n}\n.game-menu-view .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected .txt-c-r {\n  color: #fff;\n}\n.game-menu-view .ant-menu,\n.game-menu-view .ant-menu-submenu,\n.game-menu-view .ant-menu-item,\n.game-menu-view .ant-menu-submenu .ant-menu-sub {\n  transition: none;\n}\n.game-menu-view .ant-menu-submenu-title {\n  background: #f6f5f5;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.game-menu-view .ant-menu-submenu-title:active {\n  background: transparent;\n}\n.game-menu-view .ant-menu-submenu-title {\n  transition: none;\n}\n.game-menu-view .ant-menu-submenu-title > span {\n  display: flex;\n  align-items: center;\n}\n.game-menu-view .ant-menu-item {\n  padding-left: 0.15rem !important;\n  padding-right: 0.1rem;\n}\n.game-menu-view .ant-menu-item a:hover,\n.game-menu-view .ant-menu-item:hover {\n  color: #666;\n}\n.game-menu-view .ant-menu-submenu-selected {\n  color: #333;\n}\n.game-menu-view .ant-menu-submenu-title:hover {\n  color: #666;\n}\n.game-menu-view .ant-menu-submenu-arrow::before,\n.game-menu-view .ant-menu-submenu-arrow::after {\n  background: #333 !important;\n}\n.game-menu-view .txt-c-r {\n  color: #ff501b;\n}\n",""])},472:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAzCAYAAADSDUdEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcyQUNBMEUzRTk3MjExRTk4NDVGQTE1NEJGNkFDMTU5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcyQUNBMEU0RTk3MjExRTk4NDVGQTE1NEJGNkFDMTU5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzJBQ0EwRTFFOTcyMTFFOTg0NUZBMTU0QkY2QUMxNTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzJBQ0EwRTJFOTcyMTFFOTg0NUZBMTU0QkY2QUMxNTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5PkPobAAAKLUlEQVR42uxd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"},473:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg1MkREOTg2RTk3MjExRTlCOENDRDVDODNCMjgxRkM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg1MkREOTg3RTk3MjExRTlCOENDRDVDODNCMjgxRkM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODUyREQ5ODRFOTcyMTFFOUI4Q0NENUM4M0IyODFGQzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODUyREQ5ODVFOTcyMTFFOUI4Q0NENUM4M0IyODFGQzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6U+6ZMAAABXklEQVR42uSUTStEURjHz9xkYW4WirKhJiQrCx9B4RuYko1ZKElRsvBSllaKxEI2o7CwZPIFfAPCkJdkFjYmSV6G31PPqeu6L93Mzr9+zXPPOf3mPuecmdTTXHrAGLMJzeZ3rmAIjn3jtbAGWTiE4frF5xeZcCJkkgwsBch2oQFaoQwH5Xm3zgrDZDYtPtkeVGAQHiEHl/KmSNOOSZZl+NRW32SAVisqvYDtpMJemLUyG6RffMzIfFLhDmyA6x2kVdmKLcgnFS7AqZ6s65HtwyuMi7AYIznz1NLaKJyotFtlcmWytP5eoxu8Co0BsjuY8I1ZqbxtHgqyf8g+ZDLFxTZ/CaIfz46pcqTlHliBpoD5GxjTg5B0wLr+QuwJ2/IeJqXlc4r2iC89gj6t5SD6I9YWnRiZpNNTd8Wsbav6Hv5T4UPMmtuQOiglR//LSiELrmHa8zylY0GRezjyLcAAEltVjZB3/cIAAAAASUVORK5CYII="},474:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg0NTgzMDFBRTk3MjExRTlBNTdEODg5RjBBNzFDOEFDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg0NTgzMDFCRTk3MjExRTlBNTdEODg5RjBBNzFDOEFDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODQ1ODMwMThFOTcyMTFFOUE1N0Q4ODlGMEE3MUM4QUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODQ1ODMwMTlFOTcyMTFFOUE1N0Q4ODlGMEE3MUM4QUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz67G/M1AAABjUlEQVR42oyUu0oDQRSGN7vxkmiIKEmIGG+gNjFooWCpjVhYCVraCT6WNoJY2PoK4gNoIyrer8Rb0ETjd+BfGDYRcuBjd2Znzv7nMhPzGs2HDKQhAXGoQQXK8AC/7oZYxEEvDMAbvMC7HJijbn235yU8NxHg5aEIych8OjJOal0+nAgcBTk4hi9nwzwsQzucaa4qFYNhmL5yYCGcajK0LpiBHZjVOLSa1hdMSKAk1pUwT/H3wSLcwyGkYBKe4Bt+pMhCi1tix+AOPmFdsZY1t69NbbAAowrdvm2perm4XsxBB2RhGy4iybS/HujdHK3KsZU94Tt98AF7sKZYm9kIrMCufhyW3yuFL7Jx2PzHyQZMOGNTU/Ilye2N2ya9EpqF/hgZV+JKolXjVR+y6gP7y7T64RqOVK2squRpXzmQkoJavaqeMclzasYTGIIlObbK3EhtP5y7Z6ao3NjGKbetZRkpC7SuKCUtnR2v1bPjOSd2WAvrOvJ1hZGSfNt85XR4w1Xg3ic90NnKffInwADRZld+T17awQAAAABJRU5ErkJggg=="},475:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg0QkZEMkNGRTk3MjExRTk5RDcxQTYzNURFMzMzREY3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg0QkZEMkQwRTk3MjExRTk5RDcxQTYzNURFMzMzREY3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODRCRkQyQ0RFOTcyMTFFOTlENzFBNjM1REUzMzNERjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODRCRkQyQ0VFOTcyMTFFOTlENzFBNjM1REUzMzNERjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7gv6jrAAABwklEQVR42oSUSytFURTH3ZPnJQa4IkpKSl4x0R0xwEx5lMiMT8BYyYeQgZQSA2VioEgxEBN5v1LyijwmyFUUfov/ye4M3F2/u8/Za63/XmevdXfoaSg9ITCSoQ7KIA/S4A3u4AQ24d0NSLSfzIrSn5fn/dNKpma4gHW4xvbKuu1UCGaPwiLre4r5FdFLg5ymcbh1Niri/UpZnOCXz9zJnM36ijl4TgbVMBEQGIFLGPYXZJ8wf+KqfJFkfcKspe4IRGBAz4N694XMbxZaINVEauAcw418UqAcxsA/9QwYlW+GhMz/DKo8VWFHwWsQgwNoC1StA7bgBTZUNYsr85SmqWZBrX9OcUalsrSyRywgTGq2+z20K5P/hp1HKzzKN2wiMU45LIcF6Ioj0gPLera4mKcMChyn7TgiR86zdfSDpyaqdgwVcURcu8Ude9q5mE/ys8nR/AVz0Asz8Kn1XDWo+ZfAbkh/QOu8RhjnkD+Yu82okvrDeqcephBIYu6DVSuzp8bZVc37cbBMJgMCNg6t3WXvt02Is5iEUOAqsIyarINhX/0TUxUKdB7FsKRM/64CZ5jhWPdJVI0YvE/mg/fJtwADAIXoi+q0mqUIAAAAAElFTkSuQmCC"},560:function(e,n,t){"use strict";t.r(n);t(467);var i,a=t(438),m=t(6),A=t(7),c=t(24),u=t(23),l=t(25),g=t(0),o=t.n(g),I=t(21),s=t(46),r=t(89),b=t(229),d=t(252),h=t(253),M=t(22),v=(t(470),Object(I.b)("store")(i=Object(I.c)(i=function(e){function n(e){var t;return Object(m.a)(this,n),(t=Object(c.a)(this,Object(u.a)(n).call(this,e))).rootSubmenuKeys=["box",b.a.SSC,b.a.G11X5,b.a.PK10,b.a.K3],t.MAIN_WIDTH=1200,t.MENU_WIDTH=210,t.DEFAULT_GAME_TYPE=b.a.SSC,t.menuGames=r.a,t.id=void 0,t.gameType=void 0,t.state=void 0,t.onOpenChange=function(e){var n=e.find((function(e){return-1===t.state.openKeys.indexOf(e)}))||"";-1===t.rootSubmenuKeys.indexOf(n)?t.setState({openKeys:e}):t.setState({openKeys:n?[n]:[]}),t.gameType=n,setTimeout((function(){t.clearAllTimer(),t.init()}),0)},t.onAddFavourite=function(e,n,i){i.stopPropagation();var a=Object(r.d)(e);if(a){"box"===n?(a.favourite=!1,t.props.store.game.removeFavourite(e)):(a.favourite=!0,t.props.store.game.setFavourite(a));var m=t.state.navData;m[0].items=t.props.store.game.favourites||[],t.setState({navData:m})}},t.id=parseInt(t.getGameIdFromUrl()||"0",10),t.gameType=Object(r.e)(t.id)||t.DEFAULT_GAME_TYPE,t.state={offsetLeft:30,openKeys:["box",t.gameType],defaultSelectedKeys:[String(t.id)],navData:[]},t}return Object(l.a)(n,e),Object(A.a)(n,[{key:"componentWillMount",value:function(){this.init()}},{key:"init",value:function(){var e=this;this.props.store.game.getAvailableGames((function(n){var t=e.initSyncFavouriteStateToGames();t.unshift({type:"box",name:"\u6536\u85cf\u5939",items:e.props.store.game.favourites||[]}),e.setState({navData:t});var i=e.getShowingMenuGameIds(t);e.getIssuesByGameIds(i.join(","))}))}},{key:"getShowingMenuGameIds",value:function(e){for(var n=[],t=this.props.store.game.favourites||[],i=0;i<e.length;i++)if(e[i].type===this.gameType){e[i].items.forEach((function(e){n.push(e.id)}));break}return t.forEach((function(e,t){n.includes(e.id)||n.push(e.id)})),n}},{key:"updateCurGameIssue",value:function(e,n){for(var t=this.state.navData,i=0;i<t.length;i++)for(var a=0;a<t[i].items.length;a++)if(e===t[i].items[a].id){t[i].items[a].issue=n;break}this.setState({navData:t})}},{key:"getGameById",value:function(e){for(var n=this.state.navData,t=0;t<n.length;t++)for(var i=0;i<n[t].items.length;i++)if(e===n[t].items[i].id)return n[t].items[i];return null}},{key:"getIssueByGameId",value:function(e){var n=this;M.a.curIssue({gameid:e}).then((function(t){t.success>0&&(t.remainTime=t.saleend-t.current,t.timeStr=Object(h.a)(t.remainTime),n.updateCurGameIssue(e,t),n.initCountDown(e))}))}},{key:"getIssuesByGameIds",value:function(e){var n=this;M.a.getIssuesByGameIds({gameid:e}).then((function(e){e.success>0&&e.items.forEach((function(t){t.remainTime=t.saleend-e.current,t.timeStr=Object(h.a)(t.remainTime),n.updateCurGameIssue(t.lotteryid,t),n.initCountDown(t.lotteryid)}))}))}},{key:"initCountDown",value:function(e){var n=this,t=this.getGameById(e),i=t&&t.issue;i&&(i.timer&&i.timer.close(),i.timer=new d.a(Math.floor(i.remainTime/1e3),(function(t){t<=0&&n.getIssueByGameId(e),i.remainTime=Math.floor(1e3*t),i.timeStr=Object(h.a)(1e3*t),n.updateCurGameIssue(e,i)})))}},{key:"clearAllTimer",value:function(){var e=this.state.navData,n=e.shift();e=r.a.map((function(e){return e.items=e.items.map((function(e){return e.issue&&e.issue.timer&&(e.issue.timer.close(),e.issue.timer=null),e})),e})),n&&e.unshift(n),this.setState({navData:e})}},{key:"componentDidMount",value:function(){var e=this;this.updatePosition(),window.addEventListener("resize",(function(){e.updatePosition()}),!1)}},{key:"updatePosition",value:function(){this.setState({offsetLeft:(document.documentElement.clientWidth-this.MAIN_WIDTH)/2-this.MENU_WIDTH>0?(document.documentElement.clientWidth-this.MAIN_WIDTH)/2-this.MENU_WIDTH-10:0})}},{key:"initSyncFavouriteStateToGames",value:function(){for(var e=this,n=this.props.store.game.favourites||[],t=function(t){e.menuGames=e.menuGames.map((function(i){return i.items=i.items.map((function(i){return n[t].id===i.id&&(i.favourite=!0),e.props.store.game.hasAvailableGame(i.id)||(i.available=!1),i})),i.items=i.items.filter((function(e){return!1!==e.available})),i}))},i=0;i<n.length;i++)t(i);return this.menuGames}},{key:"getGameIdFromUrl",value:function(){var e=window.location.hash,n=e.indexOf("?");return n>=0&&e.substring(0,n),e.substring(e.lastIndexOf("/")+1,e.length)}},{key:"render",value:function(){var e=this;return o.a.createElement("nav",{className:"game-menu-view",style:{left:"".concat(this.state.offsetLeft,"px")}},o.a.createElement("header",{className:"game-menu-header txt-c"},"\u5168\u90e8\u5f69\u79cd"),o.a.createElement(a.a,{mode:"inline",openKeys:this.state.openKeys,defaultSelectedKeys:this.state.defaultSelectedKeys,onOpenChange:this.onOpenChange,style:{width:200},subMenuCloseDelay:0,subMenuOpenDelay:0},this.state.navData.map((function(n){return o.a.createElement(a.a.SubMenu,{key:n.type,className:"sub-menu-".concat(n.type),title:o.a.createElement("span",null,o.a.createElement("i",{className:"game-type-icon icon-".concat(n.type)}),o.a.createElement("span",null,n.name))},n.items.map((function(t){return o.a.createElement(a.a.Item,{key:t.id,className:"game-menu-item"},o.a.createElement("span",{className:"nav-link-wp"},o.a.createElement(s.b,{to:"/game/".concat(t.id)},o.a.createElement("span",null,t.name),o.a.createElement("span",{className:"game-timer ".concat(t.issue&&t.issue.remainTime<1e4?"txt-c-r":"")},t.issue&&t.issue.timeStr))),o.a.createElement("span",{className:"favourite ".concat(t.favourite?"selected":""),onClick:function(i){return e.onAddFavourite(t.id,n.type,i)}}))})))}))))}}]),n}(g.Component))||i)||i);n.default=v}}]);
//# sourceMappingURL=12.3fe2ae3b.chunk.js.map