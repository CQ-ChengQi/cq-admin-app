import { IRange } from 'monaco-editor';
import { monaco } from 'react-monaco-editor';

export const suggestions = (range: IRange): monaco.languages.CompletionItem[] => [
	{
		label: 'skynet.start',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: ['skynet.start(function()', '\t$1', 'end)'].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '启动服务入口',
	},
	{
		label: 'skynet.call',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: 'skynet.call("$1", "lua", "$2")',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '服务通信，存在返回值',
	},
	{
		label: 'skynet.send',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: 'skynet.call("$1", "lua", "$2")',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '服务通信，无返回值',
	},
	{
		label: 'skynet.dispatch',
		kind: monaco.languages.CompletionItemKind.Function,
		insertText: [
			'skynet.dispatch("lua", function(session, source, cmd, ...)',
			'\tlocal f = assert(command[cmd], cmd .. "not found")',
			'\tskynet.retpack(f(...))',
			'end)',
		].join('\n'),
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
		detail: '服务通信，无返回值',
	},
	{
		label: 'local',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText: 'local $1 = $2',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
	},
	{
		label: 'local table 1',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText: 'local $1 = {$2 = $3}',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
	},
	{
		label: 'local table 2',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText: 'local $1 = {$2 = $3, $2 = $3}',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
	},
	{
		label: 'local table 3',
		kind: monaco.languages.CompletionItemKind.Variable,
		insertText: 'local $1 = {$2 = $3, $3 = $4, $5 = $6}',
		insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
		range: range,
	},
];
