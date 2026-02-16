// Menu Toggle untuk Mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu saat tombol diklik
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Tutup menu saat link diklik
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scroll untuk navigasi
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Smooth scroll untuk tombol "Baca Berita"
const btns = document.querySelectorAll('.btn');
btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animasi pada saat scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Amati post cards untuk animasi
const postCards = document.querySelectorAll('.post-card');
postCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Amati featured post untuk animasi
const featuredPost = document.querySelector('.featured-post');
if (featuredPost) {
    featuredPost.style.opacity = '0';
    featuredPost.style.transform = 'translateY(20px)';
    featuredPost.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(featuredPost);
}

// Views Tracking System
const apiBaseUrl = './api/views.php';

// Function untuk fetch data views
async function fetchAllViews() {
    try {
        const response = await fetch(`${apiBaseUrl}?action=get`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching views:', error);
        return {};
    }
}

// Function untuk increment views
async function incrementView(postId) {
    try {
        const response = await fetch(`${apiBaseUrl}?action=increment&post_id=${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error incrementing views:', error);
        return null;
    }
}

// Update views count pada halaman
async function updateViewsCounts() {
    const views = await fetchAllViews();
    
    // Update post cards
    document.querySelectorAll('.post-card').forEach(card => {
        const postId = card.getAttribute('data-post-id');
        if (postId && views[postId] !== undefined) {
            const viewsCountElement = card.querySelector('.views-count');
            if (viewsCountElement) {
                viewsCountElement.textContent = views[postId];
            }
        }
    });
    
    // Update featured post
    const featuredpostElement = document.querySelector('.featured-post');
    if (featuredpostElement) {
        const postId = featuredpostElement.getAttribute('data-post-id');
        if (postId && views[postId] !== undefined) {
            const viewsCountElement = featuredpostElement.querySelector('.views-count');
            if (viewsCountElement) {
                viewsCountElement.textContent = views[postId];
            }
        }
    }
}

// Increment views untuk setiap post saat halaman dimuat
async function trackPageViews() {
    const postIds = [];
    
    // Kumpulkan semua post IDs
    document.querySelectorAll('.post-card').forEach(card => {
        const postId = card.getAttribute('data-post-id');
        if (postId) postIds.push(postId);
    });
    
    const featuredpostElement = document.querySelector('.featured-post');
    if (featuredpostElement) {
        const postId = featuredpostElement.getAttribute('data-post-id');
        if (postId) postIds.push(postId);
    }
    
    // Increment views untuk setiap post (simulasi: user melihat semua post di homepage)
    for (const postId of postIds) {
        await incrementView(postId);
    }
    
    // Update tampilan views
    await updateViewsCounts();
}

// Panggil tracking saat dokumen siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Delay sedikit untuk memastikan semua element sudah tersedia
        setTimeout(trackPageViews, 500);
    });
} else {
    // Jika dokumen sudah terload
    setTimeout(trackPageViews, 500);
}
