export default function ProfileHeader() {
    const profile = {
        username: "travelenthusiast",
        profilePicture:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        posts: 3,
        followers: 1337,
        following: 420,
        bio: "Adventure seeker | Photography lover | World explorer",
    };
    return (
        <div className="flex flex-col ml-8 sm:flex-row items-center mb-8 sm:mb-12">
            <img
                src={profile.profilePicture}
                alt={profile.username}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-md shadow-md mb-4 sm:mb-0 sm:mr-8"
            />
            <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl text-[#5C4033] font-light mb-2 sm:mb-4">
                    {profile.username}
                </h1>
                <div className="flex justify-center sm:justify-start mb-2 sm:mb-4">
                    <span className="mr-4 sm:mr-8 text-[#5C4033]">
                        {profile.posts} posts
                    </span>
                    <span className="mr-4 sm:mr-8 text-[#5C4033]">
                        {profile.followers} followers
                    </span>
                    <span className="mr-4 sm:mr-8 text-[#5C4033]">
                        {profile.following} following
                    </span>
                </div>
                <p className="max-w-md text-[#5C4033]">{profile.bio}</p>
            </div>
        </div>
    );
}
