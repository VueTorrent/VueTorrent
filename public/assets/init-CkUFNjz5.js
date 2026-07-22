import{B as e,C as t,K as n,Z as r,c as i,f as a,i as o,l as s,nt as c,s as l,t as u,tt as d,u as f,w as p}from"./Geometry-xJRibxsg.js";import{t as m}from"./canvasUtils-CI1jllAo.js";import{t as h}from"./CanvasPool-CGLRQC8-.js";var g=new r;function _(e,t){t.clear();let n=t.matrix;for(let n=0;n<e.length;n++){let r=e[n];if(r.globalDisplayStatus<7)continue;let i=r.renderGroup??r.parentRenderGroup;i?.isCachedAsTexture?t.matrix=g.copyFrom(i.textureOffsetInverseTransform).append(r.worldTransform):i?._parentCacheAsTextureRenderGroup?t.matrix=g.copyFrom(i._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(r.groupTransform):t.matrix=r.worldTransform,t.addBounds(r.bounds)}return t.matrix=n,t}var v=new e;function y(e,n,r,i,a=!1){let o=v;o.minX=0,o.minY=0,o.maxX=e.width/i|0,o.maxY=e.height/i|0;let s=t.getOptimalTexture(o.width,o.height,i,!1,a);return s.source.uploadMethodId=`image`,s.source.resource=e,s.source.alphaMode=`premultiply-alpha-on-upload`,s.frame.width=n/i,s.frame.height=r/i,s.source.emit(`update`,s.source),s.updateUvs(),s}function b(e){return typeof e.getCanvasFilterString==`function`}var x=class{constructor(){this.skip=!1,this.useClip=!1,this.filters=null,this.container=null,this.bounds=new e,this.cssFilterString=``}},S=class{constructor(e){this._filterStack=[],this._filterStackIndex=0,this._savedStates=[],this._alphaMultiplier=1,this._warnedFilterTypes=new Set,this.renderer=e}push(e){let t=this._pushFilterFrame(),n=e.filterEffect.filters;if(t.skip=!1,t.useClip=!1,t.filters=n,t.container=e.container,t.cssFilterString=``,n.every(e=>!e.enabled)){t.skip=!0;return}let r=[];for(let e of n){if(!e.enabled)continue;if(!b(e)){this._warnUnsupportedFilter(e);continue}let t=e.getCanvasFilterString();if(t===null){this._warnUnsupportedFilter(e);continue}t&&r.push(t)}if(r.length===0){t.skip=!0;return}t.cssFilterString=r.join(` `),this._calculateFilterArea(e,t.bounds),t.useClip=!!e.filterEffect.filterArea;let i=this.renderer.canvasContext.activeContext,a=i.filter||`none`;if(this._savedStates.push({filter:a,alphaMultiplier:this._alphaMultiplier}),t.useClip&&Number.isFinite(t.bounds.width)&&Number.isFinite(t.bounds.height)&&t.bounds.width>0&&t.bounds.height>0){let e=this.renderer.canvasContext.activeResolution||1;i.save(),i.setTransform(1,0,0,1,0,0),i.beginPath(),i.rect(t.bounds.x*e,t.bounds.y*e,t.bounds.width*e,t.bounds.height*e),i.clip()}else t.useClip=!1;t.cssFilterString&&(i.filter=a===`none`?t.cssFilterString:`${a} ${t.cssFilterString}`)}pop(){let e=this._popFilterFrame();if(e.skip)return;let t=this._savedStates.pop();if(!t)return;let n=this.renderer.canvasContext.activeContext;e.useClip?n.restore():n.filter=t.filter,this._alphaMultiplier=t.alphaMultiplier}generateFilteredTexture({texture:e,filters:t}){if(!t?.length||t.every(e=>!e.enabled))return e;let n=[];for(let e of t){if(!e.enabled)continue;if(!b(e)){this._warnUnsupportedFilter(e);continue}let t=e.getCanvasFilterString();if(t===null){this._warnUnsupportedFilter(e);continue}t&&n.push(t)}if(n.length===0)return e;let r=m.getCanvasSource(e);if(!r)return e;let i=e.frame,a=e.source._resolution??e.source.resolution??1,o=i.width,s=i.height,{canvas:c,context:l}=h.getOptimalCanvasAndContext(o,s,a);l.setTransform(1,0,0,1,0,0),l.clearRect(0,0,c.width,c.height),n.length&&(l.filter=n.join(` `));let u=i.x*a,d=i.y*a,f=o*a,p=s*a;return l.drawImage(r,u,d,f,p,0,0,f,p),l.filter=`none`,l.globalAlpha=1,y(c,o,s,a)}_calculateFilterArea(e,t){if(e.renderables?_(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){let n=(e.container.renderGroup||e.container.parentRenderGroup)?.cacheToLocalTransform;n&&t.applyMatrix(n)}}_warnUnsupportedFilter(e){let t=e?.constructor?.name||`Filter`;this._warnedFilterTypes.has(t)||(this._warnedFilterTypes.add(t),console.warn(`CanvasRenderer: filter "${t}" is not supported in Canvas2D and will be skipped.`))}get alphaMultiplier(){return this._alphaMultiplier}_pushFilterFrame(){let e=this._filterStack[this._filterStackIndex];return e||=this._filterStack[this._filterStackIndex]=new x,this._filterStackIndex++,e}_popFilterFrame(){return this._filterStackIndex<=0?this._filterStack[0]:(this._filterStackIndex--,this._filterStack[this._filterStackIndex])}destroy(){this._filterStack=null,this._savedStates=null,this._warnedFilterTypes=null,this._alphaMultiplier=1}};S.extension={type:[d.CanvasSystem],name:`filter`};var C=class{constructor(e){this._renderer=e}push(e,t,n){this._renderer.renderPipes.batch.break(n),n.add({renderPipeId:`filter`,canBundle:!1,action:`pushFilter`,container:t,filterEffect:e})}pop(e,t,n){this._renderer.renderPipes.batch.break(n),n.add({renderPipeId:`filter`,action:`popFilter`,canBundle:!1})}execute(e){e.action===`pushFilter`?this._renderer.filter.push(e):e.action===`popFilter`&&this._renderer.filter.pop()}destroy(){this._renderer=null}};C.extension={type:[d.WebGLPipes,d.WebGPUPipes,d.CanvasPipes],name:`filter`};var w=`in vec2 aPosition;
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
`,T=`in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
void main() {
    finalColor = texture(uTexture, vTextureCoord);
}
`,E=`struct GlobalFilterUniforms {
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
`,D=class extends o{constructor(){let e=f.from({vertex:{source:E,entryPoint:`mainVertex`},fragment:{source:E,entryPoint:`mainFragment`},name:`passthrough-filter`}),t=a.from({vertex:w,fragment:T,name:`passthrough-filter`});super({gpuProgram:e,glProgram:t})}},O=new u({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:`float32x2`,stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])}),k=class{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new e,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0},this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}},A=class{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new l({uInputSize:{value:new Float32Array(4),type:`vec4<f32>`},uInputPixel:{value:new Float32Array(4),type:`vec4<f32>`},uInputClamp:{value:new Float32Array(4),type:`vec4<f32>`},uOutputFrame:{value:new Float32Array(4),type:`vec4<f32>`},uGlobalFrame:{value:new Float32Array(4),type:`vec4<f32>`},uOutputTexture:{value:new Float32Array(4),type:`vec4<f32>`}}),this._globalFilterBindGroup=new s({}),this.renderer=e}get activeBackTexture(){return this._activeFilterData?.backTexture}push(e){let t=this.renderer,n=e.filterEffect.filters,r=this._pushFilterData();r.skip=!1,r.filters=n,r.container=e.container,r.outputRenderSurface=t.renderTarget.renderSurface;let i=t.renderTarget.renderTarget.colorTexture.source,a=i.resolution,o=i.antialias;if(n.every(e=>!e.enabled)){r.skip=!0;return}let s=r.bounds;if(this._calculateFilterArea(e,s),this._calculateFilterBounds(r,t.renderTarget.rootViewPort,o,a,1),r.skip)return;let c=this._getPreviousFilterData(),l=this._findFilterResolution(a),u=0,d=0;c&&(u=c.bounds.minX,d=c.bounds.minY),this._calculateGlobalFrame(r,u,d,l,i.width,i.height),this._setupFilterTextures(r,s,t,c)}generateFilteredTexture({texture:e,filters:n}){let r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=n;let i=e.source,a=i.resolution,o=i.antialias;if(n.every(e=>!e.enabled))return r.skip=!0,e;let s=r.bounds;if(s.addRect(e.frame),this._calculateFilterBounds(r,s.rectangle,o,a,0),r.skip)return e;let c=a;this._calculateGlobalFrame(r,0,0,c,i.width,i.height),r.outputRenderSurface=t.getOptimalTexture(s.width,s.height,r.resolution,r.antialias),r.backTexture=p.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);let l=r.outputRenderSurface;return l.source.alphaMode=`premultiplied-alpha`,l}pop(){let e=this.renderer,n=this._popFilterData();n.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=n,this._applyFiltersToTexture(n,!1),n.blendRequired&&t.returnTexture(n.backTexture),t.returnTexture(n.inputTexture))}getBackTexture(e,n,r){let i=e.colorTexture.source._resolution,a=t.getOptimalTexture(n.width,n.height,i,!1),o=n.minX,s=n.minY;r&&(o-=r.minX,s-=r.minY),o=Math.floor(o*i),s=Math.floor(s*i);let c=Math.ceil(n.width*i),l=Math.ceil(n.height*i);return this.renderer.renderTarget.copyToTexture(e,a,{x:o,y:s},{width:c,height:l},{x:0,y:0}),a}applyFilter(e,t,n,r){let i=this.renderer,a=this._activeFilterData,o=a.outputRenderSurface===n,s=i.renderTarget.rootRenderTarget.colorTexture.source._resolution,c=this._findFilterResolution(s),l=0,u=0;if(o){let e=this._findPreviousFilterOffset();l=e.x,u=e.y}this._updateFilterUniforms(t,n,a,l,u,c,o,r);let d=e.enabled?e:this._getPassthroughFilter();this._setupBindGroupsAndRender(d,t,i)}calculateSpriteMatrix(e,t){let n=this._activeFilterData,i=e.set(n.inputTexture._source.width,0,0,n.inputTexture._source.height,n.bounds.minX,n.bounds.minY),a=t.worldTransform.copyTo(r.shared),o=t.renderGroup||t.parentRenderGroup;return o&&o.cacheToLocalTransform&&a.prepend(o.cacheToLocalTransform),a.invert(),i.prepend(a),i.scale(1/t.texture.orig.width,1/t.texture.orig.height),i.translate(t.anchor.x,t.anchor.y),i}destroy(){this._passthroughFilter?.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){return this._passthroughFilter??=new D,this._passthroughFilter}_setupBindGroupsAndRender(e,t,n){if(n.renderPipes.uniformBatch){let e=n.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(e,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,n.encoder.draw({geometry:O,shader:e,state:e._state,topology:`triangle-list`}),n.type===i.WEBGL&&n.renderTarget.finishRenderPass()}_setupFilterTextures(e,n,r,i){if(e.backTexture=p.EMPTY,e.inputTexture=t.getOptimalTexture(n.width,n.height,e.resolution,e.antialias),e.blendRequired){r.renderTarget.finishRenderPass();let t=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(t,n,i?.bounds)}r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:n})}_calculateGlobalFrame(e,t,n,r,i,a){let o=e.globalFrame;o.x=t*r,o.y=n*r,o.width=i*r,o.height=a*r}_updateFilterUniforms(e,t,n,r,i,a,o,s){let c=this._filterGlobalUniforms.uniforms,l=c.uOutputFrame,u=c.uInputSize,d=c.uInputPixel,f=c.uInputClamp,m=c.uGlobalFrame,h=c.uOutputTexture;o?(l[0]=n.bounds.minX-r,l[1]=n.bounds.minY-i):(l[0]=0,l[1]=0),l[2]=e.frame.width,l[3]=e.frame.height,u[0]=e.source.width,u[1]=e.source.height,u[2]=1/u[0],u[3]=1/u[1],d[0]=e.source.pixelWidth,d[1]=e.source.pixelHeight,d[2]=1/d[0],d[3]=1/d[1],f[0]=.5*d[2],f[1]=.5*d[3],f[2]=e.frame.width*u[2]-.5*d[2],f[3]=e.frame.height*u[3]-.5*d[3];let g=this.renderer.renderTarget.rootRenderTarget.colorTexture;m[0]=r*a,m[1]=i*a,m[2]=g.source.width*a,m[3]=g.source.height*a,t instanceof p&&(t.source.resource=null);let _=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!s),t instanceof p?(h[0]=t.frame.width,h[1]=t.frame.height):(h[0]=_.width,h[1]=_.height),h[2]=_.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,n=this._filterStackIndex;for(;n>0;){n--;let r=this._filterStack[n];if(!r.skip){e=r.bounds.minX,t=r.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?_(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){let n=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;n&&t.applyMatrix(n)}}_applyFiltersToTexture(e,n){let r=e.inputTexture,i=e.bounds,a=e.filters,o=e.firstEnabledIndex,s=e.lastEnabledIndex;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),o===s)a[o].apply(this,r,e.outputRenderSurface,n);else{let r=e.inputTexture,c=t.getOptimalTexture(i.width,i.height,r.source._resolution,!1),l=c;for(let e=o;e<s;e++){let t=a[e];if(!t.enabled)continue;t.apply(this,r,l,!0);let n=r;r=l,l=n}a[s].apply(this,r,e.outputRenderSurface,n),t.returnTexture(c)}}_calculateFilterBounds(e,t,r,i,a){let o=this.renderer,s=e.bounds,c=e.filters,l=1/0,u=0,d=!0,f=!1,p=!1,m=!0,h=-1,g=-1;for(let e=0;e<c.length;e++){let t=c[e];if(t.enabled){if(h===-1&&(h=e),g=e,l=Math.min(l,t.resolution===`inherit`?i:t.resolution),u+=t.padding,t.antialias===`off`?d=!1:t.antialias===`inherit`&&(d&&=r),t.clipToViewport||(m=!1),!(t.compatibleRenderers&o.type)){p=!1;break}if(t.blendRequired&&!(o.backBuffer?.useBackBuffer??!0)){n("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),p=!1;break}p=!0,f||=t.blendRequired}}if(!p){e.skip=!0;return}if(m&&s.fitBounds(0,t.width/i,0,t.height/i),s.scale(l).ceil().scale(1/l).pad((u|0)*a),!s.isPositive){e.skip=!0;return}e.antialias=d,e.resolution=l,e.blendRequired=f,e.firstEnabledIndex=h,e.lastEnabledIndex=g}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||=this._filterStack[this._filterStackIndex]=new k,this._filterStackIndex++,e}};A.extension={type:[d.WebGLSystem,d.WebGPUSystem],name:`filter`},c.add(A,S),c.add(C);