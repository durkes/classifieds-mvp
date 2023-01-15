export default function OAuthCallback() {
    const [hash, query] = window.location.hash.split('#')[1].split('?');
    const params = Object.fromEntries(new URLSearchParams(query));

    console.log(params);
    return (
        <div>
            OAuth Callback page {hash}
            <br />
            {query}
            <br />
        </div>
    );
}