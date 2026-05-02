async function loadLatestDevlogs() {

    const panels = document.querySelectorAll('.forum-latest');

    panels.forEach(async (container) => {

        const jsonFileName = container.getAttribute('data-json');

        if (!jsonFileName) {
            container.innerHTML = '<div style="color:#e3abcd;">NO POSTS</div>';
            return;
        }

        try {

            const response = await fetch(jsonFileName);
            const posts = await response.json();

            const newestPost = posts[posts.length - 1];

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newestPost.content;

            let previewText = tempDiv.textContent || tempDiv.innerText;
            previewText = previewText.substring(0, 22) + '...';

            container.innerHTML = `
                <a href="forummessage.html" title="Go to newest post">${previewText}</a><br>
                ${newestPost.date} by <span style="color:#e3abcd">${newestPost.username}</span>
            `;

        } catch (error) {

            console.error("Error loading latest post", error);
            container.innerHTML = '<span style="color:red">ERR</span>';

        }

    });

}

window.addEventListener('DOMContentLoaded', loadLatestDevlogs);