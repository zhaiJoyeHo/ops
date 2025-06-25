import{_ as s,c as a,o as i,a1 as n}from"./chunks/framework.CG9TfmPt.js";const y=JSON.parse('{"title":"vastbase时钟同步","description":"","frontmatter":{},"headers":[],"relativePath":"DevOps/MySQL/vastbase时钟同步.md","filePath":"DevOps/MySQL/vastbase时钟同步.md"}'),l={name:"DevOps/MySQL/vastbase时钟同步.md"},e=n(`<h1 id="vastbase时钟同步" tabindex="-1">vastbase时钟同步 <a class="header-anchor" href="#vastbase时钟同步" aria-label="Permalink to &quot;vastbase时钟同步&quot;">​</a></h1><h2 id="_1、现象" tabindex="-1">1、现象 <a class="header-anchor" href="#_1、现象" aria-label="Permalink to &quot;1、现象&quot;">​</a></h2><ul><li>vastbase分区虚机的时钟比北京时间快接近7s，时间不同步影响业务</li></ul><h2 id="_2、修改dns" tabindex="-1">2、修改dns <a class="header-anchor" href="#_2、修改dns" aria-label="Permalink to &quot;2、修改dns&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># vastbase分区没有配置dns解析无法访问时间服务器</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 新增/etc/resolv.conf文件</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/resolv.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nameserver</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 223.5.5.5</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nameserver</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 114.114.114.114</span></span></code></pre></div><h2 id="_3、修改chrony配置" tabindex="-1">3、修改chrony配置 <a class="header-anchor" href="#_3、修改chrony配置" aria-label="Permalink to &quot;3、修改chrony配置&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/chrony.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Use public servers from the pool.ntp.org project.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Please consider joining the pool (http://www.pool.ntp.org/join.html).</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#pool pool.ntp.org iburst</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ntp.ntsc.ac.cn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> iburst</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ntp1.aliyun.com</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> iburst</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#server cn.pool.ntp.org iburst</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Record the rate at which the system clock gains/losses time.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">driftfile</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/chrony/drift</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Allow the system clock to be stepped in the first three updates</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># if its offset is larger than 1 second.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">makestep</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Enable kernel synchronization of the real-time clock (RTC).</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rtcsync</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Enable hardware timestamping on all interfaces that support it.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#hwtimestamp *</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Increase the minimum number of selectable sources required to adjust</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># the system clock.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#minsources 2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Allow NTP client access from local network.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#allow 192.168.0.0/16</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Serve time even if not synchronized to a time source.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#local stratum 10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Specify file containing keys for NTP authentication.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#keyfile /etc/chrony.keys</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Get TAI-UTC offset and leap seconds from the system tz database.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#leapsectz right/UTC</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Specify directory for log files.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">logdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/log/chrony</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Select which information is logged.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#log measurements statistics tracking</span></span></code></pre></div><h2 id="_4、重启chronyd服务" tabindex="-1">4、重启chronyd服务 <a class="header-anchor" href="#_4、重启chronyd服务" aria-label="Permalink to &quot;4、重启chronyd服务&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chronyd.service</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#查看时间同步地址是否加载</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chronyc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sources</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#手动执行同步生效</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chronyc</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> makestep</span></span></code></pre></div><h2 id="_5、等待自动同步后生效" tabindex="-1">5、等待自动同步后生效 <a class="header-anchor" href="#_5、等待自动同步后生效" aria-label="Permalink to &quot;5、等待自动同步后生效&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">journalctl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -u</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chronycd.service</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#等待大约5分钟后，日志提示同步成功</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Nov</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 18</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 15:29:48</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vastbase-jdyc-sc-2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chronyd[3276502]:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Selected</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> source</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 114.118.7.161</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Nov</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 18</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 15:29:48</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vastbase-jdyc-sc-2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chronyd[3276502]:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> System</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clock</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wrong</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> by</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -7.087251</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> seconds,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> adjustment</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> started</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Nov</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 18</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 15:29:41</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vastbase-jdyc-sc-2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chronyd[3276502]:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> System</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clock</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> was</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stepped</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> by</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -7.087251</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> seconds</span></span></code></pre></div>`,11),t=[e];function h(p,k,r,c,d,o){return i(),a("div",null,t)}const g=s(l,[["render",h]]);export{y as __pageData,g as default};
