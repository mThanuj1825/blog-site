import axios from "axios";

const URL = `${import.meta.env.BACKEND_URL}`;

export async function createPost(post) {
	return axios.post(`${URL}/posts`, post)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.error(err);
		});
}

export async function readPosts() {
	return axios.get(`${URL}/posts`)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.error(err);
		});
}

export async function readPost(id) {
	return axios.get(`${URL}/posts/${id}`)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.error(err);
		});
}

export async function updatePost(id, post) {
	return axios.put(`${URL}/posts/${id}`)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.error(err);
		});
}

export async function deletePost(id) {
	return axios.delete(`${URL}/posts/${id}`)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.error(err);
		});
}

export async function createUser(user) {
	return axios.post(`${URL}/users`, user)
		.then((response) => {
			return response;
		})
		.catch((err) => {
			console.error(err);
		});
}

export async function readUsers() {
	return axios.get(`${URL}/users`)
		.then((response) => {

			return response.data;
		})
		.catch((err) => {
			console.error(err);
		});
}

export async function readUser(id) {
	return axios.get(`${URL}/users/${id}`)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.error(err);
		});
}

export async function updateUser(id, user) {
	return axios.put(`${URL}/users/${id}`, user)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.error(err);
		});
}

export async function verifyUser(user) {
	return axios.post(`${URL}/users/login`, user)
		.then((response) => {
			if (response.data.success) {
				return response.data.token;
			} else {
				console.error(response.data.message);
			}
		});
}
