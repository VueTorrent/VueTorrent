import{M as k,a1 as v,a2 as T,k as _,b as B,c as O,O as M,J as A,T as b,aj as U,R as E,w as z,t as P}from"./TorrentDetail-p5n2Hm69.js";import{c as Y}from"./canvasUtils-BywETciD.js";import{C as V}from"./CanvasPool-NcOHUwSv.js";import{F as X}from"./Filter-LttXHwd8.js";import"./vue-CbYrAKTS.js";import"./ColoredChip.vue_vue_type_script_setup_true_lang-a6QrynSg.js";import"./index-B1Fvoqm-.js";import"./vuetify-BKC-FDoy.js";import"./VForm-MAqBvc1X.js";import"./index-C-i6HdCE.js";import"./VEmptyState-4U_qaX9N.js";import"./VDataTable-DfisEmwi.js";import"./VPagination-Mz-fA4T7.js";import"./VTabs-CcdMHmKB.js";const y=new k;function G(h,e){e.clear();const t=e.matrix;for(let r=0;r<h.length;r++){const i=h[r];if(i.globalDisplayStatus<7)continue;const s=i.renderGroup??i.parentRenderGroup;s?.isCachedAsTexture?e.matrix=y.copyFrom(s.textureOffsetInverseTransform).append(i.worldTransform):s?._parentCacheAsTextureRenderGroup?e.matrix=y.copyFrom(s._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(i.groupTransform):e.matrix=i.worldTransform,e.addBounds(i.bounds)}return e.matrix=t,e}const q=new v;function L(h,e,t,r,i=!1){const s=q;s.minX=0,s.minY=0,s.maxX=h.width/r|0,s.maxY=h.height/r|0;const n=T.getOptimalTexture(s.width,s.height,r,!1,i);return n.source.uploadMethodId="image",n.source.resource=h,n.source.alphaMode="premultiply-alpha-on-upload",n.frame.width=e/r,n.frame.height=t/r,n.source.emit("update",n.source),n.updateUvs(),n}function S(h){return typeof h.getCanvasFilterString=="function"}class W{constructor(){this.skip=!1,this.useClip=!1,this.filters=null,this.container=null,this.bounds=new v,this.cssFilterString=""}}class R{constructor(e){this._filterStack=[],this._filterStackIndex=0,this._savedStates=[],this._alphaMultiplier=1,this._warnedFilterTypes=new Set,this.renderer=e}push(e){const t=this._pushFilterFrame(),r=e.filterEffect.filters;if(t.skip=!1,t.useClip=!1,t.filters=r,t.container=e.container,t.cssFilterString="",r.every(o=>!o.enabled)){t.skip=!0;return}const i=[],s=1;for(const o of r){if(!o.enabled)continue;if(!S(o)){this._warnUnsupportedFilter(o);continue}const l=o.getCanvasFilterString();if(l===null){this._warnUnsupportedFilter(o);continue}l&&i.push(l)}if(i.length===0&&s===1){t.skip=!0;return}t.cssFilterString=i.join(" "),this._calculateFilterArea(e,t.bounds),t.useClip=!!e.filterEffect.filterArea;const n=this.renderer.canvasContext.activeContext,a=n.filter||"none";if(this._savedStates.push({filter:a,alphaMultiplier:this._alphaMultiplier}),t.useClip&&Number.isFinite(t.bounds.width)&&Number.isFinite(t.bounds.height)&&t.bounds.width>0&&t.bounds.height>0){const o=this.renderer.canvasContext.activeResolution||1;n.save(),n.setTransform(1,0,0,1,0,0),n.beginPath(),n.rect(t.bounds.x*o,t.bounds.y*o,t.bounds.width*o,t.bounds.height*o),n.clip()}else t.useClip=!1;t.cssFilterString&&(n.filter=a!=="none"?`${a} ${t.cssFilterString}`:t.cssFilterString)}pop(){const e=this._popFilterFrame();if(e.skip)return;const t=this._savedStates.pop();if(!t)return;const r=this.renderer.canvasContext.activeContext;e.useClip?r.restore():r.filter=t.filter,this._alphaMultiplier=t.alphaMultiplier}generateFilteredTexture({texture:e,filters:t}){if(!t?.length||t.every(d=>!d.enabled))return e;const r=[],i=1;for(const d of t){if(!d.enabled)continue;if(!S(d)){this._warnUnsupportedFilter(d);continue}const m=d.getCanvasFilterString();if(m===null){this._warnUnsupportedFilter(d);continue}m&&r.push(m)}if(r.length===0&&i===1)return e;const s=Y.getCanvasSource(e);if(!s)return e;const n=e.frame,a=e.source._resolution??e.source.resolution??1,o=n.width,l=n.height,f=V.getOptimalCanvasAndContext(o,l,a),{canvas:c,context:u}=f;u.setTransform(1,0,0,1,0,0),u.clearRect(0,0,c.width,c.height),r.length&&(u.filter=r.join(" "));const p=n.x*a,x=n.y*a,g=o*a,F=l*a;return u.drawImage(s,p,x,g,F,0,0,g,F),u.filter="none",u.globalAlpha=1,L(c,o,l,a)}_calculateFilterArea(e,t){if(e.renderables?G(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const i=(e.container.renderGroup||e.container.parentRenderGroup)?.cacheToLocalTransform;i&&t.applyMatrix(i)}}_warnUnsupportedFilter(e){const t=e?.constructor?.name||"Filter";this._warnedFilterTypes.has(t)||(this._warnedFilterTypes.add(t),console.warn(`CanvasRenderer: filter "${t}" is not supported in Canvas2D and will be skipped.`))}get alphaMultiplier(){return this._alphaMultiplier}_pushFilterFrame(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new W),this._filterStackIndex++,e}_popFilterFrame(){return this._filterStackIndex<=0?this._filterStack[0]:(this._filterStackIndex--,this._filterStack[this._filterStackIndex])}destroy(){this._filterStack=null,this._savedStates=null,this._warnedFilterTypes=null,this._alphaMultiplier=1}}R.extension={type:[_.CanvasSystem],name:"filter"};var j=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,N=`in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
void main() {
    finalColor = texture(uTexture, vTextureCoord);
}
`,w=`struct GlobalFilterUniforms {
  uInputSize: vec4<f32>,
  uInputPixel: vec4<f32>,
  uInputClamp: vec4<f32>,
  uOutputFrame: vec4<f32>,
  uGlobalFrame: vec4<f32>,
  uOutputTexture: vec4<f32>,
};

@group(0) @binding(0) var <uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;

struct VSOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>
};

fn filterVertexPosition(aPosition: vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord(aPosition: vec2<f32>) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition: vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {
    return textureSample(uTexture, uSampler, uv);
}
`;class $ extends X{constructor(){const e=B.from({vertex:{source:w,entryPoint:"mainVertex"},fragment:{source:w,entryPoint:"mainFragment"},name:"passthrough-filter"}),t=O.from({vertex:j,fragment:N,name:"passthrough-filter"});super({gpuProgram:e,glProgram:t})}}class C{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}C.extension={type:[_.WebGLPipes,_.WebGPUPipes,_.CanvasPipes],name:"filter"};const H=new U({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class J{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new v,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0},this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}}class I{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new M({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new A({}),this.renderer=e}get activeBackTexture(){return this._activeFilterData?.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,i=this._pushFilterData();i.skip=!1,i.filters=r,i.container=e.container,i.outputRenderSurface=t.renderTarget.renderSurface;const s=t.renderTarget.renderTarget.colorTexture.source,n=s.resolution,a=s.antialias;if(r.every(p=>!p.enabled)){i.skip=!0;return}const o=i.bounds;if(this._calculateFilterArea(e,o),this._calculateFilterBounds(i,t.renderTarget.rootViewPort,a,n,1),i.skip)return;const l=this._getPreviousFilterData(),f=this._findFilterResolution(n);let c=0,u=0;l&&(c=l.bounds.minX,u=l.bounds.minY),this._calculateGlobalFrame(i,c,u,f,s.width,s.height),this._setupFilterTextures(i,o,t,l)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const i=e.source,s=i.resolution,n=i.antialias;if(t.every(p=>!p.enabled))return r.skip=!0,e;const a=r.bounds;if(a.addRect(e.frame),this._calculateFilterBounds(r,a.rectangle,n,s,0),r.skip)return e;const o=s;this._calculateGlobalFrame(r,0,0,o,i.width,i.height),r.outputRenderSurface=T.getOptimalTexture(a.width,a.height,r.resolution,r.antialias),r.backTexture=b.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const u=r.outputRenderSurface;return u.source.alphaMode="premultiplied-alpha",u}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&T.returnTexture(t.backTexture),T.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const i=e.colorTexture.source._resolution,s=T.getOptimalTexture(t.width,t.height,i,!1);let n=t.minX,a=t.minY;r&&(n-=r.minX,a-=r.minY),n=Math.floor(n*i),a=Math.floor(a*i);const o=Math.ceil(t.width*i),l=Math.ceil(t.height*i);return this.renderer.renderTarget.copyToTexture(e,s,{x:n,y:a},{width:o,height:l},{x:0,y:0}),s}applyFilter(e,t,r,i){const s=this.renderer,n=this._activeFilterData,o=n.outputRenderSurface===r,l=s.renderTarget.rootRenderTarget.colorTexture.source._resolution,f=this._findFilterResolution(l);let c=0,u=0;if(o){const x=this._findPreviousFilterOffset();c=x.x,u=x.y}this._updateFilterUniforms(t,r,n,c,u,f,o,i);const p=e.enabled?e:this._getPassthroughFilter();this._setupBindGroupsAndRender(p,t,s)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,i=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),s=t.worldTransform.copyTo(k.shared),n=t.renderGroup||t.parentRenderGroup;return n&&n.cacheToLocalTransform&&s.prepend(n.cacheToLocalTransform),s.invert(),i.prepend(s),i.scale(1/t.texture.orig.width,1/t.texture.orig.height),i.translate(t.anchor.x,t.anchor.y),i}destroy(){this._passthroughFilter?.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){return this._passthroughFilter??(this._passthroughFilter=new $),this._passthroughFilter}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const i=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(i,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:H,shader:e,state:e._state,topology:"triangle-list"}),r.type===E.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,i){if(e.backTexture=b.EMPTY,e.inputTexture=T.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),e.blendRequired){r.renderTarget.finishRenderPass();const s=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(s,t,i?.bounds)}r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,i,s,n){const a=e.globalFrame;a.x=t*i,a.y=r*i,a.width=s*i,a.height=n*i}_updateFilterUniforms(e,t,r,i,s,n,a,o){const l=this._filterGlobalUniforms.uniforms,f=l.uOutputFrame,c=l.uInputSize,u=l.uInputPixel,p=l.uInputClamp,x=l.uGlobalFrame,g=l.uOutputTexture;a?(f[0]=r.bounds.minX-i,f[1]=r.bounds.minY-s):(f[0]=0,f[1]=0),f[2]=e.frame.width,f[3]=e.frame.height,c[0]=e.source.width,c[1]=e.source.height,c[2]=1/c[0],c[3]=1/c[1],u[0]=e.source.pixelWidth,u[1]=e.source.pixelHeight,u[2]=1/u[0],u[3]=1/u[1],p[0]=.5*u[2],p[1]=.5*u[3],p[2]=e.frame.width*c[2]-.5*u[2],p[3]=e.frame.height*c[3]-.5*u[3];const F=this.renderer.renderTarget.rootRenderTarget.colorTexture;x[0]=i*n,x[1]=s*n,x[2]=F.source.width*n,x[3]=F.source.height*n,t instanceof b&&(t.source.resource=null);const d=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!o),t instanceof b?(g[0]=t.frame.width,g[1]=t.frame.height):(g[0]=d.width,g[1]=d.height),g[2]=d.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const i=this._filterStack[r];if(!i.skip){e=i.bounds.minX,t=i.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?G(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const i=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;i&&t.applyMatrix(i)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,i=e.bounds,s=e.filters,n=e.firstEnabledIndex,a=e.lastEnabledIndex;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),n===a)s[n].apply(this,r,e.outputRenderSurface,t);else{let o=e.inputTexture;const l=T.getOptimalTexture(i.width,i.height,o.source._resolution,!1);let f=l;for(let c=n;c<a;c++){const u=s[c];if(!u.enabled)continue;u.apply(this,o,f,!0);const p=o;o=f,f=p}s[a].apply(this,o,e.outputRenderSurface,t),T.returnTexture(l)}}_calculateFilterBounds(e,t,r,i,s){const n=this.renderer,a=e.bounds,o=e.filters;let l=1/0,f=0,c=!0,u=!1,p=!1,x=!0,g=-1,F=-1;for(let d=0;d<o.length;d++){const m=o[d];if(!m.enabled)continue;if(g===-1&&(g=d),F=d,l=Math.min(l,m.resolution==="inherit"?i:m.resolution),f+=m.padding,m.antialias==="off"?c=!1:m.antialias==="inherit"&&c&&(c=r),m.clipToViewport||(x=!1),!!!(m.compatibleRenderers&n.type)){p=!1;break}if(m.blendRequired&&!(n.backBuffer?.useBackBuffer??!0)){z("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),p=!1;break}p=!0,u||(u=m.blendRequired)}if(!p){e.skip=!0;return}if(x&&a.fitBounds(0,t.width/i,0,t.height/i),a.scale(l).ceil().scale(1/l).pad((f|0)*s),!a.isPositive){e.skip=!0;return}e.antialias=c,e.resolution=l,e.blendRequired=u,e.firstEnabledIndex=g,e.lastEnabledIndex=F}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new J),this._filterStackIndex++,e}}I.extension={type:[_.WebGLSystem,_.WebGPUSystem],name:"filter"};P.add(I,R);P.add(C);
