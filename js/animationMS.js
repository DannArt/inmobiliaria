$(function() {
  

 $("body").on("click", '.closebtn' ,function(event)
 {
  
              $(".mensaje").addClass("animated fadeOut");
              setTimeout(function(){ 
                   $(".mensaje").addClass(" hide");
               }, 700);
             
               event.preventDefault();
  })
   

  $('[data-scrollmagic]').each(function (index, elem) {
    // Init ScrollMagic Controller
    var scrollMagicController = new ScrollMagic.Controller();
     
    // Create Animations
    var titulos = $(elem).find('h1'),
    	img = $(elem).find('img'),
    	contenidoA = $(elem).find('.content'),
    	contenido = $(elem).find('.content-down'),
    	contenidoF = $(elem).find('.content-front'),	
        contenidoB = $(elem).find('.content-name');

        
    
    var tl = new TimelineMax({pause: true});    
    tl.add("start") // add timeline label
    	.fromTo(titulos, 0.5, { y: '40px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start")
      .fromTo(img, 0.4, { y: '40px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start")
       .fromTo(contenidoA, 0.4, { y: '60px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start")
      .fromTo(contenido, 0.4, { y: '60px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start")
       .fromTo(contenidoB, 0.4, { y: '60px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start")
       .fromTo(contenidoF, 0.4, { y: '60px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start")
    
    // Create the Scene and trigger when visible
    var scene = new $.ScrollMagic.Scene({
      triggerElement: elem,
      offset: 0 /* offset the trigger Npx below scene's top */
    })
    .setTween(tl)
    .addTo(scrollMagicController);

    // Add debug indicators fixed on right side
     scene.addIndicators(); 
  });
});