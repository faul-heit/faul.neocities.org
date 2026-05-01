async function loadForumPosts() {
    // 1. Find the container
    const container = document.getElementById('thread-container');
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

        // Reverse and render posts (Same as before)
        posts.reverse().forEach((post) => {
            const postDiv = document.createElement('div');
            postDiv.className = 'forum-post';
            postDiv.innerHTML = `
                <div class="post-header">
                    <span class="post-date">${post.date}</span>
                    <span class="post-number">#${post.id}</span>
                </div>
                <div class="post-body-container">
                    <div class="post-sidebar">
                        <span class="post-username">${post.username}</span>
                        <img src="${post.avatar}" alt="Avatar" class="post-avatar">
                        <div class="post-stats">
                            ${post.stats}
                        </div>
                    </div>
                    <div class="post-content">
                        ${post.content}
                    </div>
                </div>
            `;
            container.appendChild(postDiv);
        });

    } catch (error) {
        console.error(`Error loading ${jsonFileName}`, error);
        container.innerHTML = 
            `<div style="color: #e3abcd; padding: 20px;">ERR: COULD NOT LOAD ${jsonFileName.toUpperCase()}.</div>`;
    }
}

// Run the function when the page loads
window.addEventListener('DOMContentLoaded', loadForumPosts);