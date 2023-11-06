export const clear = () => {
	localStorage.removeItem("userOnSession");
	localStorage.removeItem("logged");
	localStorage.removeItem("payment");
	window.location.reload();
};
