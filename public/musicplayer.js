    let player;
    let timeUpdater;
    let isShuffleOn = false;

    // 1. Fetch playlists from JSON and populate the dropdown
    async function loadPlaylists() {
        try {
            const response = await fetch('playlists.json');
            const playlists = await response.json();
            const selector = document.getElementById('playlist-selector');

            playlists.forEach((pl, index) => {
                const option = document.createElement('option');
                option.value = pl.id;
                option.textContent = pl.name;
                selector.appendChild(option);
            });

            // Listen for dropdown changes
            selector.addEventListener('change', (e) => {
                loadYouTubePlaylist(e.target.value);
            });

        } catch (error) {
            console.error("Error loading playlists.json", error);
            document.getElementById('song-title').textContent = "ERR: JSON_NOT_FOUND";
        }
    }

    // 2. Load the YouTube IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            height: '0',
            width: '0',
            playerVars: {
                'playsinline': 1,
                'controls': 0,
                'disablekb': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        // Set initial volume
        player.setVolume(document.getElementById('volume-slider').value);
        
        // Wait for JSON to load, then load the first playlist
        loadPlaylists().then(() => {
            const firstPlaylistId = document.getElementById('playlist-selector').value;
            if (firstPlaylistId) {
                loadYouTubePlaylist(firstPlaylistId);
            }
        });

        setupControls();
    }

    // Helper to load playlist into player
    function loadYouTubePlaylist(playlistId) {
        player.cuePlaylist({
            list: playlistId,
            listType: 'playlist',
            index: 0
        });
        document.getElementById('song-title').textContent = "Loading playlist...";

        const playPauseBtn = document.getElementById('btn-play-pause');
        if (playPauseBtn) {
            playPauseBtn.textContent = "[>]";
            playPauseBtn.style.color = "";
            playPauseBtn.style.fontWeight = "normal";
        }
    }

    // 5. API calls this when player state changes (playing, paused, etc.)
    function onPlayerStateChange(event) {
        const playPauseBtn = document.getElementById('btn-play-pause');
    
        if (event.data == YT.PlayerState.PLAYING) {
            // Video is playing: Change to Pause icon and highlight
            playPauseBtn.textContent = "[||]";
            playPauseBtn.style.color = "#D4FC5E";
            playPauseBtn.style.fontWeight = "bold";
    
            // Get song title
            let videoData = player.getVideoData();
            if (videoData && videoData.title) {
                document.getElementById('song-title').textContent = videoData.title;
            }
            
            // Start updating the timer
            timeUpdater = setInterval(updateTime, 1000);
        } else {
            // Video is paused, ended, or buffering: Revert to Play icon
            playPauseBtn.textContent = "[>]";
            playPauseBtn.style.color = ""; // Reverts to CSS default
            playPauseBtn.style.fontWeight = "normal";
    
            // Stop updating timer
            clearInterval(timeUpdater);
        }
    }

    // 6. Bind HTML buttons to Player logic
    function setupControls() {
        // New Play/Pause Toggle
        document.getElementById('btn-play-pause').addEventListener('click', (e) => {
        e.preventDefault();
        const state = player.getPlayerState();
        // If playing (state 1), pause it. Otherwise, play it.
        if (state === YT.PlayerState.PLAYING) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });
        document.getElementById('btn-next').addEventListener('click', (e) => { e.preventDefault(); player.nextVideo(); });
        document.getElementById('btn-prev').addEventListener('click', (e) => { e.preventDefault(); player.previousVideo(); });
        
        // Shuffle Toggle
        document.getElementById('btn-shuffle').addEventListener('click', (e) => {
            e.preventDefault();
            isShuffleOn = !isShuffleOn;
            player.setShuffle(isShuffleOn);
            e.target.style.color = isShuffleOn ? "#D4FC5E" : ""; // Highlight if on
            e.target.style.fontWeight = isShuffleOn ? "bold" : "normal";
        });

        // Volume Slider
        document.getElementById('volume-slider').addEventListener('input', (e) => {
            player.setVolume(e.target.value);
        });
    }

    // 7. Update UI with time elapsed and duration
    function updateTime() {
        if (player && player.getCurrentTime) {
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            
            document.getElementById('time-elapsed').textContent = formatTime(currentTime);
            document.getElementById('time-duration').textContent = formatTime(duration);
        }
    }

    // Utility: Convert seconds to MM:SS
    function formatTime(timeInSeconds) {
        if (!timeInSeconds) return "00:00";
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }