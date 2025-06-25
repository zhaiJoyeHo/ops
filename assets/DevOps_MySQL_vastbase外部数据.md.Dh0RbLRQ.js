import{_ as s,c as a,o as n,a1 as e}from"./chunks/framework.CG9TfmPt.js";const m=JSON.parse('{"title":"POSTGRES_FDW外部数据封装器","description":"","frontmatter":{},"headers":[],"relativePath":"DevOps/MySQL/vastbase外部数据.md","filePath":"DevOps/MySQL/vastbase外部数据.md"}'),t={name:"DevOps/MySQL/vastbase外部数据.md"},l=e(`<h1 id="postgres-fdw外部数据封装器" tabindex="-1">POSTGRES_FDW外部数据封装器 <a class="header-anchor" href="#postgres-fdw外部数据封装器" aria-label="Permalink to &quot;POSTGRES_FDW外部数据封装器&quot;">​</a></h1><h2 id="_1、功能" tabindex="-1">1、功能 <a class="header-anchor" href="#_1、功能" aria-label="Permalink to &quot;1、功能&quot;">​</a></h2><blockquote><ul><li>可以被用来访问存储在外部Vastbase或PostgreSQL服务器中的数据，不受兼容模式影响。</li></ul></blockquote><h2 id="_2、需求" tabindex="-1">2、需求 <a class="header-anchor" href="#_2、需求" aria-label="Permalink to &quot;2、需求&quot;">​</a></h2><blockquote><ul><li>金蝶项目Vastbase开发数据库10.53.136.11: 5432</li><li>云链通项目Vastbase开发数据库10.0.0.122 : 5432</li><li>金蝶开发库实时同步云链通开发库ccci_settlement下credit_risk_group、credit_ledger_detail等多张表</li></ul></blockquote><h2 id="_3、实现" tabindex="-1">3、实现 <a class="header-anchor" href="#_3、实现" aria-label="Permalink to &quot;3、实现&quot;">​</a></h2><blockquote><ul><li>使用postgres_fdw连接到远程vastbase数据库，并访问外表</li></ul></blockquote><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># (1)前置条件</span></span>
<span class="line"><span># 关闭两端数据库强制修改密码功能</span></span>
<span class="line"><span>alter system set password_force_alter=off;</span></span>
<span class="line"><span># 远端服务器修改配置文件pg_hba.conf新增下列参数，有的已经存在加密模式为md5</span></span>
<span class="line"><span>host  all   all       0.0.0.0/0         sha256</span></span>
<span class="line"><span># 远端服务器修改配置文件postgresql.conf中的listen_addresses，值为*</span></span>
<span class="line"><span>listen_addresses=&#39;*&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># (2)远端数据库配置</span></span>
<span class="line"><span># 创建一个只读专用账号提供给本地数据库进行远程连接使用</span></span>
<span class="line"><span>create user ylt_jd_rquery_user with password &#39;ylt_jd_rquery_user@2024&#39;;</span></span>
<span class="line"><span># 对该帐号针对要同步的表赋予只读权限,使用vastbase用户授权</span></span>
<span class="line"><span>\\c ccci_settlement </span></span>
<span class="line"><span>grant usage on schema ccci_settlement to ylt_jd_rquery_user;</span></span>
<span class="line"><span>grant select on all tables in schema ccci_settlement to ylt_jd_rquery_user;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># (3)本地数据库配置</span></span>
<span class="line"><span># 新建管理员用户进行相关配置操作，配置完服务器、映射、生成外表后，可以对现使用账号针对外表进行赋权及使用</span></span>
<span class="line"><span>create user jd_ylt_rquery_user with sysadmin password &#39;jd_ylt_rquery_user@2024&#39;;</span></span>
<span class="line"><span># 创建与外库对应的数据库</span></span>
<span class="line"><span>create database ccci_settlement;</span></span>
<span class="line"><span># 将ccci_settlement库的全部权限赋予新建管理员用户</span></span>
<span class="line"><span>grant all on database ccci_settlement to jd_ylt_rquery_user;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\\c ccci_settlement</span></span>
<span class="line"><span>\\c - jd_ylt_rquery_user</span></span>
<span class="line"><span>create extension postgres_fdw;</span></span>
<span class="line"><span>create server server_to_ylt foreign data wrapper postgres_fdw options (host &#39;10.0.0.122&#39;,port &#39;5432&#39;,dbname &#39;ccci_settlement&#39;);</span></span>
<span class="line"><span>create user MAPPING FOR jd_ylt_rquery_user SERVER server_to_ylt OPTIONS (user &#39;ylt_jd_rquery_user&#39;,password &#39;ylt_jd_rquery_user@2024&#39;);</span></span>
<span class="line"><span>create schema ccci_settlement</span></span>
<span class="line"><span>IMPORT FOREIGN SCHEMA  ccci_settlement  limit to (credit_risk_group，credit_ledger_detail,credit_risk_safeguard) from server server_to_ylt into ccci_settlement;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vb_dump ccci_settlement -p 5432 -t ccci_settlement.credit_ledger_detail -s -f credit_ledger_detail.sql</span></span></code></pre></div>`,8),p=[l];function c(r,i,_,o,d,u){return n(),a("div",null,p)}const b=s(t,[["render",c]]);export{m as __pageData,b as default};
