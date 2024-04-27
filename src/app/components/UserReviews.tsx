import React from 'react';

// Define props types
type UserReviewProps = {
    username: string;
    date: string;
    reviewPoints: number;
    reviewText: string;
    userImageUrl: string;
};

// UserReview component
const UserReview: React.FC<UserReviewProps> = ({ username, date, reviewPoints, reviewText, userImageUrl }) => {
    return (
        <div className="bg-black text-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
                <img src={userImageUrl || '/user2.png'} alt={username} className="w-12 h-12 rounded-full" />
                <div className="flex flex-col">
                    <span className="font-bold">{username}</span>
                    <span className="text-gray-400 text-sm">{date}</span>
                    <span className="text-yellow-400">{'⭐'.repeat(reviewPoints)}</span>
                </div>
            </div>
            <p className="mt-2">{reviewText}</p>
        </div>
    );
};

export default UserReview;
