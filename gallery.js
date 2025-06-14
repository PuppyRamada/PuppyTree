// Gallery configuration
const galleryConfig = {
    images: [
        'images/gallery/523d964983fb0010fccada140a9ade74_0.jpeg',
        'images/gallery/Snapchat-96897707.jpg',
        'images/gallery/Snapchat-2146409222.jpg',
        'images/gallery/Snapchat-255920516.jpg',
        'images/gallery/Snapchat-25662063.jpg',
        'images/gallery/Snapchat-251710033.jpg',
        'images/gallery/Snapchat-1025160323.jpg',
        'images/gallery/Snapchat-1961141993.jpg',
        'images/gallery/Snapchat-1843388144.jpg',
        'images/gallery/Snapchat-1345781232.jpg',
        'images/gallery/Snapchat-1241343085.jpg',
        'images/gallery/Snapchat-363530325.jpg',
        'images/gallery/Snapchat-2044345080.jpg',
        'images/gallery/Snapchat-996700476.jpg',
        'images/gallery/Snapchat-186918907.jpg'
    ]
};

function toggleGallery() {
    const gallery = document.getElementById('gallery');
    gallery.classList.toggle('active');
    
    if (gallery.classList.contains('active') && !gallery.hasAttribute('data-loaded')) {
        loadGallery();
        gallery.setAttribute('data-loaded', 'true');
    }
}

function loadGallery() {
    const gridContainer = document.querySelector('.gallery-grid');
    gridContainer.innerHTML = ''; // Clear existing content
    
    galleryConfig.images.forEach(imagePath => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'Gallery Image';
        
        // Add loading animation
        img.onload = () => {
            item.classList.add('loaded');
        };
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-item-overlay';
        
        item.appendChild(img);
        item.appendChild(overlay);
        gridContainer.appendChild(item);

        // Handle click to view full size
        item.addEventListener('click', () => {
            openFullSize(imagePath);
        });
    });
}

function openFullSize(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalImg = document.createElement('img');
    modalImg.src = imageSrc;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '×';
    
    modalContent.appendChild(modalImg);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal when clicking outside the image or on the close button
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === closeBtn) {
            modal.remove();
        }
    });
} 