require.config({
    baseUrl: 'dist/'
});

require(['car'], function(Car) {
    console.log(Car);
});
