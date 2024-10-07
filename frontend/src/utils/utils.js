export function dateToString(dateCreated) {
	return new Date(dateCreated).toDateString().slice(4);
}