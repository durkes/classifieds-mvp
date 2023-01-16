export default function LoadingOverlay() {
    return (
        <div className="z-90 fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-40">
            <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                <div className="border-transparent border-t-white border-4 h-16 w-16 border-solid rounded-full animate-spin-fast"></div>
            </div>
        </div>
    );
}