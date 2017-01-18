import modules from '../modules/index';

export default Object.keys(modules).reduce((actions, moduleName) => ({
	...actions,
	...modules[moduleName].actions
}), {});