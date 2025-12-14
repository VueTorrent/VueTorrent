import{S as M,a as x,b as F}from"./TorrentDetail-DTxek-Lq.js";const _={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8,min:9,max:10},r=0,a=1,n=2,l=3,d=4,u=5,c=class p{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<r)}set blend(t){!!(this.data&1<<r)!==t&&(this.data^=1<<r)}get offsets(){return!!(this.data&1<<a)}set offsets(t){!!(this.data&1<<a)!==t&&(this.data^=1<<a)}set cullMode(t){if(t==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=t==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<n)}set culling(t){!!(this.data&1<<n)!==t&&(this.data^=1<<n)}get depthTest(){return!!(this.data&1<<l)}set depthTest(t){!!(this.data&1<<l)!==t&&(this.data^=1<<l)}get depthMask(){return!!(this.data&1<<u)}set depthMask(t){!!(this.data&1<<u)!==t&&(this.data^=1<<u)}get clockwiseFrontFace(){return!!(this.data&1<<d)}set clockwiseFrontFace(t){!!(this.data&1<<d)!==t&&(this.data^=1<<d)}get blendMode(){return this._blendMode}set blendMode(t){this.blend=t!=="none",this._blendMode=t,this._blendModeId=_[t]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const t=new p;return t.depthTest=!1,t.blend=!0,t}};c.default2d=c.for2d();let y=c;const b=class f extends M{constructor(t){t={...f.defaultOptions,...t},super(t),this.enabled=!0,this._state=y.for2d(),this.blendMode=t.blendMode,this.padding=t.padding,typeof t.antialias=="boolean"?this.antialias=t.antialias?"on":"off":this.antialias=t.antialias,this.resolution=t.resolution,this.blendRequired=t.blendRequired,this.clipToViewport=t.clipToViewport,this.addResource("uTexture",0,1)}apply(t,e,s,o){t.applyFilter(this,e,s,o)}get blendMode(){return this._state.blendMode}set blendMode(t){this._state.blendMode=t}static from(t){const{gpu:e,gl:s,...o}=t;let m,g;return e&&(m=x.from(e)),s&&(g=F.from(s)),new f({gpuProgram:m,glProgram:g,...o})}};b.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let S=b;const h={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},P={...h,vertex:{...h.vertex,header:h.vertex.header.replace("group(1)","group(2)")}},k={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}};class w{constructor(){this.batcherName="default",this.topology="triangle-list",this.attributeSize=4,this.indexSize=6,this.packAsQuad=!0,this.roundPixels=0,this._attributeStart=0,this._batcher=null,this._batch=null}get blendMode(){return this.renderable.groupBlendMode}get color(){return this.renderable.groupColorAlpha}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.bounds=null}destroy(){}}function U(i,t,e){const s=(i>>24&255)/255;t[e++]=(i&255)/255*s,t[e++]=(i>>8&255)/255*s,t[e++]=(i>>16&255)/255*s,t[e++]=s}export{w as B,S as F,y as S,h as a,k as b,U as c,P as l};
