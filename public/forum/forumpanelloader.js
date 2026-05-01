async function loadLatestDevlog() {

    // 1. Find the container
    const container = document.getElementById('devlog-latest');
    if (!container) return; // Exit if the container isn't on the page

    // 2. Read the variable from the HTML data attribute
    const jsonFileName = container.getAttribute('data-json');
    
    // Safety check in case you forget to add the attribute
    if (!jsonFileName) {
        container.innerHTML = '<div style="color: #e3abcd; padding: 20px;">ERR: NO JSON FILE DEFINED IN HTML.</div>';
        return;
    }
    
    try {
        // 3. Fetch the specific JSON file dynamically
        const response = await fetch(jsonFileName);
        let posts = await response.json();
        
        container.innerHTML = ''; // clear the "Loading..." text
        // const response = await fetch('blogposts.json');
        
        
        // Grab the very last item in the array (your newest post)
        const newestPost = posts[posts.length - 1];
        
        // Trick to strip HTML tags (like <h1> or <br>) from your content 
        // so we can use a clean text snippet as the clickable link
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newestPost.content;
        let previewText = tempDiv.textContent || tempDiv.innerText;
        
        // Cut it off at 22 characters and add "..."
        previewText = previewText.substring(0, 22) + '...';

        // Inject it into the panel
        const latestContainer = document.getElementById('devlog-latest');
        latestContainer.innerHTML = `
            <a href="forummessage.html" title="Go to newest post">${previewText}</a><br>
            ${newestPost.date} by <span style="color:#e3abcd">${newestPost.username}</span>
        `;

    } catch (error) {
        console.error("Error loading latest post", error);
        document.getElementById('devlog-latest').innerHTML = '<span style="color:red">ERR</span>';
    }
}


// Run when page loads
window.addEventListener('DOMContentLoaded', loadLatestDevlog);