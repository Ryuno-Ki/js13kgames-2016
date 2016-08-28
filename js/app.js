require.config({
    baseUrl: 'dist/'
});

require(['street'], function(Street) {
    console.log(Street);
});
