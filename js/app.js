require.config({
    baseUrl: 'dist/'
});

require(['Car'], function(Car) {
    console.log(Car);
});
