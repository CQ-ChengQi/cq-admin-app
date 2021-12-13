export const skynet = /local[\s]+([\w]+)[\s]?=[\s]?require "skynet"/;
export const cmd = /dispatch.*function[(][\s]?([\w]+)[\s]?,[\s]?([\w]+)[\s]?,[\s]?([\w]+)[\s]?[\s]?,[\s]?.../;
export const command = (cmd: string) => new RegExp('([\\w]+)\\[' + cmd + '\\]');
export const funcG = (dependCommand: string) => RegExp('(--[\\s]?(.*)\n)?function ' + dependCommand + '.([\\w]+[(].*[)])', 'g');
export const paramG = /([\w]+)[,|\s]?/g;
export const variableG = /local\s+(\S+)/g;
