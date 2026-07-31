document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('galleryContainer');
    if (!container) return;

    // 🌟 التعديل الأول: سطر سحري لمسح الذاكرة القديمة وضمان ظهور اللوحة الفنية فوراً
    localStorage.removeItem('myArtworks');

    // 🌟 التعديل الثاني: استخدام علامة التنصيص المائلة ` للنص الطويل لعدم حدوث خطأ برمجى
    const artworks = JSON.parse(localStorage.getItem('myArtworks')) || [
        {
            title: "The beginning of the end",
            description: `Dreams do not succumb to the laws of our reality
This artwork captures the moment of the Beginning of the End, inspired by my dreams and the emotions of my reality. At the cliff's top sits an ancient tree trunk engraved with a riddle visible only in its mirror reflection, linking my identity and age to the piece. On that same trunk, a single last strand of hair clings to the world, proving the girl’s existence. Nearby lies a broken lamp with stars pouring out, a reminder that true light emerges from every fracture.
I used acrylics, colored pencils, and watercolors to create contrast between the ocean water, the blood moon, and the drowning planets. ​That radiant star is a memory of my late friend. The three stars link my nationality to my painting. Through this exploration, I learned that the ocean protects, supports, and inspires us. It grants us the courage to sink into the unknown without fear, transforming our earthly end into a vast beginning. Pollution erodes our safety, masking the ocean's beauty, and perhaps preventing it from truly being an ocean. I painted myself falling in the center not in fear, but in a fall of surrender and peace. Below stretches the ocean of infinity, where planets and black holes sink beneath a Blood Moon; I placed the Blood Moon there, believing that it is a symbol of a beginning. This proves that the ocean is our space on Earth. I believe that despite human impact, destiny will lead the ocean to shine again. My message is to reflect on the end we all fear: for what we perceive as an end is, in truth, the beginning of a wider freedom.
So ......I did not deny the cruelty of reality, yet I never surrendered to it.`,
            image: "https://ibb.co"
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
