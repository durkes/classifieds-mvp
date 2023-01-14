import Navbar from './Navbar';

export default function BaseLayout() {
    return (
        <div className="max-w-6xl mx-auto px-2 sm:px-4 relative">
            <Navbar />
            <div className="container mx-auto">
                <p>Text under the navbar</p>
            </div>
        </div>
    );
}