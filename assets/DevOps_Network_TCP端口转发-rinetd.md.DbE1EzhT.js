import{_ as s,c as i,o as a,a1 as n}from"./chunks/framework.CG9TfmPt.js";const g=JSON.parse('{"title":"rinted实现TCP端口转发","description":"","frontmatter":{},"headers":[],"relativePath":"DevOps/Network/TCP端口转发-rinetd.md","filePath":"DevOps/Network/TCP端口转发-rinetd.md"}'),l={name:"DevOps/Network/TCP端口转发-rinetd.md"},p=n(`<h1 id="rinted实现tcp端口转发" tabindex="-1">rinted实现TCP端口转发 <a class="header-anchor" href="#rinted实现tcp端口转发" aria-label="Permalink to &quot;rinted实现TCP端口转发&quot;">​</a></h1><h2 id="一、前言" tabindex="-1">一、前言 <a class="header-anchor" href="#一、前言" aria-label="Permalink to &quot;一、前言&quot;">​</a></h2><blockquote><ul><li>rinted快速配置实现端口转发，配置简单方便</li><li>rinted已被作者开源到github上，下载源码地址<a href="https://github.com/boutell/rinetd" target="_blank" rel="noreferrer">https://github.com/boutell/rinetd</a></li></ul></blockquote><h2 id="二、安装" tabindex="-1">二、安装 <a class="header-anchor" href="#二、安装" aria-label="Permalink to &quot;二、安装&quot;">​</a></h2><blockquote><ul><li>以centos系统为例</li></ul></blockquote><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#安装依赖</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc-c++</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#下载rinetd</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">从https://github.com/boutell/rinetd下载源码</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#解压</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -zxvf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rinetd.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#创建手册目录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/man/man8</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#进入目录</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rinetd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#编译安装</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#编译成功后测试</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rinetd</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span></code></pre></div><h2 id="三、配置tcp端口转发" tabindex="-1">三、配置TCP端口转发 <a class="header-anchor" href="#三、配置tcp端口转发" aria-label="Permalink to &quot;三、配置TCP端口转发&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#新建rinetd配置文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/rinetd.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#填写如下内容</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">0.0.0.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1433</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 172.217.5.110</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3306</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">0.0.0.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8080</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 172.19.94.3</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8080</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">0.0.0.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2222</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 192.168.0.103</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3389</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.2.3.4</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 80</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     192.168.0.10</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 80</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#启动rinetd</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rinetd</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/rinetd.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#关闭rinetd</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pkill</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rinetd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#启动后检查</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">netstat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -apn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;rinetd&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#开机启动</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">将启动命令加入到/etc/rc.local</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#配置文件格式解释</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">0.0.0.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1433</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 172.217.5.110</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3306</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">0.0.0.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">           ---</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 源IP</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1433</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              ---</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 源端口</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">103.172.217.5.110</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ---</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 目标IP</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">3306</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              ---</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 目标端口</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">上面配置的意思是将本机1433端口转发到103.172.217.5.110的3306端口</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#注意:需要在自己服务器防火墙放行对应的源端口，否则无法正常使用</span></span></code></pre></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h3>`,9),t=[p];function h(e,k,r,d,F,c){return a(),i("div",null,t)}const y=s(l,[["render",h]]);export{g as __pageData,y as default};
