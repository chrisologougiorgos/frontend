import { client } from './client';

export const userService = {
  // GET /users/{userId}/profiles/{profileId} (FR 28, 31)
  getUserProfile: async (userId, profileId) => {
    // This is where you would fetch UserPublicProfile or UserPrivateProfile
    return client.get(`/users/${userId}/profiles/${profileId}`);
  },

  // POST /users/{userId}/friendRequests (FR 8)
  sendFriendRequest: async (userId, receiverId) => {
    return client.post(`/users/${userId}/friendRequests`, { receiverId });
  },

  // POST /users/{userId}/userRatings (FR 15)
  submitUserRating: async (userId, ratedUserId, rating) => {
    return client.post(`/users/${userId}/userRatings`, { ratedUserId, rating });
  }
  // Other user endpoints (notifications, points, etc.) would go here
};