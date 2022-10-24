import { redirect } from '@sveltejs/kit';

export const load = async () => {
	// Nobody will ever need to display this page
	throw redirect(302, '/');
};

export const actions = {
	// This is the only action that will ever be called
	default: async ({ cookies }) => {
		// Eat the cookie
		cookies.set('session', '', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 0
		});

		// Redirect to login
		return redirect(302, '/login');
	}
};
