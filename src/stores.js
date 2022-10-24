import { writable } from 'svelte/store';

const initialState = {
	comments: [
		{
			id: crypto.randomUUID(),
			parentId: null,
			body: 'This is a comment',
			createdAt: new Date()
		},
		{
			id: crypto.randomUUID(),
			parentId: null,
			body: 'This is another comment',
			createdAt: new Date()
		}
	]
};

export const comments = writable(initialState.comments);
