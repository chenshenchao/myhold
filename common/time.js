export async function wait(ms) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), ms);
	});
}

export function getNow() {
	return (new Date()).getTime()
}

export function getInterval(start, end) {
	let st = start instanceof Date ? start.getTime() : start;
	let et = end ? end instanceof Date ? end.getTime() : end : (new Date()).getTime();
	return et - st;
}

export default {
	wait,
	getNow,
	getInterval,
};