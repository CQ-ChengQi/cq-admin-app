/* eslint-disable no-template-curly-in-string */
import { IRange } from 'monaco-editor';
import { monaco } from 'react-monaco-editor';

export const suggestions = (range: IRange): monaco.languages.CompletionItem[] => [
	{
		label: 'skynet.getenv',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['local ${1:name} = skynet.getenv("${2:env_name}")'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '获取环境变量',
	},
	{
		label: 'skynet.setenv',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['skynet.setenv("${1:name}", ${2:value})'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '设置环境变量',
	},
	{
		label: 'skynet.newservice',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['local ${1:address} = skynet.newservice("${2:name}")'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '启动一个新服务并返回地址',
	},
	{
		label: 'skynet.uniqueservice',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['local ${1:address} = skynet.uniqueservice("${2:name}")'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '启动一个唯一服务，如果服务该服务已经启动，则返回已启动的服务地址',
	},
	{
		label: 'skynet.queryservice',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['local ${1:address} = skynet.queryservice("${2:name}")'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '查询一个由 uniqueservice 启动的唯一服务的地址，若该服务尚未启动则等待',
	},
	{
		label: 'skynet.localname',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['local ${1:address} = skynet.localname("${2:name}")'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '返回同一进程内，用 register 注册的具名服务的地址',
	},
	{
		label: 'skynet.address',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['local ${1:name} = skynet.address(${2:address})'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '将一个服务地址转换为一个可供显示的字符串',
	},
	{
		label: 'skynet.exit',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['skynet.exit()'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '结束当前服务',
	},
	{
		label: 'skynet.self',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['local ${1:address} = skynet.self()'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '返回当前服务的地址',
	},
	{
		label: 'skynet.start',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['skynet.start(function()', '\t${1:--todo}', 'end)'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '启动服务入口',
	},
	{
		label: 'skynet.start dispatch',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: [
			'local ${1:command} = {}',
			'',
			'',
			'${3:function}',
			'',
			'',
			'skynet.start(function()',
			'\tskynet.dispatch("lua", function(session, source, cmd, ...)',
			'\t\tlocal f = assert(${2:command}[cmd], cmd .. "not found")',
			'\t\tskynet.retpack(f(...))',
			'\tend)',
			'end)',
		].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '启动服务入口与消息接收',
	},
	{
		label: 'skynet.call',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: 'skynet.call("${1:address}", "lua", "${2:func}")',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '服务通信，存在返回值',
	},
	{
		label: 'skynet.call param',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: 'skynet.call("${1:address}", "lua", "${2:func}", "${3:param}")',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '服务通信，存在返回值（参数）',
	},
	{
		label: 'skynet.send',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: 'skynet.send("${1:address}", "lua", "${2:func}")',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '服务通信，无返回值',
	},
	{
		label: 'skynet.send param',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: 'skynet.send("${1:address}", "lua", "${2:func}", "${3:param}")',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '服务通信，无返回值（参数）',
	},
	{
		label: 'skynet.dispatch',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: [
			'skynet.dispatch("lua", function(session, source, cmd, ...)',
			'\tlocal f = assert(${1:command}[cmd], cmd .. "not found")',
			'\tskynet.retpack(f(...))',
			'end)',
		].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '服务通信，无返回值',
	},
	{
		label: 'skynet.error',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['skynet.error("${1:message}")'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '打印日志',
	},
	{
		label: 'local',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText: 'local ${1:name} = ${2:value}',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '本地变量',
	},
	{
		label: 'local table 1',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText: 'local ${1:name} = {${2:key1} = ${3:value2}}',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '本地 table 变量 1 个元素',
	},
	{
		label: 'local table 2',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText: 'local ${1:name} = {${2:key1} = ${3:value2}, ${4:key2} = ${5:value2}}',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '本地 table 变量 2 个元素',
	},
	{
		label: 'local table 3',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText:
			'local ${1:name} = {${2:key1} = ${3:value2}, ${4:key2} = ${5:value2}, ${6:key3} = ${7:value3}}',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '本地 table 变量 3 个元素',
	},
	{
		label: 'function',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText: ['function ${1:name}()', '\t${2:--todo}', 'end'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '函数',
	},
	{
		label: 'function 1',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText: ['function ${1:name}(${2:param1})', '\t${3:--todo}', 'end'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '函数 1 个参数',
	},
	{
		label: 'function 2',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText: ['function ${1:name}(${2:param1}, ${3:param2})', '\t${4:--todo}', 'end'].join(
			'\n',
		),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '函数 2 个参数',
	},
	{
		label: 'function 3',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText: [
			'function ${1:name}(${2:param1}, ${3:param2}, ${4:param3})',
			'\t${5:--todo}',
			'end',
		].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '函数 3 个参数',
	},
	{
		label: 'for',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['for ${1:i} = ${2:1}, ${3:10} do', '\t${4:--body}', 'end'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: 'for 循环',
	},
	{
		label: 'for ipairs',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: [
			'for ${1:index}, ${2:value} in ipairs(${3:table}) do',
			'\t${4:--body}',
			'end',
		].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: 'for（index, value）',
	},
	{
		label: 'for pairs',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: [
			'for ${1:key}, ${2:value} in pairs(${3:table}) do',
			'\t${4:--body}',
			'end',
		].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: 'for（key, value）',
	},
	{
		label: 'table.insert',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['table.insert(${1:table}, ${2:item})'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: 'talbe 插入元素',
	},
	{
		label: 'print',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['print("${1:message}")'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '打印消息',
	},
	{
		label: 'type string',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['type("${1:string}")'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '类型字符串',
	},
	{
		label: 'type',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['type(${1:obj})'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '类型',
	},
	{
		label: 'repeat',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: [
			'local ${1:name} = ${2:value}',
			'repeat',
			'\t${4:--body}',
			'\t${1:name} = ${1:name} + 1',
			'until(${1:name} > ${3:value})',
		].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: 'repeat 循环',
	},
	{
		label: 'require skynet',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['local skynet = require "skynet"'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '导入 skynet 基础库',
	},
	{
		label: 'require skynet.sockert',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['local socket = require "skynet.socket"'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '导入 skynet sockert 基础库',
	},
	{
		label: 'require skynet.cluster',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['local cluster = require "skynet.cluster"'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '导入 skynet cluster 基础库',
	},
];
