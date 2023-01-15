export default function OAuthCallback() {
    // const [hash, query] = window.location.hash.split('#')[1].split('?');
    const params = Object.fromEntries(new URLSearchParams(window.location.search));

    console.log(params);

    return (
        <div>
            OAuth Callback page
        </div>
    );
}