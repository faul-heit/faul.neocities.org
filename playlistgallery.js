const video = [
    "videoseries?si=ShaL7TABos7anjdx&amp;list=PLQgbl9dElBSLA62yTJ-velfbkgvgV_Eih",
    "videoseries?si=omvz4mu6QtyHeXzU&amp;list=PLQgbl9dElBSLjjQcXtQmDc8Mv-TRR6wi9"
    
  ];
  
  const gallery = document.getElementById("playlist-gallery");
  
  video.forEach(id => {
    const item = document.createElement("div");
    item.className = "playlist-item";
  
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${id}`;
    iframe.loading = "lazy";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
  
    item.appendChild(iframe);
    gallery.appendChild(item);
  });
  