function loco(){
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
        
}
console.log(loco())

gsap.to("#page>video",{
  scrollTrigger:{
    trigger: `#page>video`,
    start: `3% top`,
    end: `bottom top`,
    scroller: `#main`
  },
  onStart:()=>{
    document.querySelector("#page>video").play()
  }
})

gsap.to("#page",{
  scrollTrigger:{
    trigger: `#page`,
    start: `top top`,
    end: `bottom top`,
    scroller: `#main`,
    pin: true
  }
})

gsap.to("#page-bottom",{
  scrollTrigger:{
    trigger: `#page-bottom`,
    start: `5% top`,
    end: `bottom top`,
    scroller: `#main`,
  },
  opacity: 0
})

var tl = gsap.timeline({
  scrollTrigger:{
    trigger: `#page1`,
    start: `top top`,
    scrub: 1,
    scroller: `#main`,
    pin: true
  }
})

tl.to("#page1>h1",{ 
  top:`-50%`
})

var tl1 = gsap.timeline({
  scrollTrigger:{
    trigger: `#page2`,
    start: `top top`,
    scrub: 1,
    scroller: `#main`,
    pin: true
  }
})

tl1.to("#page2>h1",{ 
  top:`-50%`
})

var tl2 = gsap.timeline({
  scrollTrigger:{
    trigger: `#page4`,
    start: `top top`,
    scrub: 1,
    scroller: `#main`,
    pin: true
  }
})

tl2.to("#page4>#center-page4",{ 
  top:`-50%`
})

function canvas(){
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });
  
  function files(index) {
    var data = `https://www.apple.com/v/apple-vision-pro/a/images/overview/hero/hero_startframe__k6x4mt11vf2u_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/routers/quicklook_placeholder__eu3anwy8icae_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/hero/portrait_base__bwsgtdddcl7m_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/spatial_computing_startframe__rtxdvqb0m1ei_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/digital_canvas_startframe__dn0uk8v419km_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/inputs_startframe__ggmu2xwjf662_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/entertainment_startframe__o6s8ikcayjum_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/intro/hardware_base__ecl2v43j73o2_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/experiences/apps/apps_startframe__fgskz7opptiu_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/hero/apple_vision_pro_logo__ux94yix23r6y_large.png
        https://www.apple.com/v/apple-vision-pro/a/images/overview/experiences/entertainment/entertainment_startframe__o6s8ikcayjum_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/experiences/photos-videos/photos_videos_startframe__dnwwa2e1qys2_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/portrait_front_base__gmqifatci56q_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/glass_top__k3b8lzqd1l2m_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/glass_side__gm4agomrwl2e_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/glass_startframe__fvet9b5mg86e_large.jpg
        https://www.apple.com/ac/globalfooter/8/en_US/assets/ac-footer/breadcrumbs/apple/icon_large.svg
        https://www.apple.com/ac/globalfooter/8/en_US/assets/ac-footer/breadcrumbs/separator/icon_large.svg
        https://securemetrics.apple.com/b/ss/applestoreww/1/JS-2.23.0/s53575430356594?AQB=1&ndh=1&pf=1&t=12%2F6%2F2023%2020%3A46%3A27%203%20-330&fid=29862B8268460A17-349CEBB4F08B0962&ce=UTF-8&cdp=2&cl=1800&pageName=apple%20vision%20pro%20-%20overview%20%28us%29&g=https%3A%2F%2Fwww.apple.com%2Fapple-vision-pro%2F%3Fcid%3Dwwa-us-kwgo-VisionPro--slid-----Announce-%26mtid%3D20925r2y69020%26aosid%3Dp238%26mnid%3D44sHhjLc-dc_mtid_20925r2y69020_pcrid_%257Badid%257D_pgrid_151440461475_&r=https%3A%2F%2Fwww.google.com%2F&cc=USD&ch=www.us.applevisionpro&server=ac-2.18.0&h1=www.us.applevisionpro&v3=aos%3A%20us&l3=D%3Das_tex&c4=https%3A%2F%2Fwww.apple.com%2Fapple-vision-pro%2F&v4=D%3DpageName&c14=apple%20vision%20pro%20-%20overview%20%28us%29&v14=en-us&c17=49%3A49&c20=aos%3A%20us&c28=11630&v49=D%3Dr&v54=D%3Dg&c57=www.us.applevisionpro&v97=s.t-p&s=1600x900&c=24&j=1.6&v=N&k=Y&bw=1349&bh=781&AQE=1
        https://www.apple.com/ac/ac-video-posterframe/4.0/images/ac_video_poster_960x540.jpg
        https://www.apple.com/favicon.ico
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/spatial_computing_startframe__rtxdvqb0m1ei_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/digital_canvas_startframe__dn0uk8v419km_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/inputs_startframe__ggmu2xwjf662_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/entertainment_startframe__o6s8ikcayjum_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/hero/hero_endframe__dz973mndvu82_large.jpg
        https://securemetrics.apple.com/b/ss/applestoreww/1/JS-2.23.0/s57511297904146?AQB=1&ndh=1&pf=1&t=12%2F6%2F2023%2020%3A46%3A28%203%20-330&fid=29862B8268460A17-349CEBB4F08B0962&ce=UTF-8&cdp=2&cl=1800&pageName=apple%20vision%20pro%20-%20overview%20%28us%29&g=https%3A%2F%2Fwww.apple.com%2Fapple-vision-pro%2F%3Fcid%3Dwwa-us-kwgo-VisionPro--slid-----Announce-%26mtid%3D20925r2y69020%26aosid%3Dp238%26mnid%3D44sHhjLc-dc_mtid_20925r2y69020_pcrid_%257Badid%257D_pgrid_151440461475_&cc=USD&events=event243%3D1.62%2Cevent244&h1=www.us.applevisionpro&l3=D%3Das_tex&v4=D%3DpageName&v14=en-us&c34=hero%20-%20intro&c35=1.62&c36=1&v49=https%3A%2F%2Fwww.google.com%2F&v54=D%3Dg&v70=enhanced&v97=s.tl-o&pe=lnk_o&pev2=section%20engagement&s=1600x900&c=24&j=1.6&v=N&k=Y&bw=1349&bh=781&lrt=194&AQE=1
        https://www.apple.com/v/apple-vision-pro/a/images/overview/intro/logo__4zgkuyebgtem_large.png
        https://www.apple.com/v/apple-vision-pro/a/images/overview/intro/intro_spin_endframe__dy927flmi3au_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/experiences/apps/apps_startframe__fgskz7opptiu_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/experiences/entertainment/entertainment_startframe__o6s8ikcayjum_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/experiences/photos-videos/photos_videos_startframe__dnwwa2e1qys2_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/experiences/connection/connection_startframe__dk2ju081ayqa_large.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0000.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0199.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0100.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0050.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0150.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0025.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0075.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0125.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0175.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0012.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0038.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0063.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0088.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0113.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0138.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0163.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0188.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0006.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0019.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0032.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0044.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0057.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0069.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0082.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0094.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0107.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0119.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0132.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0144.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0157.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0169.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0182.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0194.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0003.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0009.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0016.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0022.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0029.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0035.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0041.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0047.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0054.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0060.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0066.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0072.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0079.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0085.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0091.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0097.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0104.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0110.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0116.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0122.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0129.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0135.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0141.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0147.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0154.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0160.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0166.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0172.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0179.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0185.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0191.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0197.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0001.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0005.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0008.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0011.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0014.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0018.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0021.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0024.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0027.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0031.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0034.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0037.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0040.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0043.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0046.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0049.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0052.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0056.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0059.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0062.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0065.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0068.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0071.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0074.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0077.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0081.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0084.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0087.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0090.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0093.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0096.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0099.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0102.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0106.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0109.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0112.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0115.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0118.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0121.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0124.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0127.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0131.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0134.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0137.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0140.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0143.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0146.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0149.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0152.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0156.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0159.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0162.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0165.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0168.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0171.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0174.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0177.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0181.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0184.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0187.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0190.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0193.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0196.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0002.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0004.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0007.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0010.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0013.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0015.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0017.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0020.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0023.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0026.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0028.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0030.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0033.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0036.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0039.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0042.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0045.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0048.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0051.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0053.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0055.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0058.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0061.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0064.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0067.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0070.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0073.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0076.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0078.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0080.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0083.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0086.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0089.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0092.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0095.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0098.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0101.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0103.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0105.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0108.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0111.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0114.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0117.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0120.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0123.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0126.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0128.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0130.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0133.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0136.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0139.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0142.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0145.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0148.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0151.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0153.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0155.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0158.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0161.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0164.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0167.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0170.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0173.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0176.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0178.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0180.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0183.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0186.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0189.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0192.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0195.jpg
        https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0198.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/glass_top__k3b8lzqd1l2m_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/glass_side__gm4agomrwl2e_large.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/glass_startframe__fvet9b5mg86e_large.jpg
        https://securemetrics.apple.com/b/ss/applestoreww/1/JS-2.23.0/s51320850348095?AQB=1&ndh=1&pf=1&t=12%2F6%2F2023%2020%3A46%3A35%203%20-330&fid=29862B8268460A17-349CEBB4F08B0962&ce=UTF-8&cdp=2&cl=1800&pageName=apple%20vision%20pro%20-%20overview%20%28us%29&g=https%3A%2F%2Fwww.apple.com%2Fapple-vision-pro%2F%3Fcid%3Dwwa-us-kwgo-VisionPro--slid-----Announce-%26mtid%3D20925r2y69020%26aosid%3Dp238%26mnid%3D44sHhjLc-dc_mtid_20925r2y69020_pcrid_%257Badid%257D_pgrid_151440461475_&cc=USD&events=event243%3D1.15%2Cevent244&h1=www.us.applevisionpro&l3=D%3Das_tex&v4=D%3DpageName&v14=en-us&c34=design%20features&c35=1.15&c36=13&v49=https%3A%2F%2Fwww.google.com%2F&v54=D%3Dg&v97=s.tl-o&pe=lnk_o&pev2=section%20engagement&s=1600x900&c=24&j=1.6&v=N&k=Y&bw=1349&bh=781&lrt=152&AQE=1
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/light_seal__fo87cv0zkcmm_large.jpg
        https://securemetrics.apple.com/b/ss/applestoreww/1/JS-2.23.0/s5483908434663?AQB=1&ndh=1&pf=1&t=12%2F6%2F2023%2020%3A46%3A37%203%20-330&fid=29862B8268460A17-349CEBB4F08B0962&ce=UTF-8&cdp=2&cl=1800&pageName=apple%20vision%20pro%20-%20overview%20%28us%29&g=https%3A%2F%2Fwww.apple.com%2Fapple-vision-pro%2F%3Fcid%3Dwwa-us-kwgo-VisionPro--slid-----Announce-%26mtid%3D20925r2y69020%26aosid%3Dp238%26mnid%3D44sHhjLc-dc_mtid_20925r2y69020_pcrid_%257Badid%257D_pgrid_151440461475_&cc=USD&events=event243%3D2.48%2Cevent244&h1=www.us.applevisionpro&l3=D%3Das_tex&v4=D%3DpageName&v14=en-us&c34=design%20frame%20tile&c35=2.48&c36=14&v49=https%3A%2F%2Fwww.google.com%2F&v54=D%3Dg&v97=s.tl-o&pe=lnk_o&pev2=section%20engagement&s=1600x900&c=24&j=1.6&v=N&k=Y&bw=1349&bh=781&lrt=113&AQE=1
        https://securemetrics.apple.com/b/ss/applestoreww/1/JS-2.23.0/s5672537237616?AQB=1&ndh=1&pf=1&t=12%2F6%2F2023%2020%3A46%3A37%203%20-330&fid=29862B8268460A17-349CEBB4F08B0962&ce=UTF-8&cdp=2&cl=1800&pageName=apple%20vision%20pro%20-%20overview%20%28us%29&g=https%3A%2F%2Fwww.apple.com%2Fapple-vision-pro%2F%3Fcid%3Dwwa-us-kwgo-VisionPro--slid-----Announce-%26mtid%3D20925r2y69020%26aosid%3Dp238%26mnid%3D44sHhjLc-dc_mtid_20925r2y69020_pcrid_%257Badid%257D_pgrid_151440461475_&cc=USD&events=event243%3D2.48%2Cevent244&h1=www.us.applevisionpro&l3=D%3Das_tex&v4=D%3DpageName&v14=en-us&c34=design%20head%20band%20tile&c35=2.48&c36=15&v49=https%3A%2F%2Fwww.google.com%2F&v54=D%3Dg&v97=s.tl-o&pe=lnk_o&pev2=section%20engagement&s=1600x900&c=24&j=1.6&v=N&k=Y&bw=1349&bh=781&AQE=1
        https://www.apple.com/v/apple-vision-pro/a/images/overview/hero/apple_vision_pro_logo__ux94yix23r6y_medium.png
        https://www.apple.com/v/apple-vision-pro/a/images/overview/intro/logo__4zgkuyebgtem_medium.png
        https://www.apple.com/v/apple-vision-pro/a/images/overview/hero/hero_startframe__k6x4mt11vf2u_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/hero/hero_endframe__dz973mndvu82_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/spatial_computing_startframe__rtxdvqb0m1ei_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/digital_canvas_startframe__dn0uk8v419km_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/inputs_startframe__ggmu2xwjf662_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/foundation/entertainment_startframe__o6s8ikcayjum_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/intro/intro_spin_endframe__dy927flmi3au_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/experiences/apps/apps_startframe__fgskz7opptiu_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/experiences/entertainment/entertainment_startframe__o6s8ikcayjum_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/experiences/photos-videos/photos_videos_startframe__dnwwa2e1qys2_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/experiences/connection/connection_startframe__dk2ju081ayqa_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/glass_top__k3b8lzqd1l2m_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/glass_side__gm4agomrwl2e_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/glass_startframe__fvet9b5mg86e_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/design/light_seal__fo87cv0zkcmm_medium.jpg
        https://www.apple.com/v/apple-vision-pro/a/images/overview/hero/apple_vision_pro_logo_base__ff62ypdqteie_medium.png
        https://www.apple.com/v/apple-vision-pro/a/images/overview/visionos/hero_startframe__k6x4mt11vf2u_medium.jpg`;
    return data.split("\n")[index];
  }
  
  const frameCount = 300;
  
  const images = [];
  const imageSeq = {
    frame: 1,
  };
  
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }
  
  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page>page7`,
      //   set start end according to preference
      start: `top top`,
      end: `600% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });
  
  images[1].onload = render;
  
  function render() {
    scaleImage(images[imageSeq.frame], context);
  }
  
  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
  
    trigger: "#page7",
    pin: true,
    // markers:true,
    scroller: `#main`,
  //   set start end according to preference
    start: `top top`,
    end: `600% top`,
  });
}
canvas();


