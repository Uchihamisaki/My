// استيراد أدوات Firebase من المكتبة السحابية
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

// إعدادات سحابة Firebase الخاصة بك
const firebaseConfig = {
    apiKey: "AIzaSyBEifSy8WgG4Z3p9gbuwg1fX2n0udxE61c",
    authDomain: "misaki-6c550.firebaseapp.com",
    projectId: "misaki-6c550",
    storageBucket: "misaki-6c550.firebasestorage.app",
    messagingSenderId: "106875309382",
    appId: "1:106875309382:web:804967b1184b9cd9daa947",
    measurementId: "G-4HM1ZQJBSY"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // تشغيل قاعدة البيانات السحابة Firestore

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById('galleryContainer');
    if (!container) return;

    const mainArtTitle = "The beginning of the end";
    const correctedImage = "https://i.ibb.co/XGSkcmf/02.jpg";
    const correctedDesc = `Dreams do not succumb to the laws of our reality
This artwork captures the moment of the Beginning of the End, inspired by my dreams and the emotions of my reality. At the cliff's top sits an ancient tree trunk engraved with a riddle visible only in its mirror reflection, linking my identity and age to the piece. On that same trunk, a single last strand of hair clings to the world, proving the girl’s existence. Nearby lies a broken lamp with stars pouring out, a reminder that true light emerges from every fracture.
I used acrylics, colored pencils, and watercolors to create contrast between the ocean water, the blood moon, and the drowning planets. ​That radiant star is a memory of my late friend. The three stars link my nationality to my painting. Through this exploration, I learned that the ocean protects, supports, and inspires us. It grants us the courage to sink into the unknown without fear, transforming our earthly end into a vast beginning. Pollution erodes our safety, masking the ocean's beauty, and perhaps preventing it from truly being an ocean. I painted myself falling in the center not in fear, but in a fall of surrender and peace. Below stretches the ocean of infinity, where planets and black holes sink beneath a Blood Moon; I placed the Blood Moon there, believing that it is a symbol of a beginning. This proves that the ocean is our space on Earth. I believe that despite human impact, destiny will lead the ocean to shine again. My message is to reflect on the end we all fear: for what we perceive as an end is, in truth, the beginning of a wider freedom.
So ......I did not deny the cruelty of reality, yet I never surrendered to it.`;

    try {
        // جلب البيانات من سحابة Firebase (Firestore)
        const querySnapshot = await getDocs(collection(db, "artworks"));
        let artworks = [];
        
        querySnapshot.forEach((doc) => {
            artworks.push(doc.data());
        });

        // إذا كانت السحابة فارغة، نضع العمل الأساسي
        if (artworks.length === 0) {
            artworks = [{
                title: mainArtTitle,
                description: correctedDesc,
                image: correctedImage
            }];
            await setDoc(doc(db, "artworks", "mainArt"), {
                title: mainArtTitle,
                description: correctedDesc,
                image: correctedImage
            });
        } else {
            // التحقق من وجود العمل الأساسي وتحديثه في السحابة إذا لزم الأمر
            const existingArtIndex = artworks.findIndex(art => art.title === mainArtTitle);
            if (existingArtIndex !== -1) {
                artworks[existingArtIndex].image = correctedImage;
                artworks[existingArtIndex].description = correctedDesc;
                await setDoc(doc(db, "artworks", "mainArt"), artworks[existingArtIndex]);
            } else {
                artworks.unshift({
                    title: mainArtTitle,
                    description: correctedDesc,
                    image: correctedImage
                });
            }
        }

        // عرض الأعمال في الموقع بنفس الشكل تماماً
        container.innerHTML = ""; // تنظيف الحاوية أولاً
        artworks.forEach(art => {
            const card = document.createElement('div');
            card.className = 'art-card';
            card.innerHTML = `
                <img src="${art.image}" alt="${art.title}" loading="lazy">
                <div class="art-info">
                    <h3>${art.title}</h3>
                    <p>${art.description.replace(/\n/g, '<br>')}</p>
                </div>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error("خطأ في الاتصال بسحابة فايبريز: ", error);
    }
});
