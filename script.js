document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('galleryContainer');
    if (!container) return;

    const artworks = JSON.parse(localStorage.getItem('myArtworks')) || [
        {
            title: "First Light",
            description: "This is a sample artistic description for the first artwork. You can delete or edit this from your dashboard.",
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
        }
    ];

    artworks.forEach(art => {
        const card = document.createElement('div');
        card.className = 'art-card';
        card.innerHTML = `
            <img src="${art.image}" alt="${art.title}">
            <div class="art-info">
                <h3>${art.title}</h3>
                <p>${art.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
});