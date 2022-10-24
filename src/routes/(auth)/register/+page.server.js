import { invalid, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import User from '$lib/models/User.js';

export const load = async ({ locals }) => {
	if (locals?.user) {
		throw redirect(302, '/');
	}
};

export const actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		// Simple validation
		if (!email || !password) {
			return invalid(400, { invalid: true });
		}

		// Check if user already exists
		const user = await User.findOne({ email });
		if (user) {
			return invalid(400, { user: true });
		}

		// Hash password
		const hashedPassword = await argon2.hash(password);

		// Create user
		await User.create({
			email,
			password: hashedPassword
		});

		// Redirect to login page
		throw redirect(303, '/login');
	}
};
