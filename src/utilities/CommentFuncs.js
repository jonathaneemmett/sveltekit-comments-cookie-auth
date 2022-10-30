import { derived } from 'svelte/store';
import { comments } from '../stores.js';

export let commentsValues;

// Gets the replies to root comments
export function getReplies(commentId) {
	commentsValues = derived([comments, commentId], ([$comments, $commentId]) => {
		return $comments.filter((comment) => comment.parentId === $commentId);
	});
	return commentsValues;
}

// Add Comment to the store
export function addComment(e) {
	comments.update((comments) => [...comments, e.detail]);
}

// Delete comment from the store
export function deleteComment(commentId) {
	comments.update((comments) => {
		return comments.filter((comment) => comment.id !== commentId);
	});
}

// Update the comment in the store
export function updateComment(e) {
	let comment = e.detail;
	comments.update((comments) => {
		return comments.map((c) => {
			if (c.id === comment.id) {
				return comment;
			}
			return c;
		});
	});
}

// Gets time difference between now and comment.createdAt
export const timeSincePost = (createdAt) => {
	const date = new Date() - new Date(createdAt);
	const epoch = Math.round(date / 1000);
	const seconds = epoch;
	const minutes = Math.round(seconds / 60);
	const hours = Math.round(minutes / 60);
	const days = Math.round(hours / 24);
	const weeks = Math.round(days / 7);
	const months = Math.round(weeks / 4.35);
	const years = Math.round(months / 12);

	if (seconds < 5) {
		return 'now';
	} else if (seconds < 60) {
		return `${seconds}s ago`;
	} else if (minutes < 60) {
		return `${minutes}m ago`;
	} else if (hours < 24) {
		return `${hours}h ago`;
	} else if (days < 7) {
		return `${days}d ago`;
	} else if (weeks < 4) {
		return `${weeks}w ago`;
	} else if (months < 12) {
		return `${months}m ago`;
	} else {
		return `${years}y ago`;
	}
};
