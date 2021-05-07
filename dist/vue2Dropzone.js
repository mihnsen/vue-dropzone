!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o(require("dropzone/dist/dropzone.css"),require("dropzone")):"function"==typeof define&&define.amd?define(["dropzone/dist/dropzone.css","dropzone"],o):(e=e||self).vue2Dropzone=o(null,e.Dropzone)}(this,function(e,o){"use strict";o=o&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o;var t={getSignedURL(e,o){let t={filePath:e.name,contentType:e.type};return new Promise((n,i)=>{var s=new FormData;let r=new XMLHttpRequest,d="function"==typeof o.signingURL?o.signingURL(e):o.signingURL;r.open("POST",d),r.onload=function(){200==r.status?n(JSON.parse(r.response)):i(r.statusText)},r.onerror=function(e){console.error("Network Error : Could not send request to AWS (Maybe CORS errors)"),i(e)},!0===o.withCredentials&&(r.withCredentials=!0),Object.entries(o.headers||{}).forEach(([e,o])=>{r.setRequestHeader(e,o)}),t=Object.assign(t,o.params||{}),Object.entries(t).forEach(([e,o])=>{s.append(e,o)}),r.send(s)})},sendFile(e,o,t){var n=t?this.setResponseHandler:this.sendS3Handler;return this.getSignedURL(e,o).then(o=>n(o,e)).catch(e=>e)},setResponseHandler(e,o){o.s3Signature=e.signature,o.s3Url=e.postEndpoint},sendS3Handler(e,o){let t=new FormData,n=e.signature;return Object.keys(n).forEach(function(e){t.append(e,n[e])}),t.append("file",o),new Promise((o,n)=>{let i=new XMLHttpRequest;i.open("POST",e.postEndpoint),i.onload=function(){if(201==i.status){var e=(new window.DOMParser).parseFromString(i.response,"text/xml").firstChild.children[0].innerHTML;o({success:!0,message:e})}else{var t=(new window.DOMParser).parseFromString(i.response,"text/xml").firstChild.children[0].innerHTML;n({success:!1,message:t+". Request is marked as resolved when returns as status 201"})}},i.onerror=function(e){var o=(new window.DOMParser).parseFromString(i.response,"text/xml").firstChild.children[1].innerHTML;n({success:!1,message:o})},i.send(t)})}};o.autoDiscover=!1;return function(e,o,t,n,i,s,r,d,p,u){"boolean"!=typeof r&&(p=d,d=r,r=!1);var a,l="function"==typeof t?t.options:t;if(e&&e.render&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0,i&&(l.functional=!0)),n&&(l._scopeId=n),s?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,p(e)),e&&e._registeredComponents&&e._registeredComponents.add(s)},l._ssrRegister=a):o&&(a=r?function(){o.call(this,u(this.$root.$options.shadowRoot))}:function(e){o.call(this,d(e))}),a)if(l.functional){var c=l.render;l.render=function(e,o){return a.call(o),c(e,o)}}else{var h=l.beforeCreate;l.beforeCreate=h?[].concat(h,a):[a]}return t}({render:function(){var e=this.$createElement,o=this._self._c||e;return o("div",{ref:"dropzoneElement",class:{"vue-dropzone dropzone":this.includeStyling},attrs:{id:this.id}},[this.useCustomSlot?o("div",{staticClass:"dz-message"},[this._t("default",[this._v("Drop files here to upload")])],2):this._e()])},staticRenderFns:[]},void 0,{props:{id:{type:String,required:!0,default:"dropzone"},options:{type:Object,required:!0},includeStyling:{type:Boolean,default:!0,required:!1},awss3:{type:Object,required:!1,default:null},destroyDropzone:{type:Boolean,default:!0,required:!1},duplicateCheck:{type:Boolean,default:!1,required:!1},useCustomSlot:{type:Boolean,default:!1,required:!1}},data:()=>({isS3:!1,isS3OverridesServerPropagation:!1,wasQueueAutoProcess:!0}),computed:{dropzoneSettings(){let e={thumbnailWidth:200,thumbnailHeight:200};return Object.keys(this.options).forEach(function(o){e[o]=this.options[o]},this),null!==this.awss3&&(e.autoProcessQueue=!1,this.isS3=!0,this.isS3OverridesServerPropagation=!1===this.awss3.sendFileToServer,void 0!==this.options.autoProcessQueue&&(this.wasQueueAutoProcess=this.options.autoProcessQueue),this.isS3OverridesServerPropagation&&(e.url=(e=>e[0].s3Url))),e}},mounted(){if(this.$isServer&&this.hasBeenMounted)return;this.hasBeenMounted=!0,this.dropzone=new o(this.$refs.dropzoneElement,this.dropzoneSettings);let e=this;this.dropzone.on("thumbnail",function(o,t){e.$emit("vdropzone-thumbnail",o,t)}),this.dropzone.on("addedfile",function(o){var t,n;if(e.duplicateCheck&&this.files.length)for(t=0,n=this.files.length;t<n-1;t++)this.files[t].name===o.name&&this.files[t].size===o.size&&this.files[t].lastModifiedDate.toString()===o.lastModifiedDate.toString()&&(this.removeFile(o),e.$emit("vdropzone-duplicate-file",o));e.$emit("vdropzone-file-added",o),e.isS3&&e.wasQueueAutoProcess&&!o.manuallyAdded&&e.getSignedAndUploadToS3(o)}),this.dropzone.on("addedfiles",function(o){e.$emit("vdropzone-files-added",o)}),this.dropzone.on("removedfile",function(o){e.$emit("vdropzone-removed-file",o),o.manuallyAdded&&null!==e.dropzone.options.maxFiles&&e.dropzone.options.maxFiles++}),this.dropzone.on("success",function(o,t){if(e.$emit("vdropzone-success",o,t),e.isS3){if(e.isS3OverridesServerPropagation){var n=(new window.DOMParser).parseFromString(t,"text/xml").firstChild.children[0].innerHTML;e.$emit("vdropzone-s3-upload-success",n)}e.wasQueueAutoProcess&&e.setOption("autoProcessQueue",!1)}}),this.dropzone.on("successmultiple",function(o,t){e.$emit("vdropzone-success-multiple",o,t)}),this.dropzone.on("error",function(o,t,n){e.$emit("vdropzone-error",o,t,n),this.isS3&&e.$emit("vdropzone-s3-upload-error")}),this.dropzone.on("errormultiple",function(o,t,n){e.$emit("vdropzone-error-multiple",o,t,n)}),this.dropzone.on("sending",function(o,t,n){if(e.isS3)if(e.isS3OverridesServerPropagation){let e=o.s3Signature;Object.keys(e).forEach(function(o){n.append(o,e[o])})}else n.append("s3ObjectLocation",o.s3ObjectLocation);e.$emit("vdropzone-sending",o,t,n)}),this.dropzone.on("sendingmultiple",function(o,t,n){e.$emit("vdropzone-sending-multiple",o,t,n)}),this.dropzone.on("complete",function(o){e.$emit("vdropzone-complete",o)}),this.dropzone.on("completemultiple",function(o){e.$emit("vdropzone-complete-multiple",o)}),this.dropzone.on("canceled",function(o){e.$emit("vdropzone-canceled",o)}),this.dropzone.on("canceledmultiple",function(o){e.$emit("vdropzone-canceled-multiple",o)}),this.dropzone.on("maxfilesreached",function(o){e.$emit("vdropzone-max-files-reached",o)}),this.dropzone.on("maxfilesexceeded",function(o){e.$emit("vdropzone-max-files-exceeded",o)}),this.dropzone.on("processing",function(o){e.$emit("vdropzone-processing",o)}),this.dropzone.on("processingmultiple",function(o){e.$emit("vdropzone-processing-multiple",o)}),this.dropzone.on("uploadprogress",function(o,t,n){e.$emit("vdropzone-upload-progress",o,t,n)}),this.dropzone.on("totaluploadprogress",function(o,t,n){e.$emit("vdropzone-total-upload-progress",o,t,n)}),this.dropzone.on("reset",function(){e.$emit("vdropzone-reset")}),this.dropzone.on("queuecomplete",function(){e.$emit("vdropzone-queue-complete")}),this.dropzone.on("drop",function(o){e.$emit("vdropzone-drop",o)}),this.dropzone.on("dragstart",function(o){e.$emit("vdropzone-drag-start",o)}),this.dropzone.on("dragend",function(o){e.$emit("vdropzone-drag-end",o)}),this.dropzone.on("dragenter",function(o){e.$emit("vdropzone-drag-enter",o)}),this.dropzone.on("dragover",function(o){e.$emit("vdropzone-drag-over",o)}),this.dropzone.on("dragleave",function(o){e.$emit("vdropzone-drag-leave",o)}),e.$emit("vdropzone-mounted")},beforeDestroy(){this.destroyDropzone&&this.dropzone.destroy()},methods:{manuallyAddFile:function(e,o){e.manuallyAdded=!0,this.dropzone.emit("addedfile",e);let t=!1;if((o.indexOf(".svg")>-1||o.indexOf(".png")>-1||o.indexOf(".jpg")>-1||o.indexOf(".jpeg")>-1||o.indexOf(".gif")>-1||o.indexOf(".webp")>-1)&&(t=!0),this.dropzone.options.createImageThumbnails&&t&&e.size<=1024*this.dropzone.options.maxThumbnailFilesize*1024){o&&this.dropzone.emit("thumbnail",e,o);for(var n=e.previewElement.querySelectorAll("[data-dz-thumbnail]"),i=0;i<n.length;i++)n[i].style.width=this.dropzoneSettings.thumbnailWidth+"px",n[i].style.height=this.dropzoneSettings.thumbnailHeight+"px",n[i].style["object-fit"]="contain"}this.dropzone.emit("complete",e),this.dropzone.options.maxFiles&&this.dropzone.options.maxFiles--,this.dropzone.files.push(e),this.$emit("vdropzone-file-added-manually",e)},setOption:function(e,o){this.dropzone.options[e]=o},removeAllFiles:function(e){this.dropzone.removeAllFiles(e)},processQueue:function(){let e=this.dropzone;this.isS3&&!this.wasQueueAutoProcess?this.getQueuedFiles().forEach(e=>{this.getSignedAndUploadToS3(e)}):this.dropzone.processQueue(),this.dropzone.on("success",function(){e.options.autoProcessQueue=!0}),this.dropzone.on("queuecomplete",function(){e.options.autoProcessQueue=!1})},init:function(){return this.dropzone.init()},destroy:function(){return this.dropzone.destroy()},updateTotalUploadProgress:function(){return this.dropzone.updateTotalUploadProgress()},getFallbackForm:function(){return this.dropzone.getFallbackForm()},getExistingFallback:function(){return this.dropzone.getExistingFallback()},setupEventListeners:function(){return this.dropzone.setupEventListeners()},removeEventListeners:function(){return this.dropzone.removeEventListeners()},disable:function(){return this.dropzone.disable()},enable:function(){return this.dropzone.enable()},filesize:function(e){return this.dropzone.filesize(e)},accept:function(e,o){return this.dropzone.accept(e,o)},addFile:function(e){return this.dropzone.addFile(e)},removeFile:function(e){this.dropzone.removeFile(e)},getAcceptedFiles:function(){return this.dropzone.getAcceptedFiles()},getRejectedFiles:function(){return this.dropzone.getRejectedFiles()},getFilesWithStatus:function(){return this.dropzone.getFilesWithStatus()},getQueuedFiles:function(){return this.dropzone.getQueuedFiles()},getUploadingFiles:function(){return this.dropzone.getUploadingFiles()},getAddedFiles:function(){return this.dropzone.getAddedFiles()},getActiveFiles:function(){return this.dropzone.getActiveFiles()},getSignedAndUploadToS3(e){var o=t.sendFile(e,this.awss3,this.isS3OverridesServerPropagation);this.isS3OverridesServerPropagation?o.then(()=>{setTimeout(()=>this.dropzone.processFile(e))}):o.then(o=>{o.success?(e.s3ObjectLocation=o.message,setTimeout(()=>this.dropzone.processFile(e)),this.$emit("vdropzone-s3-upload-success",o.message)):void 0!==o.message?this.$emit("vdropzone-s3-upload-error",o.message):this.$emit("vdropzone-s3-upload-error","Network Error : Could not send request to AWS. (Maybe CORS error)")}),o.catch(e=>{alert(e)})},setAWSSigningURL(e){this.isS3&&(this.awss3.signingURL=e)}}},void 0,!1,void 0,void 0,void 0)});
//# sourceMappingURL=vue2Dropzone.js.map
