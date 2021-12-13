/* eslint-disable no-template-curly-in-string */
import { IRange } from 'monaco-editor';
import { monaco } from 'react-monaco-editor';
import * as regs from './RegExp';

let dependCodes: string[] = [];
let supplement: string[] = [];
let code: string = '';

export interface IFuncNameDescModel {
	code: string;
	des: string;
}

export const setSuggestionCode = (s: string): void => {
	code = s;
};

export const removeSuggestion = (name: string): void => {
	let index = supplement.findIndex((item) => item === name);
	if (index >= 0) {
		supplement.splice(index, 1);
		dependCodes.splice(index, 1);
	}
};

export const addSuggestion = (name: string, code: string): void => {
	let index = supplement.findIndex((item) => item === name);
	if (index < 0) {
		supplement.push(name);
		dependCodes.push(code);
	}
};

export const getMatchString = (str: string, matcher: { [Symbol.match](string: string): RegExpMatchArray | null }, index: number, defaultVal: string = '') => {
	let match = str.match(matcher);
	let group_index: number = 0;
	let result: string = defaultVal;
	match?.forEach((item) => {
		if (group_index === index) result = item;
		group_index++;
	});
	return result;
};

export const getMatchCodeDesList = (str: string, matcher: RegExp) => {
	let regArray: RegExpExecArray | null;
	let result: IFuncNameDescModel[] = [];
	while ((regArray = matcher.exec(str))) {
		let model: IFuncNameDescModel = {
			code: '',
			des: '',
		};
		regArray?.forEach((item, index) => {
			if (index === 3) model.code = item;
			if (index === 2) model.des = item;
		});
		result.push(model);
	}
	return result;
};

export const getMatchStringList = (str: string, matcher: RegExp) => {
	let regArray: RegExpExecArray | null;
	let result: string[] = [];
	while ((regArray = matcher.exec(str))) {
		regArray?.forEach((item, index) => {
			if (index > 0) result.push(item);
		});
	}
	return result;
};

export const suggestions = (range: IRange): monaco.languages.CompletionItem[] => {
	// 取 skynet 导入模块 。
	let skynet: string = getMatchString(code, regs.skynet, 1, 'skynet');
	let cmd: string = getMatchString(code, regs.cmd, 3);
	let command: string = getMatchString(code, regs.command(cmd), 1);

	let suggestions: monaco.languages.CompletionItem[] = [
		{
			label: command,
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['function ' + command + '.${1:name}(${2:param})', '\t', 'end'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '消息分发函数',
		},
		{
			label: skynet + '.getenv',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['local ${1:name} = ' + skynet + '.getenv("${2:env_name}")'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '获取环境变量',
		},
		{
			label: skynet + '.setenv',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.setenv("${1:name}", ${2:value})'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '设置环境变量',
		},
		{
			label: skynet + '.newservice',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['local ${1:address} = ' + skynet + '.newservice("${2:name}")'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '启动一个新服务并返回地址',
		},
		{
			label: skynet + '.uniqueservice',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['local ${1:address} = ' + skynet + '.uniqueservice("${2:name}")'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '启动一个唯一服务，如果服务该服务已经启动，则返回已启动的服务地址',
		},
		{
			label: skynet + '.queryservice',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['local ${1:address} = ' + skynet + '.queryservice("${2:name}")'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '查询一个由 uniqueservice 启动的唯一服务的地址，若该服务尚未启动则等待',
		},
		{
			label: skynet + '.localname',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['local ${1:address} = ' + skynet + '.localname("${2:name}")'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '返回同一进程内，用 register 注册的具名服务的地址',
		},
		{
			label: skynet + '.address',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['local ${1:name} = ' + skynet + '.address(${2:address})'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '将一个服务地址转换为一个可供显示的字符串',
		},
		{
			label: skynet + '.exit',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.exit()'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '结束当前服务',
		},
		{
			label: skynet + '.self',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['local ${1:address} = ' + skynet + '.self()'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '返回当前服务的地址',
		},
		{
			label: skynet + '.start',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.start(function()', '\t${1:--todo}', 'end)'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '启动服务入口',
		},
		{
			label: skynet + '.start dispatch',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [
				'local ${1:command} = {}',
				'',
				'',
				'',
				skynet + '.start(function()',
				'\t' + skynet + '.dispatch("lua", function(session, source, cmd, ...)',
				'\t\tlocal f = assert(${2:command}[cmd], cmd .. "not found")',
				'\t\t' + skynet + '.retpack(f(...))',
				'\tend)',
				'end)',
			].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '启动服务入口与消息接收',
		},
		{
			label: skynet + '.call',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: skynet + '.call("${1:address}", "lua", "${2:func}")',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '服务通信，存在返回值',
		},
		{
			label: skynet + '.call param',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: skynet + '.call("${1:address}", "lua", "${2:func}", "${3:param}")',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '服务通信，存在返回值（参数）',
		},
		{
			label: skynet + '.send',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: skynet + '.send("${1:address}", "lua", "${2:func}")',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '服务通信，无返回值',
		},
		{
			label: skynet + '.send param',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: skynet + '.send("${1:address}", "lua", "${2:func}", "${3:param}")',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '服务通信，无返回值（参数）',
		},
		{
			label: skynet + '.dispatch',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [
				skynet + '.dispatch("lua", function(session, source, cmd, ...)',
				'\tlocal f = assert(${1:command}[cmd], cmd .. "not found")',
				'\t' + skynet + '.retpack(f(...))',
				'end)',
			].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '服务通信，无返回值',
		},
		{
			label: skynet + '.error',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.error("${1:message}")'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '打印日志',
		},
		{
			label: skynet + '.sleep',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.sleep("${1:time}")'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '让当前的任务等待 time * 0.01s ',
		},
		{
			label: skynet + '.yield',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.yield()'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '让出当前的任务执行流程，使本服务内其它任务有机会执行，随后会继续运行',
		},
		{
			label: skynet + '.wait',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.wait()'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '让出当前的任务执行流程，直到用 wakeup 唤醒它',
		},
		{
			label: skynet + '.wakeup',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.wakeup(${1:co})'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '唤醒用 wait 或 sleep 处于等待状态的任务',
		},
		{
			label: skynet + '.fork',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['local ${1:co} = ' + skynet + '.fork(${2:func}, ...)'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '启动一个新的任务去执行函数 func ',
		},
		{
			label: skynet + '.genid',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['local ${1:id} = ' + skynet + '.genid()'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '生成唯一 session',
		},
		{
			label: skynet + '.dispatch_message',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.dispatch_message(${1:typeid}, ${2:msg}, ${3:sz}, ${4:session}, ${5:source})'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '默认的消息处理过程，由 C 层传递给它消息的五元组：消息类型 id 、指针、长度、session 号、消息源地址',
		},
		{
			label: skynet + '.pcall',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.pcall(${1:func}, ...)'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '执行一个函数，捕获可能抛出的异常，并保证在此之前运行由 init 注册的初始化过程',
		},
		{
			label: skynet + '.init_service',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.init_service(${1:func})'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '用 func 函数初始化服务',
		},
		{
			label: skynet + '.endless',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.endless()'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '查询当前服务的当前任务是否处于长期占用 cpu 的状态',
		},
		{
			label: skynet + '.mqlen',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.mqlen()'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '查询当前服务有多少尚未处理的消息',
		},
		{
			label: skynet + '.task(result)',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.task(${1:result})'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '返回当前服务尚未处理完成的任务调用堆栈信息',
		},
		{
			label: skynet + '.task',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: [skynet + '.task()'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '返回尚未处理完成的任务的个数',
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
			insertText: 'local ${1:name} = {${2:key1} = ${3:value2}, ${4:key2} = ${5:value2}, ${6:key3} = ${7:value3}}',
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
			insertText: ['function ${1:name}(${2:param1}, ${3:param2})', '\t${4:--todo}', 'end'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '函数 2 个参数',
		},
		{
			label: 'function 3',
			kind: monaco.languages.CompletionItemKind.Variable,
			insertText: ['function ${1:name}(${2:param1}, ${3:param2}, ${4:param3})', '\t${5:--todo}', 'end'].join('\n'),
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
			insertText: ['for ${1:index}, ${2:value} in ipairs(${3:table}) do', '\t${4:--body}', 'end'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: 'for（index, value）',
		},
		{
			label: 'for pairs',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['for ${1:key}, ${2:value} in pairs(${3:table}) do', '\t${4:--body}', 'end'].join('\n'),
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
			label: 'return',
			kind: monaco.languages.CompletionItemKind.Field,
			insertText: ['return ${1:obj}'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '返回',
		},
		{
			label: 'repeat',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: ['local ${1:name} = ${2:value}', 'repeat', '\t${4:--body}', '\t${1:name} = ${1:name} + 1', 'until(${1:name} > ${3:value})'].join('\n'),
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
			detail: '导入 skynet cluster 基础库 ',
		},
	];

	supplement.forEach((item, index) => {
		if (!dependCodes[index]) return;
		let dependCmd: string = getMatchString(dependCodes[index], regs.cmd, 3);
		let dependCommand: string = getMatchString(dependCodes[index], regs.command(dependCmd), 1);
		let dependFuncList: IFuncNameDescModel[] = getMatchCodeDesList(dependCodes[index], regs.funcG(dependCommand));

		if (dependFuncList.length > 0) {
			dependFuncList.forEach((funcName) => {
				let codeArry: string[] = [];
				let params = getMatchStringList(funcName.code, regs.paramG);
				params.forEach((param, i) => {
					if (i > 0) codeArry.push('${' + i.toString() + ':' + param + '}');
				});
				suggestions.push({
					label: item + ' send ' + funcName.code,
					kind: monaco.languages.CompletionItemKind.Function,
					insertText: [item + '_send_' + params[0] + '(' + codeArry.join(', ') + ')'].join('\n'),
					insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
					range: range,
					detail: funcName.des,
				});

				suggestions.push({
					label: item + ' call ' + funcName.code,
					kind: monaco.languages.CompletionItemKind.Function,
					insertText: [item + '_call_' + params[0] + '(' + codeArry.join(', ') + ')'].join('\n'),
					insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
					range: range,
					detail: funcName.des,
				});
			});
		}
	});

	let varList: string[] = getMatchStringList(code, regs.variableG);
	varList.forEach((item) => {
		suggestions.push({
			label: item,
			kind: monaco.languages.CompletionItemKind.Variable,
			insertText: [item].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range,
			detail: '',
		});
	});

	return suggestions;
};
