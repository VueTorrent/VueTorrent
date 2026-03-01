import{G as R,b as S,j as b,M as P,O as I,J as B,a2 as T,T as _,aj as O,R as A,w as C,a1 as E,q as k}from"./TorrentDetail-DVzCxa1X.js";import{F as z}from"./Filter-tcDF7B2j.js";import"./vue-DmdtsAaC.js";import"./ColoredChip.vue_vue_type_script_setup_true_lang-BppdmCHl.js";import"./index-XNwk2z4u.js";import"./vuetify-Ax4mEkq6.js";import"./VForm-Cg8YP1AM.js";import"./index-CxAujb7y.js";import"./VSheet-D_wdfgds.js";import"./VEmptyState-IPAA5KSA.js";import"./VDataTable-CKtGmHB6.js";import"./VPagination-By99_E9T.js";import"./VTabs-B_YtOZt8.js";var U=`in vec2 aPosition;
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
`,M=`in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
void main() {
    finalColor = texture(uTexture, vTextureCoord);
}
`,v=`struct GlobalFilterUniforms {
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
`;class V extends z{constructor(){const e=R.from({vertex:{source:v,entryPoint:"mainVertex"},fragment:{source:v,entryPoint:"mainFragment"},name:"passthrough-filter"}),t=S.from({vertex:U,fragment:M,name:"passthrough-filter"});super({gpuProgram:e,glProgram:t})}}class w{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}w.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"filter"};const y=new P;function Y(g,e){e.clear();const t=e.matrix;for(let r=0;r<g.length;r++){const i=g[r];if(i.globalDisplayStatus<7)continue;const n=i.renderGroup??i.parentRenderGroup;n?.isCachedAsTexture?e.matrix=y.copyFrom(n.textureOffsetInverseTransform).append(i.worldTransform):n?._parentCacheAsTextureRenderGroup?e.matrix=y.copyFrom(n._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(i.groupTransform):e.matrix=i.worldTransform,e.addBounds(i.bounds)}return e.matrix=t,e}const q=new O({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class X{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new E,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0},this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}}class G{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new I({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new B({}),this.renderer=e}get activeBackTexture(){return this._activeFilterData?.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,i=this._pushFilterData();i.skip=!1,i.filters=r,i.container=e.container,i.outputRenderSurface=t.renderTarget.renderSurface;const n=t.renderTarget.renderTarget.colorTexture.source,o=n.resolution,s=n.antialias;if(r.every(p=>!p.enabled)){i.skip=!0;return}const c=i.bounds;if(this._calculateFilterArea(e,c),this._calculateFilterBounds(i,t.renderTarget.rootViewPort,s,o,1),i.skip)return;const u=this._getPreviousFilterData(),f=this._findFilterResolution(o);let l=0,a=0;u&&(l=u.bounds.minX,a=u.bounds.minY),this._calculateGlobalFrame(i,l,a,f,n.width,n.height),this._setupFilterTextures(i,c,t,u)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const i=e.source,n=i.resolution,o=i.antialias;if(t.every(p=>!p.enabled))return r.skip=!0,e;const s=r.bounds;if(s.addRect(e.frame),this._calculateFilterBounds(r,s.rectangle,o,n,0),r.skip)return e;const c=n;this._calculateGlobalFrame(r,0,0,c,i.width,i.height),r.outputRenderSurface=T.getOptimalTexture(s.width,s.height,r.resolution,r.antialias),r.backTexture=_.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const a=r.outputRenderSurface;return a.source.alphaMode="premultiplied-alpha",a}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&T.returnTexture(t.backTexture),T.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const i=e.colorTexture.source._resolution,n=T.getOptimalTexture(t.width,t.height,i,!1);let o=t.minX,s=t.minY;r&&(o-=r.minX,s-=r.minY),o=Math.floor(o*i),s=Math.floor(s*i);const c=Math.ceil(t.width*i),u=Math.ceil(t.height*i);return this.renderer.renderTarget.copyToTexture(e,n,{x:o,y:s},{width:c,height:u},{x:0,y:0}),n}applyFilter(e,t,r,i){const n=this.renderer,o=this._activeFilterData,c=o.outputRenderSurface===r,u=n.renderTarget.rootRenderTarget.colorTexture.source._resolution,f=this._findFilterResolution(u);let l=0,a=0;if(c){const d=this._findPreviousFilterOffset();l=d.x,a=d.y}this._updateFilterUniforms(t,r,o,l,a,f,c,i);const p=e.enabled?e:this._getPassthroughFilter();this._setupBindGroupsAndRender(p,t,n)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,i=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),n=t.worldTransform.copyTo(P.shared),o=t.renderGroup||t.parentRenderGroup;return o&&o.cacheToLocalTransform&&n.prepend(o.cacheToLocalTransform),n.invert(),i.prepend(n),i.scale(1/t.texture.orig.width,1/t.texture.orig.height),i.translate(t.anchor.x,t.anchor.y),i}destroy(){this._passthroughFilter?.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){return this._passthroughFilter??(this._passthroughFilter=new V),this._passthroughFilter}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const i=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(i,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:q,shader:e,state:e._state,topology:"triangle-list"}),r.type===A.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,i){if(e.backTexture=_.EMPTY,e.inputTexture=T.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),e.blendRequired){r.renderTarget.finishRenderPass();const n=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(n,t,i?.bounds)}r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,i,n,o){const s=e.globalFrame;s.x=t*i,s.y=r*i,s.width=n*i,s.height=o*i}_updateFilterUniforms(e,t,r,i,n,o,s,c){const u=this._filterGlobalUniforms.uniforms,f=u.uOutputFrame,l=u.uInputSize,a=u.uInputPixel,p=u.uInputClamp,d=u.uGlobalFrame,x=u.uOutputTexture;s?(f[0]=r.bounds.minX-i,f[1]=r.bounds.minY-n):(f[0]=0,f[1]=0),f[2]=e.frame.width,f[3]=e.frame.height,l[0]=e.source.width,l[1]=e.source.height,l[2]=1/l[0],l[3]=1/l[1],a[0]=e.source.pixelWidth,a[1]=e.source.pixelHeight,a[2]=1/a[0],a[3]=1/a[1],p[0]=.5*a[2],p[1]=.5*a[3],p[2]=e.frame.width*l[2]-.5*a[2],p[3]=e.frame.height*l[3]-.5*a[3];const F=this.renderer.renderTarget.rootRenderTarget.colorTexture;d[0]=i*o,d[1]=n*o,d[2]=F.source.width*o,d[3]=F.source.height*o,t instanceof _&&(t.source.resource=null);const m=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!c),t instanceof _?(x[0]=t.frame.width,x[1]=t.frame.height):(x[0]=m.width,x[1]=m.height),x[2]=m.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const i=this._filterStack[r];if(!i.skip){e=i.bounds.minX,t=i.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?Y(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const i=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;i&&t.applyMatrix(i)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,i=e.bounds,n=e.filters,o=e.firstEnabledIndex,s=e.lastEnabledIndex;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),o===s)n[o].apply(this,r,e.outputRenderSurface,t);else{let c=e.inputTexture;const u=T.getOptimalTexture(i.width,i.height,c.source._resolution,!1);let f=u;for(let l=o;l<s;l++){const a=n[l];if(!a.enabled)continue;a.apply(this,c,f,!0);const p=c;c=f,f=p}n[s].apply(this,c,e.outputRenderSurface,t),T.returnTexture(u)}}_calculateFilterBounds(e,t,r,i,n){const o=this.renderer,s=e.bounds,c=e.filters;let u=1/0,f=0,l=!0,a=!1,p=!1,d=!0,x=-1,F=-1;for(let m=0;m<c.length;m++){const h=c[m];if(!h.enabled)continue;if(x===-1&&(x=m),F=m,u=Math.min(u,h.resolution==="inherit"?i:h.resolution),f+=h.padding,h.antialias==="off"?l=!1:h.antialias==="inherit"&&l&&(l=r),h.clipToViewport||(d=!1),!!!(h.compatibleRenderers&o.type)){p=!1;break}if(h.blendRequired&&!(o.backBuffer?.useBackBuffer??!0)){C("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),p=!1;break}p=!0,a||(a=h.blendRequired)}if(!p){e.skip=!0;return}if(d&&s.fitBounds(0,t.width/i,0,t.height/i),s.scale(u).ceil().scale(1/u).pad((f|0)*n),!s.isPositive){e.skip=!0;return}e.antialias=l,e.resolution=u,e.blendRequired=a,e.firstEnabledIndex=x,e.lastEnabledIndex=F}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new X),this._filterStackIndex++,e}}G.extension={type:[b.WebGLSystem,b.WebGPUSystem],name:"filter"};k.add(G);k.add(w);
