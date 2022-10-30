import { invalid, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import User from '$lib/models/User.js';

export const load = async ({ locals }) => {
	// If the user is already logged in, redirect them to the home page
	if (locals?.user) {
		throw redirect(302, '/');
	}
};

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		// Simple validation
		if (!email || !password) {
			return invalid(400, { invalid: true });
		}

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return invalid(400, { invalid: true });
		}

		// Check if password is correct
		const validPassword = await argon2.verify(user.password, password);
		if (!validPassword) {
			return invalid(400, { invalid: true });
		}

		// Update the user token
		const updateToken = await argon2.hash(`${user._id}${Date.now()}`);
		await user.updateOne({ userAuthToken: updateToken });

		// Bake the cookie
		cookies.set('session', updateToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 1 // 1 day
		});

		// Redirect to home, or wherever you want
		throw redirect(302, '/');
	}
};
