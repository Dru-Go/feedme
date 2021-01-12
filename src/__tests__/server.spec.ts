import request from 'supertest';
import mongoose from 'mongoose';
import User from '../models/users';
import { app } from '../config/express';

describe('API Authentication:', () => {
	let token: string;
	beforeEach(async () => {
		const newUser = new User({
			email: 'carl3@gmail.com',
			password: 'adasd123123',
		});
		const addedUser = newUser.createUser();
		token = addedUser.token;
	});

	describe('api auth', () => {
		test('api should be locked down', async () => {
			let response = await request(app).get('/api/test');
			expect(response.status).not.toBe(401);

			response = await request(app).get('/api/affiliates');
			expect(response.status).toBe(400);

			response = await request(app).get('/api/brands');
			expect(response.status).toBe(400);
		});

		test('passes with JWT', async () => {
			const jwt = `Bearer ${token}`;
			const id = mongoose.Types.ObjectId();
			const results = await Promise.all([
				request(app).get('/api/affiliates').set('Authorization', jwt),
				request(app).get(`/api/affiliates/${id}`).set('Authorization', jwt),
				request(app).post('/api/affiliates').set('Authorization', jwt),
				request(app).put(`/api/affiliates/${id}`).set('Authorization', jwt),
				request(app).delete(`/api/affiliates/${id}`).set('Authorization', jwt),
			]);

			results.forEach((res) => expect(res.status).not.toBe(401));
		});
	});
});
