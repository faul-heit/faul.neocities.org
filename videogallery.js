const videos = [
    "LRGjF36XPBs",
    "lWUHlvHIEwo",
    "dXjx9ttTEV8",
    "LlpFLviKa1k",
    "l18oPFS_nlM",
    "MjbLNLY4RiQ",
    "pYnCMeLBGT0",
  ];
  
  const gallery = document.getElementById("video-gallery");
  
  videos.forEach(id => {
    const item = document.createElement("div");
    item.className = "video-item";
  
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${id}`;
    iframe.loading = "lazy";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
  
    item.appendChild(iframe);
    gallery.appendChild(item);
  });
  