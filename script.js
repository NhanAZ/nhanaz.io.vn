// Configuration
const CONFIG = {
    debounceDelay: 300,
    elementIds: {
        postList: 'post-list',
        searchInput: 'search-input',
        sortSelect: 'sort-select',
        categorySelect: 'category-select',
        tagList: 'tag-list',
        noResults: 'no-results'
    }
};

// Sample posts data
const posts = [
    {
        id: 1,
        title: "Xu hướng phát triển web 2024",
        summary: "Khám phá những xu hướng hàng đầu đang định hình tương lai của phát triển web trong năm 2024.",
        url: "posts/xu-huong-phat-trien-web-2024.html",
        date: "2024-03-15",
        category: "Công nghệ",
        tags: ["#Web", "#JavaScript"]
    },
    {
        id: 2,
        title: "Định hướng quan trọng chuẩn bị nhân sự Đại hội Đảng XIV",
        summary: "Các tiêu chí quan trọng trong việc lựa chọn nhân sự cho Ban Chấp hành Trung ương khóa XIV, nhấn mạnh vào việc loại bỏ những cán bộ có khuyết điểm về đạo đức, năng lực và phẩm chất chính trị.",
        url: "posts/dinh-huong-quan-trong-chuan-bi-nhan-su-dai-hoi-dang-xiv.html",
        date: "2024-03-17",
        category: "Chính trị",
        tags: ["#ChinhTri", "#DaiHoiDang", "#NhanSu"]
    }
];

// Utility functions
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

let selectedTags = new Set();

// Main functions
function displayPosts(postsToDisplay) {
    const postList = document.getElementById(CONFIG.elementIds.postList);
    const noResults = document.getElementById(CONFIG.elementIds.noResults);

    if (!postList || !noResults) {
        console.error("Required elements not found");
        return;
    }

    postList.innerHTML = '';

    if (postsToDisplay.length === 0) {
        noResults.classList.remove('d-none');
        return;
    }

    noResults.classList.add('d-none');

    postsToDisplay.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'col-md-6 col-lg-4 mb-4';
        postElement.innerHTML = `
            <div class="card post-card h-100" onclick="location.href='${sanitizeHTML(post.url)}'">
                <div class="card-body">
                    <h5 class="card-title">${sanitizeHTML(post.title)}</h5>
                    <p class="card-text">${sanitizeHTML(post.summary)}</p>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${sanitizeHTML(tag)}</span>`).join('')}
                    </div>
                    <p class="post-date mt-2">Ngày đăng: ${new Date(post.date).toLocaleDateString('vi-VN')}</p>
                </div>
            </div>
        `;
        postList.appendChild(postElement);
    });
}

function initializeFilters() {
    const categories = ['all', ...new Set(posts.map(post => post.category))];
    const categorySelect = document.getElementById(CONFIG.elementIds.categorySelect);

    if (!categorySelect) {
        console.error("Category select element not found");
        return;
    }

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category === 'all' ? 'Tất cả danh mục' : category;
        categorySelect.appendChild(option);
    });

    // Tính toán số lượng sử dụng của mỗi tag
    const tagCounts = {};
    posts.forEach(post => {
        post.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });

    // Chuyển đổi thành mảng và sắp xếp theo số lượng sử dụng
    const sortedTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([tag, count]) => ({ tag, count }));

    const tagList = document.getElementById(CONFIG.elementIds.tagList);
    if (!tagList) {
        console.error("Tag list element not found");
        return;
    }

    // Thêm container cho các tag đã chọn
    const selectedTagsContainer = document.createElement('div');
    selectedTagsContainer.id = 'selected-tags';
    selectedTagsContainer.className = 'mb-3';
    tagList.appendChild(selectedTagsContainer);

    // Container cho tag cloud
    const tagCloudContainer = document.createElement('div');
    tagCloudContainer.className = 'tag-cloud';
    tagList.appendChild(tagCloudContainer);

    sortedTags.forEach(({ tag, count }) => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.innerHTML = `${tag} <small>(${count})</small>`;
        tagElement.addEventListener('click', () => {
            addSelectedTag(tag);
            filterBySelectedTags();
        });
        tagCloudContainer.appendChild(tagElement);
    });
}

function addSelectedTag(tag) {
    if (!selectedTags.has(tag)) {
        selectedTags.add(tag);
        updateSelectedTagsDisplay();
    }
}

function removeSelectedTag(tag) {
    selectedTags.delete(tag);
    updateSelectedTagsDisplay();
    filterBySelectedTags();
}

function updateSelectedTagsDisplay() {
    const container = document.getElementById('selected-tags');
    if (!container) return;

    container.innerHTML = '';
    
    if (selectedTags.size > 0) {
        const clearAllBtn = document.createElement('button');
        clearAllBtn.className = 'btn btn-sm btn-outline-secondary me-2 mb-2';
        clearAllBtn.textContent = 'Xóa tất cả';
        clearAllBtn.addEventListener('click', () => {
            selectedTags.clear();
            updateSelectedTagsDisplay();
            displayPosts(posts);
        });
        container.appendChild(clearAllBtn);
    }

    selectedTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag selected-tag';
        tagElement.innerHTML = `${tag} <i class="fas fa-times"></i>`;
        tagElement.addEventListener('click', () => removeSelectedTag(tag));
        container.appendChild(tagElement);
    });
}

function filterBySelectedTags() {
    if (selectedTags.size === 0) {
        filterAndSortPosts();
        return;
    }

    const searchInput = document.getElementById(CONFIG.elementIds.searchInput);
    const categorySelect = document.getElementById(CONFIG.elementIds.categorySelect);
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const category = categorySelect ? categorySelect.value : 'all';

    const filteredPosts = posts.filter(post => 
        Array.from(selectedTags).every(tag => post.tags.includes(tag)) &&
        (post.title.toLowerCase().includes(searchTerm) ||
         post.summary.toLowerCase().includes(searchTerm)) &&
        (category === 'all' || post.category === category)
    );

    displayPosts(filteredPosts);
}

function filterAndSortPosts() {
    const searchInput = document.getElementById(CONFIG.elementIds.searchInput);
    const sortSelect = document.getElementById(CONFIG.elementIds.sortSelect);
    const categorySelect = document.getElementById(CONFIG.elementIds.categorySelect);

    if (!searchInput || !sortSelect || !categorySelect) {
        console.error("Required filter elements not found");
        return;
    }

    const searchTerm = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;
    const category = categorySelect.value;

    let filteredPosts = posts.filter(post =>
        (post.title.toLowerCase().includes(searchTerm) ||
            post.summary.toLowerCase().includes(searchTerm)) &&
        (category === 'all' || post.category === category)
    );

    if (selectedTags.size > 0) {
        filteredPosts = filteredPosts.filter(post =>
            Array.from(selectedTags).every(tag => post.tags.includes(tag))
        );
    }

    switch (sortBy) {
        case 'date-desc':
            filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'title':
            filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }

    displayPosts(filteredPosts);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    displayPosts(posts);

    const searchInput = document.getElementById(CONFIG.elementIds.searchInput);
    const sortSelect = document.getElementById(CONFIG.elementIds.sortSelect);
    const categorySelect = document.getElementById(CONFIG.elementIds.categorySelect);

    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterAndSortPosts, CONFIG.debounceDelay));
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', filterAndSortPosts);
    }
    if (categorySelect) {
        categorySelect.addEventListener('change', filterAndSortPosts);
    }

    // Add back-to-top button
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.innerHTML = '&#8593;';
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
});