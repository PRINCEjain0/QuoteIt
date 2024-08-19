import ProfileHeader from "../../../components/ProfileHeader";
import PhotoGrid from "../../../components/PhotoGrid";
import Navbar from "../../../components/Navbar";
import AddPost from "../../../components/AddPost";

export default function Home() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="container mx-auto px-4">
                <Navbar />
                <ProfileHeader />
                <AddPost />
                <PhotoGrid />
            </div>
        </div>
    );
}
