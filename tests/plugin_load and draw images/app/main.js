require.config({
    baseUrl: "app",
    waitSeconds : 45, //should be enough to load images
    paths : {
        //image : 'src/image' //alias to plugin
    }
});

require([], function (){
    var wrapper = document.getElementById('canvas');
    wrapper.width = 800;
    wrapper.height = 600;
    console.log(wrapper);
    var context = wrapper.getContext("2d");
    //context.drawImage(cat, 10, 10);
    var back = new Image();
    back.src = "app/img/background.jpg";
    back.onload = function () {
 		context.drawImage(back, 0, 0);
    };
});