import{l as Ge,j as g,m as Be,o as Ue,E as u,p as b,q as Ae,s as q,F as K,t as Ie,k as m,S as p,d as B,w as Y,v as Fe,b as H,B as k,h as U,u as C,i as _,R as w,x as Ee,a as De,C as S,y as Oe,z as ze,G as He,H as J,e as X,I as Le,P as We,c as Ve,D as Q,J as je,K as $e,__tla as __tla_0}from"./TorrentDetail-CxKI2LIc.js";import{b as Ne,S as Z,G as ee,f as te,U as re,T as L,h as W,B as qe,i as Ke,R as se,__tla as __tla_1}from"./colorToUniform-ZrBY_WXW.js";let Bt,T,Gt,Ut,St,At,at,Pt,M,wt,Ct,Mt,Rt;let __tla=Promise.all([(()=>{try{return __tla_0}catch{}})(),(()=>{try{return __tla_1}catch{}})()]).then(async()=>{const ae=class A extends Ne{constructor(e){e={...A.defaultOptions,...e},super(e),this.enabled=!0,this._state=Z.for2d(),this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.addResource("uTexture",0,1)}apply(e,t,r,a){e.applyFilter(this,t,r,a)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:t,gl:r,...a}=e;let n,i;return t&&(n=ee.from(t)),r&&(i=te.from(r)),new A({gpuProgram:n,glProgram:i,...a})}};ae.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1};let Ye=ae;var Je=`in vec2 vMaskCoord;
in vec2 vTextureCoord;

uniform sampler2D uTexture;
uniform sampler2D uMaskTexture;

uniform float uAlpha;
uniform vec4 uMaskClamp;

out vec4 finalColor;

void main(void)
{
    float clip = step(3.5,
        step(uMaskClamp.x, vMaskCoord.x) +
        step(uMaskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, uMaskClamp.z) +
        step(vMaskCoord.y, uMaskClamp.w));

    // TODO look into why this is needed
    float npmAlpha = uAlpha; 
    vec4 original = texture(uTexture, vTextureCoord);
    vec4 masky = texture(uMaskTexture, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * uAlpha * clip);

    finalColor = original;
}
`,Xe=`in vec2 aPosition;

out vec2 vTextureCoord;
out vec2 vMaskCoord;


uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;
uniform mat3 uFilterMatrix;

vec4 filterVertexPosition(  vec2 aPosition )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
       
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(  vec2 aPosition )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

vec2 getFilterCoord( vec2 aPosition )
{
    return  ( uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}   

void main(void)
{
    gl_Position = filterVertexPosition(aPosition);
    vTextureCoord = filterTextureCoord(aPosition);
    vMaskCoord = getFilterCoord(aPosition);
}
`,V=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,  
};

struct MaskUniforms {
  uFilterMatrix:mat3x3<f32>,
  uMaskClamp:vec4<f32>,
  uAlpha:f32,
};


@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : MaskUniforms;
@group(1) @binding(1) var uMaskTexture: texture_2d<f32>;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{

  
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var maskClamp = filterUniforms.uMaskClamp;

     var clip = step(3.5,
        step(maskClamp.x, filterUv.x) +
        step(maskClamp.y, filterUv.y) +
        step(filterUv.x, maskClamp.z) +
        step(filterUv.y, maskClamp.w));

    var mask = textureSample(uMaskTexture, uSampler, filterUv);
    var source = textureSample(uTexture, uSampler, uv);
    
    var npmAlpha = 0.0;

    var alphaMul = 1.0 - npmAlpha * (1.0 - mask.a);

    var a = (alphaMul * mask.r) * clip;

    return vec4(source.rgb, source.a) * a;
}`;class Qe extends Ye{constructor(e){const{sprite:t,...r}=e,a=new Ge(t.texture),n=new re({uFilterMatrix:{value:new g,type:"mat3x3<f32>"},uMaskClamp:{value:a.uClampFrame,type:"vec4<f32>"},uAlpha:{value:1,type:"f32"}}),i=ee.from({vertex:{source:V,entryPoint:"mainVertex"},fragment:{source:V,entryPoint:"mainFragment"}}),l=te.from({vertex:Xe,fragment:Je,name:"mask-filter"});super({...r,gpuProgram:i,glProgram:l,resources:{filterUniforms:n,uMaskTexture:t.texture.source}}),this.sprite=t,this._textureMatrix=a}apply(e,t,r,a){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.uFilterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.uMaskTexture=this.sprite.texture.source,e.applyFilter(this,t,r,a)}}class ne{constructor(e,t){this.state=Z.for2d(),this._batches=Object.create(null),this._geometries=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init(this)}buildStart(e){if(!this._batches[e.uid]){const t=new Be;this._batches[e.uid]=t,this._geometries[t.uid]=new Ue}this._activeBatch=this._batches[e.uid],this._activeGeometry=this._geometries[this._activeBatch.uid],this._activeBatch.begin()}addToBatch(e){this._activeBatch.add(e)}break(e){this._activeBatch.break(e)}buildEnd(e){const t=this._activeBatch,r=this._activeGeometry;t.finish(e),r.indexBuffer.setDataWithSize(t.indexBuffer,t.indexSize,!0),r.buffers[0].setDataWithSize(t.attributeBuffer.float32View,t.attributeSize,!1)}upload(e){const t=this._batches[e.uid],r=this._geometries[t.uid];t.dirty&&(t.dirty=!1,r.buffers[0].update(t.attributeSize*4))}execute(e){if(e.action==="startBatch"){const t=e.batcher,r=this._geometries[t.uid];this._adaptor.start(this,r)}this._adaptor.execute(this,e)}destroy(){this.state=null,this.renderer=null,this._adaptor.destroy(),this._adaptor=null;for(const e in this._batches)this._batches[e].destroy();this._batches=null;for(const e in this._geometries)this._geometries[e].destroy();this._geometries=null}}ne.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"batch"};Mt={name:"texture-bit",vertex:{header:`

        struct TextureUniforms {
            uTextureMatrix:mat3x3<f32>,
        }

        @group(2) @binding(2) var<uniform> textureUniforms : TextureUniforms;
        `,main:`
            uv = (textureUniforms.uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;

         
        `,main:`
            outColor = textureSample(uTexture, uSampler, vUV);
        `}};Ct={name:"texture-bit",vertex:{header:`
            uniform mat3 uTextureMatrix;
        `,main:`
            uv = (uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
        uniform sampler2D uTexture;

         
        `,main:`
            outColor = texture(uTexture, vUV);
        `}};function Ze(s,e){const t=s.root,r=s.instructionSet;r.reset(),e.batch.buildStart(r),e.blendMode.buildStart(),e.colorMask.buildStart(),t.sortableChildren&&t.sortChildren(),ie(t,r,e,!0),e.batch.buildEnd(r),e.blendMode.buildEnd(r)}function P(s,e,t){s.globalDisplayStatus<7||!s.includeInBuild||(s.sortableChildren&&s.sortChildren(),s.isSimple?et(s,e,t):ie(s,e,t,!1))}function et(s,e,t){if(s.renderPipeId&&(t.blendMode.setBlendMode(s,s.groupBlendMode,e),s.didViewUpdate=!1,t[s.renderPipeId].addRenderable(s,e)),!s.isRenderGroupRoot){const r=s.children,a=r.length;for(let n=0;n<a;n++)P(r[n],e,t)}}function ie(s,e,t,r){if(!r&&s.isRenderGroupRoot)t.renderGroup.addRenderGroup(s.renderGroup,e);else{for(let i=0;i<s.effects.length;i++){const l=s.effects[i];t[l.pipe].push(l,s,e)}const a=s.renderPipeId;a&&(t.blendMode.setBlendMode(s,s.groupBlendMode,e),s.didViewUpdate=!1,t[a].addRenderable(s,e));const n=s.children;if(n.length)for(let i=0;i<n.length;i++)P(n[i],e,t);for(let i=s.effects.length-1;i>=0;i--){const l=s.effects[i];t[l.pipe].pop(l,s,e)}}}const tt=new q;class rt extends K{constructor(){super({filters:[new Qe({sprite:new Ie(m.EMPTY)})]})}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}}class oe{constructor(e){this._activeMaskStage=[],this._renderer=e}push(e,t,r){const a=this._renderer;if(a.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"pushMaskBegin",mask:e,canBundle:!1,maskedContainer:t}),e.renderMaskToTexture){const n=e.mask;n.includeInBuild=!0,P(n,r,a.renderPipes),n.includeInBuild=!1}a.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:t,canBundle:!1})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"popMaskEnd",mask:e,canBundle:!1})}execute(e){const t=this._renderer,r=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){const a=b.get(rt);if(r){e.mask.mask.measurable=!0;const n=Ae(e.mask.mask,!0,tt);e.mask.mask.measurable=!1,n.ceil();const i=L.getOptimalTexture(n.width,n.height,1,!1);t.renderTarget.push(i,!0),t.globalUniforms.push({offset:n,worldColor:4294967295});const l=a.sprite;l.texture=i,l.worldTransform.tx=n.minX,l.worldTransform.ty=n.minY,this._activeMaskStage.push({filterEffect:a,maskedContainer:e.maskedContainer,filterTexture:i})}else a.sprite=e.mask.mask,this._activeMaskStage.push({filterEffect:a,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){const a=this._activeMaskStage[this._activeMaskStage.length-1];r&&(t.renderTarget.pop(),t.globalUniforms.pop()),t.filter.push({renderPipeId:"filter",action:"pushFilter",container:a.maskedContainer,filterEffect:a.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){t.filter.pop();const a=this._activeMaskStage.pop();r&&L.returnTexture(a.filterTexture),b.return(a.filterEffect)}}destroy(){this._renderer=null,this._activeMaskStage=null}}oe.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"alphaMask"};class le{constructor(e){this._colorStack=[],this._colorStackIndex=0,this._currentColor=0,this._renderer=e}buildStart(){this._colorStack[0]=15,this._colorStackIndex=1,this._currentColor=15}push(e,t,r){this._renderer.renderPipes.batch.break(r);const n=this._colorStack;n[this._colorStackIndex]=n[this._colorStackIndex-1]&e.mask;const i=this._colorStack[this._colorStackIndex];i!==this._currentColor&&(this._currentColor=i,r.add({renderPipeId:"colorMask",colorMask:i,canBundle:!1})),this._colorStackIndex++}pop(e,t,r){this._renderer.renderPipes.batch.break(r);const n=this._colorStack;this._colorStackIndex--;const i=n[this._colorStackIndex-1];i!==this._currentColor&&(this._currentColor=i,r.add({renderPipeId:"colorMask",colorMask:i,canBundle:!1}))}execute(e){this._renderer.colorMask.setMask(e.colorMask)}destroy(){this._colorStack=null}}le.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"colorMask"};class ue{constructor(e){this._maskStackHash={},this._maskHash=new WeakMap,this._renderer=e}push(e,t,r){var a;const n=e,i=this._renderer;i.renderPipes.batch.break(r),i.renderPipes.blendMode.setBlendMode(n.mask,"none",r),r.add({renderPipeId:"stencilMask",action:"pushMaskBegin",mask:e,canBundle:!1});const l=n.mask;l.includeInBuild=!0,this._maskHash.has(n)||this._maskHash.set(n,{instructionsStart:0,instructionsLength:0});const o=this._maskHash.get(n);o.instructionsStart=r.instructionSize,P(l,r,i.renderPipes),l.includeInBuild=!1,i.renderPipes.batch.break(r),r.add({renderPipeId:"stencilMask",action:"pushMaskEnd",mask:e,canBundle:!1});const d=r.instructionSize-o.instructionsStart-1;o.instructionsLength=d;const c=i.renderTarget.renderTarget.uid;(a=this._maskStackHash)[c]??(a[c]=0)}pop(e,t,r){const a=e,n=this._renderer;n.renderPipes.batch.break(r),n.renderPipes.blendMode.setBlendMode(a.mask,"none",r),r.add({renderPipeId:"stencilMask",action:"popMaskBegin",canBundle:!1});const i=this._maskHash.get(e);for(let l=0;l<i.instructionsLength;l++)r.instructions[r.instructionSize++]=r.instructions[i.instructionsStart++];r.add({renderPipeId:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){var t;const r=this._renderer,a=r.renderTarget.renderTarget.uid;let n=(t=this._maskStackHash)[a]??(t[a]=0);e.action==="pushMaskBegin"?(r.renderTarget.ensureDepthStencil(),r.stencil.setStencilMode(p.RENDERING_MASK_ADD,n),n++,r.colorMask.setMask(0)):e.action==="pushMaskEnd"?(r.stencil.setStencilMode(p.MASK_ACTIVE,n),r.colorMask.setMask(15)):e.action==="popMaskBegin"?(r.colorMask.setMask(0),n!==0?r.stencil.setStencilMode(p.RENDERING_MASK_REMOVE,n):(r.renderTarget.clear(null,B.STENCIL),r.stencil.setStencilMode(p.DISABLED,n)),n--):e.action==="popMaskEnd"&&(r.stencil.setStencilMode(p.MASK_ACTIVE,n),r.colorMask.setMask(15)),this._maskStackHash[a]=n}destroy(){this._renderer=null,this._maskStackHash=null,this._maskHash=null}}ue.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"stencilMask"};wt=function(s,e){for(const t in s.attributes){const r=s.attributes[t],a=e[t];a?(r.location??(r.location=a.location),r.format??(r.format=a.format),r.offset??(r.offset=a.offset),r.instance??(r.instance=a.instance)):Y(`Attribute ${t} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`)}st(s)};function st(s){const{buffers:e,attributes:t}=s,r={},a={};for(const n in e){const i=e[n];r[i.uid]=0,a[i.uid]=0}for(const n in t){const i=t[n];r[i.buffer.uid]+=W(i.format).stride}for(const n in t){const i=t[n];i.stride??(i.stride=r[i.buffer.uid]),i.start??(i.start=a[i.buffer.uid]),a[i.buffer.uid]+=W(i.format).stride}}T=[];T[p.NONE]=void 0;T[p.DISABLED]={stencilWriteMask:0,stencilReadMask:0};T[p.RENDERING_MASK_ADD]={stencilFront:{compare:"equal",passOp:"increment-clamp"},stencilBack:{compare:"equal",passOp:"increment-clamp"}};T[p.RENDERING_MASK_REMOVE]={stencilFront:{compare:"equal",passOp:"decrement-clamp"},stencilBack:{compare:"equal",passOp:"decrement-clamp"}};T[p.MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"equal",passOp:"keep"},stencilBack:{compare:"equal",passOp:"keep"}};St=class{constructor(e){this._syncFunctionHash=Object.create(null),this._adaptor=e,this._systemCheck()}_systemCheck(){if(!Fe())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}ensureUniformGroup(e){const t=this.getUniformGroupData(e);e.buffer||(e.buffer=new H({data:new Float32Array(t.layout.size/4),usage:k.UNIFORM|k.COPY_DST}))}getUniformGroupData(e){return this._syncFunctionHash[e._signature]||this._initUniformGroup(e)}_initUniformGroup(e){const t=e._signature;let r=this._syncFunctionHash[t];if(!r){const a=Object.keys(e.uniformStructures).map(l=>e.uniformStructures[l]),n=this._adaptor.createUboElements(a),i=this._generateUboSync(n.uboElements);r=this._syncFunctionHash[t]={layout:n,syncFunction:i}}return this._syncFunctionHash[t]}_generateUboSync(e){return this._adaptor.generateUboSync(e)}syncUniformGroup(e,t,r){const a=this.getUniformGroupData(e);return e.buffer||(e.buffer=new H({data:new Float32Array(a.layout.size/4),usage:k.UNIFORM|k.COPY_DST})),t||(t=e.buffer.data),r||(r=0),a.syncFunction(e.uniforms,t,r),!0}updateUniformGroup(e){if(e.isStatic&&!e._dirtyId)return!1;e._dirtyId=0;const t=this.syncUniformGroup(e);return e.buffer.update(),t}destroy(){this._syncFunctionHash=null}};M=[{type:"mat3x3<f32>",test:s=>s.value.a!==void 0,ubo:`
            var matrix = uv[name].toArray(true);
            data[offset] = matrix[0];
            data[offset + 1] = matrix[1];
            data[offset + 2] = matrix[2];
            data[offset + 4] = matrix[3];
            data[offset + 5] = matrix[4];
            data[offset + 6] = matrix[5];
            data[offset + 8] = matrix[6];
            data[offset + 9] = matrix[7];
            data[offset + 10] = matrix[8];
        `,uniform:` 
            gl.uniformMatrix3fv(ud[name].location, false, uv[name].toArray(true));
        `},{type:"vec4<f32>",test:s=>s.type==="vec4<f32>"&&s.size===1&&s.value.width!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
            data[offset + 2] = v.width;
            data[offset + 3] = v.height;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height) {
                cv[0] = v.x;
                cv[1] = v.y;
                cv[2] = v.width;
                cv[3] = v.height;
                gl.uniform4f(ud[name].location, v.x, v.y, v.width, v.height);
            }
        `},{type:"vec2<f32>",test:s=>s.type==="vec2<f32>"&&s.size===1&&s.value.x!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y) {
                cv[0] = v.x;
                cv[1] = v.y;
                gl.uniform2f(ud[name].location, v.x, v.y);
            }
        `},{type:"vec4<f32>",test:s=>s.type==="vec4<f32>"&&s.size===1&&s.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
            data[offset + 3] = v.alpha;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                cv[3] = v.alpha;
                gl.uniform4f(ud[name].location, v.red, v.green, v.blue, v.alpha);
            }
        `},{type:"vec3<f32>",test:s=>s.type==="vec3<f32>"&&s.size===1&&s.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                gl.uniform3f(ud[name].location, v.red, v.green, v.blue);
            }
        `}];Pt=function(s,e,t,r){const a=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
        var name = null;
        var arrayOffset = null;
    `];let n=0;for(let l=0;l<s.length;l++){const o=s[l],d=o.data.name;let c=!1,h=0;for(let f=0;f<M.length;f++)if(M[f].test(o.data)){h=o.offset/4,a.push(`name = "${d}";`,`offset += ${h-n};`,M[f][e]||M[f].ubo),c=!0;break}if(!c)if(o.data.size>1)h=o.offset/4,a.push(t(o,h-n));else{const f=r[o.data.type];h=o.offset/4,a.push(`
                    v = uv.${d};
                    offset += ${h-n};
                    ${f};
                `)}n=h}const i=a.join(`
`);return new Function("uv","data","offset",i)};function x(s,e){return`
        for (let i = 0; i < ${s*e}; i++) {
            data[offset + (((i / ${s})|0) * 4) + (i % ${s})] = v[i];
        }
    `}at={f32:`
        data[offset] = v;`,i32:`
        data[offset] = v;`,"vec2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];`,"vec3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];`,"vec4<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];`,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 4] = v[2];
        data[offset + 5] = v[3];`,"mat3x3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];`,"mat4x4<f32>":`
        for (let i = 0; i < 16; i++) {
            data[offset + i] = v[i];
        }`,"mat3x2<f32>":x(3,2),"mat4x2<f32>":x(4,2),"mat2x3<f32>":x(2,3),"mat4x3<f32>":x(4,3),"mat2x4<f32>":x(2,4),"mat3x4<f32>":x(3,4)};Rt={...at,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
    `};function nt(s,e,t,r,a,n){const i=n?1:-1;return s.identity(),s.a=1/r*2,s.d=i*(1/a*2),s.tx=-1-e*s.a,s.ty=-i-t*s.d,s}const v=new Map;function de(s,e){if(!v.has(s)){const t=new m({source:new U({resource:s,...e})}),r=()=>{v.get(s)===t&&v.delete(s)};t.once("destroy",r),t.source.once("destroy",r),v.set(s,t)}return v.get(s)}function it(s){const e=s.colorTexture.source.resource;return globalThis.HTMLCanvasElement&&e instanceof HTMLCanvasElement&&document.body.contains(e)}const ce=class he{constructor(e={}){if(this.uid=C("renderTarget"),this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._size=new Float32Array(2),this._managedColorTextures=!1,e={...he.defaultOptions,...e},this.stencil=e.stencil,this.depth=e.depth,this.isRoot=e.isRoot,typeof e.colorTextures=="number"){this._managedColorTextures=!0;for(let t=0;t<e.colorTextures;t++)this.colorTextures.push(new _({width:e.width,height:e.height,resolution:e.resolution,antialias:e.antialias}))}else{this.colorTextures=[...e.colorTextures.map(r=>r.source)];const t=this.colorTexture.source;this.resize(t.width,t.height,t._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),(e.depthStencilTexture||this.stencil)&&(e.depthStencilTexture instanceof m||e.depthStencilTexture instanceof _?this.depthStencilTexture=e.depthStencilTexture.source:this.ensureDepthStencilTexture())}get size(){const e=this._size;return e[0]=this.pixelWidth,e[1]=this.pixelHeight,e}get width(){return this.colorTexture.source.width}get height(){return this.colorTexture.source.height}get pixelWidth(){return this.colorTexture.source.pixelWidth}get pixelHeight(){return this.colorTexture.source.pixelHeight}get resolution(){return this.colorTexture.source._resolution}get colorTexture(){return this.colorTextures[0]}onSourceResize(e){this.resize(e.width,e.height,e._resolution,!0)}ensureDepthStencilTexture(){this.depthStencilTexture||(this.depthStencilTexture=new _({width:this.width,height:this.height,resolution:this.resolution,format:"depth24plus-stencil8",autoGenerateMipmaps:!1,antialias:!1,mipLevelCount:1}))}resize(e,t,r=this.resolution,a=!1){this.dirtyId++,this.colorTextures.forEach((n,i)=>{a&&i===0||n.source.resize(e,t,r)}),this.depthStencilTexture&&this.depthStencilTexture.source.resize(e,t,r)}destroy(){this.colorTexture.source.off("resize",this.onSourceResize,this),this._managedColorTextures&&this.colorTextures.forEach(e=>{e.destroy()}),this.depthStencilTexture&&(this.depthStencilTexture.destroy(),delete this.depthStencilTexture)}};ce.defaultOptions={width:0,height:0,resolution:1,colorTextures:1,stencil:!1,depth:!1,antialias:!1,isRoot:!1};let I=ce;Gt=class{constructor(e){this.rootViewPort=new w,this.viewport=new w,this.onRenderTargetChange=new Ee("onRenderTargetChange"),this.projectionMatrix=new g,this.defaultClearColor=[0,0,0,0],this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._renderer=e}finishRenderPass(){this.adaptor.finishRenderPass(this.renderTarget)}renderStart({target:e,clear:t,clearColor:r,frame:a}){this._renderTargetStack.length=0,this.push(e,t,r,a),this.rootViewPort.copyFrom(this.viewport),this.rootRenderTarget=this.renderTarget,this.renderingToScreen=it(this.rootRenderTarget)}bind(e,t=!0,r,a){const n=this.getRenderTarget(e),i=this.renderTarget!==n;this.renderTarget=n,this.renderSurface=e;const l=this.getGpuRenderTarget(n);(n.pixelWidth!==l.width||n.pixelHeight!==l.height)&&(this.adaptor.resizeGpuRenderTarget(n),l.width=n.pixelWidth,l.height=n.pixelHeight);const o=n.colorTexture,d=this.viewport,c=o.pixelWidth,h=o.pixelHeight;if(!a&&e instanceof m&&(a=e.frame),a){const f=o._resolution;d.x=a.x*f+.5|0,d.y=a.y*f+.5|0,d.width=a.width*f+.5|0,d.height=a.height*f+.5|0}else d.x=0,d.y=0,d.width=c,d.height=h;return nt(this.projectionMatrix,0,0,d.width/o.resolution,d.height/o.resolution,!n.isRoot),this.adaptor.startRenderPass(n,t,r,d),i&&this.onRenderTargetChange.emit(n),n}clear(e,t=B.ALL,r){t&&(e&&(e=this.getRenderTarget(e)),this.adaptor.clear(e||this.renderTarget,t,r,this.viewport))}contextChange(){this._gpuRenderTargetHash=Object.create(null)}push(e,t=B.ALL,r,a){const n=this.bind(e,t,r,a);return this._renderTargetStack.push({renderTarget:n,frame:a}),n}pop(){this._renderTargetStack.pop();const e=this._renderTargetStack[this._renderTargetStack.length-1];this.bind(e.renderTarget,!1,null,e.frame)}getRenderTarget(e){return e.isTexture&&(e=e.source),this._renderSurfaceToRenderTargetHash.get(e)??this._initRenderTarget(e)}copyToTexture(e,t,r,a,n){r.x<0&&(a.width+=r.x,n.x-=r.x,r.x=0),r.y<0&&(a.height+=r.y,n.y-=r.y,r.y=0);const{pixelWidth:i,pixelHeight:l}=e;return a.width=Math.min(a.width,i-r.x),a.height=Math.min(a.height,l-r.y),this.adaptor.copyToTexture(e,t,r,a,n)}ensureDepthStencil(){this.renderTarget.stencil||(this.renderTarget.stencil=!0,this.adaptor.startRenderPass(this.renderTarget,!1,null,this.viewport))}destroy(){this._renderer=null,this._renderSurfaceToRenderTargetHash.forEach((e,t)=>{e!==t&&e.destroy()}),this._renderSurfaceToRenderTargetHash.clear(),this._gpuRenderTargetHash=Object.create(null)}_initRenderTarget(e){let t=null;return U.test(e)&&(e=de(e)),e instanceof I?t=e:e instanceof _&&(t=new I({colorTextures:[e]}),U.test(e.source.resource)&&(t.isRoot=!0),e.once("destroy",()=>{t.destroy();const r=this._gpuRenderTargetHash[t.uid];r&&(this._gpuRenderTargetHash[t.uid]=null,this.adaptor.destroyGpuRenderTarget(r))})),this._renderSurfaceToRenderTargetHash.set(e,t),t}getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||(this._gpuRenderTargetHash[e.uid]=this.adaptor.initGpuRenderTarget(e))}};Bt=class extends De{constructor({buffer:e,offset:t,size:r}){super(),this.uid=C("buffer"),this._resourceType="bufferResource",this._touched=0,this._resourceId=C("resource"),this._bufferResource=!0,this.destroyed=!1,this.buffer=e,this.offset=t|0,this.size=r,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this._resourceId=C("resource"),this.emit("change",this)}destroy(e=!1){this.destroyed=!0,e&&this.buffer.destroy(),this.emit("change",this),this.buffer=null}};class fe{constructor(e){this._renderer=e}addRenderable(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&e.render(this._renderer)}destroy(){this._renderer=null}}fe.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"customRender"};function pe(s,e){const t=s.instructionSet,r=t.instructions;for(let a=0;a<t.instructionSize;a++){const n=r[a];e[n.renderPipeId].execute(n)}}class me{constructor(e){this._renderer=e}addRenderGroup(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&(this._renderer.globalUniforms.push({worldTransformMatrix:e.worldTransform,worldColor:e.worldColorAlpha}),pe(e,this._renderer.renderPipes),this._renderer.globalUniforms.pop())}destroy(){this._renderer=null}}me.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"renderGroup"};function ge(s,e=[]){e.push(s);for(let t=0;t<s.renderGroupChildren.length;t++)ge(s.renderGroupChildren[t],e);return e}function ot(s,e,t){const r=s>>16&255,a=s>>8&255,n=s&255,i=e>>16&255,l=e>>8&255,o=e&255,d=r+(i-r)*t,c=a+(l-a)*t,h=n+(o-n)*t;return(d<<16)+(c<<8)+h}const R=16777215;function xe(s,e){return s===R||e===R?s+e-R:ot(s,e,.5)}const lt=new S;function ve(s,e=!1){ut(s);const t=s.childrenToUpdate,r=s.updateTick;s.updateTick++;for(const a in t){const n=t[a],i=n.list,l=n.index;for(let o=0;o<l;o++)be(i[o],r,0);n.index=0}if(e)for(let a=0;a<s.renderGroupChildren.length;a++)ve(s.renderGroupChildren[a],e)}function ut(s){const e=s.root;let t;if(s.renderGroupParent){const r=s.renderGroupParent;s.worldTransform.appendFrom(e.relativeGroupTransform,r.worldTransform),s.worldColor=xe(e.groupColor,r.worldColor),t=e.groupAlpha*r.worldAlpha}else s.worldTransform.copyFrom(e.localTransform),s.worldColor=e.localColor,t=e.localAlpha;t=t<0?0:t>1?1:t,s.worldAlpha=t,s.worldColorAlpha=s.worldColor+((t*255|0)<<24)}function be(s,e,t){if(e===s.updateTick)return;s.updateTick=e,s.didChange=!1;const r=s.localTransform;s.updateLocalTransform();const a=s.parent;if(a&&!a.isRenderGroupRoot?(t=t|s._updateFlags,s.relativeGroupTransform.appendFrom(r,a.relativeGroupTransform),t&&j(s,a,t)):(t=s._updateFlags,s.relativeGroupTransform.copyFrom(r),t&&j(s,lt,t)),!s.isRenderGroupRoot){const n=s.children,i=n.length;for(let o=0;o<i;o++)be(n[o],e,t);const l=s.renderGroup;s.renderPipeId&&!l.structureDidChange&&l.updateRenderable(s)}}function j(s,e,t){if(t&Oe){s.groupColor=xe(s.localColor,e.groupColor);let r=s.localAlpha*e.groupAlpha;r=r<0?0:r>1?1:r,s.groupAlpha=r,s.groupColorAlpha=s.groupColor+((r*255|0)<<24)}t&ze&&(s.groupBlendMode=s.localBlendMode==="inherit"?e.groupBlendMode:s.localBlendMode),t&He&&(s.globalDisplayStatus=s.localDisplayStatus&e.globalDisplayStatus),s._updateFlags=0}function dt(s,e){const{list:t,index:r}=s.childrenRenderablesToUpdate;let a=!1;for(let n=0;n<r;n++){const i=t[n];if(a=e[i.renderPipeId].validateRenderable(i),a)break}return s.structureDidChange=a,a}const ct=new g;class _e{constructor(e){this._renderer=e}render({container:e,transform:t}){e.isRenderGroup=!0;const r=e.parent,a=e.renderGroup.renderGroupParent;e.parent=null,e.renderGroup.renderGroupParent=null;const n=this._renderer,i=ge(e.renderGroup,[]);let l=ct;t&&(l=l.copyFrom(e.renderGroup.localTransform),e.renderGroup.localTransform.copyFrom(t));const o=n.renderPipes;for(let d=0;d<i.length;d++){const c=i[d];c.runOnRender(),c.instructionSet.renderPipes=o,c.structureDidChange||dt(c,o),ve(c),c.structureDidChange?(c.structureDidChange=!1,Ze(c,o)):ht(c),c.childrenRenderablesToUpdate.index=0,n.renderPipes.batch.upload(c.instructionSet)}n.globalUniforms.start({worldTransformMatrix:t?e.renderGroup.localTransform:e.renderGroup.worldTransform,worldColor:e.renderGroup.worldColorAlpha}),pe(e.renderGroup,o),o.uniformBatch&&o.uniformBatch.renderEnd(),t&&e.renderGroup.localTransform.copyFrom(l),e.parent=r,e.renderGroup.renderGroupParent=a}destroy(){this._renderer=null}}_e.extension={type:[u.WebGLSystem,u.WebGPUSystem,u.CanvasSystem],name:"renderGroup"};function ht(s){const{list:e,index:t}=s.childrenRenderablesToUpdate;for(let r=0;r<t;r++){const a=e[r];a.didViewUpdate&&s.updateRenderable(a)}}class ye{constructor(e){this._gpuSpriteHash=Object.create(null),this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e._didSpriteUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r)}updateRenderable(e){const t=this._gpuSpriteHash[e.uid];e._didSpriteUpdate&&this._updateBatchableSprite(e,t),t.batcher.updateElement(t)}validateRenderable(e){const t=e._texture,r=this._getGpuSprite(e);return r.texture._source!==t._source?!r.batcher.checkAndUpdateTexture(r,t):!1}destroyRenderable(e){const t=this._gpuSpriteHash[e.uid];b.return(t),this._gpuSpriteHash[e.uid]=null}_updateBatchableSprite(e,t){e._didSpriteUpdate=!1,t.bounds=e.bounds,t.texture=e._texture}_getGpuSprite(e){return this._gpuSpriteHash[e.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=b.get(qe);return t.renderable=e,t.texture=e._texture,t.bounds=e.bounds,t.roundPixels=this._renderer._roundPixels|e._roundPixels,this._gpuSpriteHash[e.uid]=t,e._didSpriteUpdate=!1,e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuSpriteHash)b.return(this._gpuSpriteHash[e]);this._gpuSpriteHash=null,this._renderer=null}}ye.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"sprite"};const F=class Te{constructor(){this.clearBeforeRender=!0,this._backgroundColor=new J(0),this.color=this._backgroundColor,this.alpha=1}init(e){e={...Te.defaultOptions,...e},this.clearBeforeRender=e.clearBeforeRender,this.color=e.background||e.backgroundColor||this._backgroundColor,this.alpha=e.backgroundAlpha,this._backgroundColor.setAlpha(e.backgroundAlpha)}get color(){return this._backgroundColor}set color(e){this._backgroundColor.setValue(e)}get alpha(){return this._backgroundColor.alpha}set alpha(e){this._backgroundColor.setAlpha(e)}get colorRgba(){return this._backgroundColor.toArray()}destroy(){}};F.extension={type:[u.WebGLSystem,u.WebGPUSystem,u.CanvasSystem],name:"background",priority:0};F.defaultOptions={backgroundAlpha:1,backgroundColor:0,clearBeforeRender:!0};let ft=F;const y={};X.handle(u.BlendMode,s=>{if(!s.name)throw new Error("BlendMode extension must have a name property");y[s.name]=s.ref},s=>{delete y[s.name]});class ke{constructor(e){this._isAdvanced=!1,this._filterHash=Object.create(null),this._renderer=e}setBlendMode(e,t,r){if(this._activeBlendMode===t){this._isAdvanced&&this._renderableList.push(e);return}this._activeBlendMode=t,this._isAdvanced&&this._endAdvancedBlendMode(r),this._isAdvanced=!!y[t],this._isAdvanced&&(this._beginAdvancedBlendMode(r),this._renderableList.push(e))}_beginAdvancedBlendMode(e){this._renderer.renderPipes.batch.break(e);const t=this._activeBlendMode;if(!y[t]){Y(`Unable to assign BlendMode: '${t}'. You may want to include: import 'pixi.js/advanced-blend-modes'`);return}this._filterHash[t]||(this._filterHash[t]=new K({filters:[new y[t]]}));const r={renderPipeId:"filter",action:"pushFilter",renderables:[],filterEffect:this._filterHash[t],canBundle:!1};this._renderableList=r.renderables,e.add(r)}_endAdvancedBlendMode(e){this._renderableList=null,this._renderer.renderPipes.batch.break(e),e.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}buildStart(){this._isAdvanced=!1}buildEnd(e){this._isAdvanced&&this._endAdvancedBlendMode(e)}destroy(){this._renderer=null,this._renderableList=null;for(const e in this._filterHash)this._filterHash[e].destroy();this._filterHash=null}}ke.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"blendMode"};const G={png:"image/png",jpg:"image/jpeg",webp:"image/webp"},E=class Me{constructor(e){this._renderer=e}_normalizeOptions(e,t={}){return e instanceof S||e instanceof m?{target:e,...t}:{...t,...e}}async image(e){const t=new Image;return t.src=await this.base64(e),t}async base64(e){e=this._normalizeOptions(e,Me.defaultImageOptions);const{format:t,quality:r}=e,a=this.canvas(e);if(a.toBlob!==void 0)return new Promise((n,i)=>{a.toBlob(l=>{if(!l){i(new Error("ICanvas.toBlob failed!"));return}const o=new FileReader;o.onload=()=>n(o.result),o.onerror=i,o.readAsDataURL(l)},G[t],r)});if(a.toDataURL!==void 0)return a.toDataURL(G[t],r);if(a.convertToBlob!==void 0){const n=await a.convertToBlob({type:G[t],quality:r});return new Promise((i,l)=>{const o=new FileReader;o.onload=()=>i(o.result),o.onerror=l,o.readAsDataURL(n)})}throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented")}canvas(e){e=this._normalizeOptions(e);const t=e.target,r=this._renderer;if(t instanceof m)return r.texture.generateCanvas(t);const a=r.textureGenerator.generateTexture(e),n=r.texture.generateCanvas(a);return a.destroy(),n}pixels(e){e=this._normalizeOptions(e);const t=e.target,r=this._renderer,a=t instanceof m?t:r.textureGenerator.generateTexture(e),n=r.texture.getPixels(a);return t instanceof S&&a.destroy(),n}texture(e){return e=this._normalizeOptions(e),e.target instanceof m?e.target:this._renderer.textureGenerator.generateTexture(e)}download(e){e=this._normalizeOptions(e);const t=this.canvas(e),r=document.createElement("a");r.download=e.filename??"image.png",r.href=t.toDataURL("image/png"),document.body.appendChild(r),r.click(),document.body.removeChild(r)}log(e){const t=e.width??200;e=this._normalizeOptions(e);const r=this.canvas(e),a=r.toDataURL();console.log(`[Pixi Texture] ${r.width}px ${r.height}px`);const n=["font-size: 1px;",`padding: ${t}px 300px;`,`background: url(${a}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",n)}destroy(){this._renderer=null}};E.extension={type:[u.WebGLSystem,u.WebGPUSystem],name:"extract"};E.defaultImageOptions={format:"png",quality:1};let pt=E;class mt extends m{static create(e){return new m({source:new _(e)})}resize(e,t,r){return this.source.resize(e,t,r),this}}const gt=new w,xt=new q,vt=[0,0,0,0];class Ce{constructor(e){this._renderer=e}generateTexture(e){e instanceof S&&(e={target:e,frame:void 0,textureSourceOptions:{},resolution:void 0});const t=e.resolution||this._renderer.resolution,r=e.antialias||this._renderer.view.antialias,a=e.target;let n=e.clearColor;n?n=Array.isArray(n)&&n.length===4?n:J.shared.setValue(n).toArray():n=vt;const i=e.frame?.copyTo(gt)||Le(a,xt).rectangle;i.width=Math.max(i.width,1/t)|0,i.height=Math.max(i.height,1/t)|0;const l=mt.create({...e.textureSourceOptions,width:i.width,height:i.height,resolution:t,antialias:r}),o=g.shared.translate(-i.x,-i.y);return this._renderer.render({container:a,transform:o,target:l,clearColor:n}),l}destroy(){this._renderer=null}}Ce.extension={type:[u.WebGLSystem,u.WebGPUSystem],name:"textureGenerator"};class we{constructor(e){this._stackIndex=0,this._globalUniformDataStack=[],this._uniformsPool=[],this._activeUniforms=[],this._bindGroupPool=[],this._activeBindGroups=[],this._renderer=e}reset(){this._stackIndex=0;for(let e=0;e<this._activeUniforms.length;e++)this._uniformsPool.push(this._activeUniforms[e]);for(let e=0;e<this._activeBindGroups.length;e++)this._bindGroupPool.push(this._activeBindGroups[e]);this._activeUniforms.length=0,this._activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({size:e,projectionMatrix:t,worldTransformMatrix:r,worldColor:a,offset:n}){const i=this._renderer.renderTarget.renderTarget,l=this._stackIndex?this._globalUniformDataStack[this._stackIndex-1]:{projectionData:i,worldTransformMatrix:new g,worldColor:4294967295,offset:new We},o={projectionMatrix:t||this._renderer.renderTarget.projectionMatrix,resolution:e||i.size,worldTransformMatrix:r||l.worldTransformMatrix,worldColor:a||l.worldColor,offset:n||l.offset,bindGroup:null},d=this._uniformsPool.pop()||this._createUniforms();this._activeUniforms.push(d);const c=d.uniforms;c.uProjectionMatrix=o.projectionMatrix,c.uResolution=o.resolution,c.uWorldTransformMatrix.copyFrom(o.worldTransformMatrix),c.uWorldTransformMatrix.tx-=o.offset.x,c.uWorldTransformMatrix.ty-=o.offset.y,Ke(o.worldColor,c.uWorldColorAlpha,0),d.update();let h;this._renderer.renderPipes.uniformBatch?h=this._renderer.renderPipes.uniformBatch.getUniformBindGroup(d,!1):(h=this._bindGroupPool.pop()||new Ve,this._activeBindGroups.push(h),h.setResource(d,0)),o.bindGroup=h,this._currentGlobalUniformData=o}push(e){this.bind(e),this._globalUniformDataStack[this._stackIndex++]=this._currentGlobalUniformData}pop(){this._currentGlobalUniformData=this._globalUniformDataStack[--this._stackIndex-1],this._renderer.type===se.WEBGL&&this._currentGlobalUniformData.bindGroup.resources[0].update()}get bindGroup(){return this._currentGlobalUniformData.bindGroup}get uniformGroup(){return this._currentGlobalUniformData.bindGroup.resources[0]}_createUniforms(){return new re({uProjectionMatrix:{value:new g,type:"mat3x3<f32>"},uWorldTransformMatrix:{value:new g,type:"mat3x3<f32>"},uWorldColorAlpha:{value:new Float32Array(4),type:"vec4<f32>"},uResolution:{value:[0,0],type:"vec2<f32>"}},{isStatic:!0})}destroy(){this._renderer=null}}we.extension={type:[u.WebGLSystem,u.WebGPUSystem,u.CanvasSystem],name:"globalUniforms"};let $=!1;const N="8.1.1";function bt(s){if(!$){if(Q.get().getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){const e=[`%c  %c  %c  %c  %c PixiJS %c v${N} (${s}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${N} - ${s} - http://www.pixijs.com/`);$=!0}}class D{constructor(e){this._renderer=e}init(e){if(e.hello){let t=this._renderer.name;this._renderer.type===se.WEBGL&&(t+=` ${this._renderer.context.webGLVersion}`),bt(t)}}}D.extension={type:[u.WebGLSystem,u.WebGPUSystem,u.CanvasSystem],name:"hello",priority:-2};D.defaultOptions={hello:!1};const O=class Se{constructor(e){this._renderer=e,this.count=0,this.checkCount=0}init(e){e={...Se.defaultOptions,...e},this.checkCountMax=e.textureGCCheckCountMax,this.maxIdle=e.textureGCAMaxIdle,this.active=e.textureGCActive}postrender(){this._renderer.renderingToScreen&&(this.count++,this.active&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())))}run(){const e=this._renderer.texture.managedTextures;for(let t=0;t<e.length;t++){const r=e[t];r.autoGarbageCollect&&r.resource&&r._touched>-1&&this.count-r._touched>this.maxIdle&&(r._touched=-1,r.unload())}}destroy(){this._renderer=null}};O.extension={type:[u.WebGLSystem,u.WebGPUSystem],name:"textureGC"};O.defaultOptions={textureGCActive:!0,textureGCAMaxIdle:60*60,textureGCCheckCountMax:600};let Pe=O;X.add(Pe);const z=class Re{get resolution(){return this.texture.source._resolution}set resolution(e){this.texture.source.resize(this.texture.source.width,this.texture.source.height,e)}init(e){e={...Re.defaultOptions,...e},e.view&&(je($e,"ViewSystem.view has been renamed to ViewSystem.canvas"),e.canvas=e.view),this.screen=new w(0,0,e.width,e.height),this.canvas=e.canvas||Q.get().createCanvas(),this.antialias=!!e.antialias,this.texture=de(this.canvas,e),this.renderTarget=new I({colorTextures:[this.texture],depth:!!e.depth,isRoot:!0}),this.texture.source.transparent=e.backgroundAlpha<1,this.multiView=!!e.multiView,this.autoDensity&&(this.canvas.style.width=`${this.texture.width}px`,this.canvas.style.height=`${this.texture.height}px`),this.resolution=e.resolution}resize(e,t,r){this.texture.source.resize(e,t,r),this.screen.width=this.texture.frame.width,this.screen.height=this.texture.frame.height,this.autoDensity&&(this.canvas.style.width=`${e}px`,this.canvas.style.height=`${t}px`)}destroy(e=!1){(typeof e=="boolean"?e:!!e?.removeView)&&this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}};z.extension={type:[u.WebGLSystem,u.WebGPUSystem,u.CanvasSystem],name:"view",priority:0};z.defaultOptions={width:800,height:600,autoDensity:!1,antialias:!1};let _t=z;Ut=[ft,we,D,_t,_e,Pe,Ce,pt];At=[ke,ne,ye,me,oe,ue,le,fe]});export{Bt as B,T as G,Gt as R,Ut as S,St as U,At as a,at as b,Pt as c,M as d,wt as e,Ct as f,Mt as t,Rt as u,__tla};