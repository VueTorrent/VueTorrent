import{T as _,a as M,n as g}from"./TorrentDetail-DM9-pf78.js";const P={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8,min:9,max:10},u=0,h=1,c=2,d=3,f=4,p=5,x=class b{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<u)}set blend(t){!!(this.data&1<<u)!==t&&(this.data^=1<<u)}get offsets(){return!!(this.data&1<<h)}set offsets(t){!!(this.data&1<<h)!==t&&(this.data^=1<<h)}set cullMode(t){if(t==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=t==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<c)}set culling(t){!!(this.data&1<<c)!==t&&(this.data^=1<<c)}get depthTest(){return!!(this.data&1<<d)}set depthTest(t){!!(this.data&1<<d)!==t&&(this.data^=1<<d)}get depthMask(){return!!(this.data&1<<p)}set depthMask(t){!!(this.data&1<<p)!==t&&(this.data^=1<<p)}get clockwiseFrontFace(){return!!(this.data&1<<f)}set clockwiseFrontFace(t){!!(this.data&1<<f)!==t&&(this.data^=1<<f)}get blendMode(){return this._blendMode}set blendMode(t){this.blend=t!=="none",this._blendMode=t,this._blendModeId=P[t]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const t=new b;return t.depthTest=!1,t.blend=!0,t}};x.default2d=x.for2d();let w=x,T=0;class S{constructor(t){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=t||{},this.enableFullScreen=!1}createTexture(t,o,e){const r=new _({...this.textureOptions,width:t,height:o,resolution:1,antialias:e,autoGarbageCollect:!0});return new M({source:r,label:`texturePool_${T++}`})}getOptimalTexture(t,o,e=1,r){let n=Math.ceil(t*e-1e-6),l=Math.ceil(o*e-1e-6);n=g(n),l=g(l);const a=(n<<17)+(l<<1)+(r?1:0);this._texturePool[a]||(this._texturePool[a]=[]);let s=this._texturePool[a].pop();return s||(s=this.createTexture(n,l,r)),s.source._resolution=e,s.source.width=n/e,s.source.height=l/e,s.source.pixelWidth=n,s.source.pixelHeight=l,s.frame.x=0,s.frame.y=0,s.frame.width=t,s.frame.height=o,s.updateUvs(),this._poolKeyHash[s.uid]=a,s}getSameSizeTexture(t,o=!1){const e=t.source;return this.getOptimalTexture(t.width,t.height,e._resolution,o)}returnTexture(t){const o=this._poolKeyHash[t.uid];this._texturePool[o].push(t)}clear(t){if(t=t!==!1,t)for(const o in this._texturePool){const e=this._texturePool[o];if(e)for(let r=0;r<e.length;r++)e[r].destroy(!0)}this._texturePool={}}}const k=new S,m={name:"local-uniform-bit",vertex:{header:`

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
        `}},F={...m,vertex:{...m.vertex,header:m.vertex.header.replace("group(1)","group(2)")}},O={name:"local-uniform-bit",vertex:{header:`

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
        `}};class U{constructor(){this.batcherName="default",this.attributeSize=4,this.indexSize=6,this.packAsQuad=!0,this.roundPixels=0,this._attributeStart=0,this._batcher=null,this._batch=null}get blendMode(){return this.renderable.groupBlendMode}get color(){return this.renderable.groupColorAlpha}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.bounds=null}}function v(i,t,o){const e=(i>>24&255)/255;t[o++]=(i&255)/255*e,t[o++]=(i>>8&255)/255*e,t[o++]=(i>>16&255)/255*e,t[o++]=e}export{U as B,w as S,k as T,m as a,O as b,v as c,F as l};
