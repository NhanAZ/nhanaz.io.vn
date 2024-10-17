// post.js
document.addEventListener('DOMContentLoaded', () => {
    // Add back-to-top button
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.title = 'Về đầu trang';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Get post tags from data attribute
    const postId = document.getElementById('post-content').dataset.postId;
    const post = posts.find(p => p.id.toString() === postId);
    if (post) {
        const tagList = document.getElementById('post-tags');
        if (tagList) {
            tagList.innerHTML = post.tags.map(tag =>
                `<span class="tag">${tag}</span>`
            ).join('');
        }
    }
});