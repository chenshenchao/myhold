async function call(name, args) {
	return await new Promise((resolve, reject) => {
		uni[name]({
			...args,
			success: (e) => resolve(e),
			fail: (e) => reject(e)
		});
	});
}

/**
 * 页面切换
 * 
 * @param {Object} args
 */
export async function navigateTo(args) {
	return await call('navigateTo', args);
};

/**
 * 重定向
 * 
 * @param {Object} args
 */
export async function redirectTo(args) {
	return await call('redirectTo', args);
}

/**
 * 标签切换
 * 
 * @param {Object} args
 */
export async function switchTab(args) {
	return await call('switchTab', args);
}

export default {
	navigateTo,
	redirectTo,
	switchTab,
};