import express from 'express';
const router = express.Router();

router.get('/login/oauth/twitter', function (req, res) {
    const twitterUrl = 'https://twitter.com/i/oauth2/authorize?client_id=VjF4M1ZZWHU3UFZPWDVGNnFMa2o6MTpjaQ&code_challenge=GNgMBsSMsmRldL0vcu6kQHWblZjhefHnxeRyBxj5EH4&code_challenge_method=S256&response_type=code&scope=users.read+tweet.read&state=UMyn7TccCXM25deDg3SjmkhRKktR3d&redirect_uri=' + req.query.redirect_uri;
    res.redirect(twitterUrl);
});
router.get('/login/oauth/google', function (req, res) {
    const googleUrl = 'https://accounts.google.com/o/oauth2/auth?client_id=424900776121-kfnpvgahhjhu5373mm39p8po3knt5i2i.apps.googleusercontent.com&code_challenge=SOvsAZsdR_HvJhzJQMUtDs2dppfG3Be99-2Y2ohQy54&code_challenge_method=S256&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=XhnOUX421WQQN3Tb5PI091KHDiEKV2&redirect_uri=' + req.query.redirect_uri;
    res.redirect(googleUrl);
});

export default router;