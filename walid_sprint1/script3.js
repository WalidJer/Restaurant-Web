// 3)---------------------------- REVIEW SCRIPT ---------------------------

window.addEventListener("DOMContentLoaded", () => {
    let stars = document.querySelectorAll('.star');
    let submitBtn = document.querySelector('#submit-comment');
    let commentList = document.querySelector('#comments-list');
    let currentRating = 0;

    
    loadReviewsFromLocalStorage();

   
    stars.forEach(star => {
        star.addEventListener('click', () => {
            currentRating = parseInt(star.getAttribute('value')); 
            updateRating(); 
        });
    });

   
    function updateRating() {
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute('value'));
            star.classList.toggle('selected', starValue <= currentRating); 
        });
    }

    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        
        let commentText = document.querySelector('#new-comment').value;
        let errorMessage = document.querySelector('#error-message');
        errorMessage.style.display = 'none';

      
        if (currentRating === 0) {
            showError("Please select a rating.");
            return;
        }
        if (commentText.trim() === "") {
            showError("Please write a comment.");
            return;
        }

        
        let review = {
            rating: currentRating,
            comment: commentText,
            id: Date.now() 
        };

        
        saveReviewToLocalStorage(review);

        displayReview(review);

       
        document.querySelector('#new-comment').value = "";
        currentRating = 0;
        updateRating();
    });

    
    function showError(message) {
        let errorMessage = document.querySelector('#error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';

        
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }

    function displayReview(review) {
        let commentElement = document.createElement("div");
        commentElement.classList.add("review-comment");
        commentElement.setAttribute("data-id", review.id);
    
        
        let ratingStars = document.createElement("div");
        ratingStars.classList.add("review-rating");
        for (let i = 1; i <= 5; i++) {
            let starSpan = document.createElement("span");
            starSpan.innerHTML = "&#9733;";  
            starSpan.classList.add("star");
            if (i <= review.rating) {
                starSpan.classList.add("selected"); 
            }
            ratingStars.appendChild(starSpan);
        }
    
        
        let commentTextElement = document.createElement("p");
        commentTextElement.textContent = review.comment;
    
        
        let deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = "&#128465;"; 
        deleteIcon.classList.add("delete-icon");
        deleteIcon.title = "Delete Comment"; 
        deleteIcon.addEventListener("click", (e) => {
            e.preventDefault();
            deleteReview(review.id); 
            commentElement.remove(); 
        });
    
        
        commentElement.appendChild(ratingStars);
        commentElement.appendChild(commentTextElement);
        commentElement.appendChild(deleteIcon);
    
        commentList.appendChild(commentElement);
    }

   
    function saveReviewToLocalStorage(review) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(review);
        localStorage.setItem("reviews", JSON.stringify(reviews));
    }

    
    function loadReviewsFromLocalStorage() {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.forEach(review => displayReview(review));
    }

 
    function deleteReview(id) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews = reviews.filter(review => review.id !== id); 
        localStorage.setItem("reviews", JSON.stringify(reviews)); 
    }
});




// -------------------------------------  Below Review script using classes -----------------------------------------------
                            //------------------------------------





// class Review {
//     constructor() {
        
//         this.commentList = document.querySelector('#comments-list');
//         this.stars = document.querySelectorAll('.star');
//         this.submitBtn = document.querySelector('#submit-comment');
//         this.clearBtn = document.querySelector('#clear-all');
//         this.errorMessage = document.querySelector('#error-message');
//         this.newComment = document.querySelector('#new-comment');
//         this.currentRating = 0;

     
//         Review.loadReviewsFromLocalStorage();
//         this.initEventListeners(); 
//     }

    
//     initEventListeners() {
//         this.stars.forEach(star => {
//             star.addEventListener('click', () => {
//                 this.currentRating = parseInt(star.getAttribute('value'));
//                 Review.updateRating(this.stars, this.currentRating);
//             });
//         });

//         this.submitBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             this.handleSubmit();
//         });

//         if (this.clearBtn) {
//             this.clearBtn.addEventListener('click', Review.clearAllReviews);
//         }
//     }

//     // Handle review submission
//     handleSubmit() {
//         const commentText = this.newComment.value.trim();
//         this.errorMessage.style.display = 'none';

//         if (this.currentRating === 0) {
//             this.errorMessage.textContent = "Please select a rating.";
//             this.errorMessage.style.display = 'block';
//             return;
//         }
//         if (commentText === "") {
//             this.errorMessage.textContent = "Please write a comment.";
//             this.errorMessage.style.display = 'block';
//             return;
//         }

//         const review = {
//             rating: this.currentRating,
//             comment: commentText,
//             id: Date.now() 
//         };

//         Review.saveReviewToLocalStorage(review);
//         Review.displayReview(review, this.commentList);

//         this.newComment.value = ""; 
//         this.currentRating = 0;
//         Review.updateRating(this.stars, this.currentRating);
//     }

    
//     static updateRating(stars, currentRating) {
//         stars.forEach(star => {
//             const starValue = parseInt(star.getAttribute('value'));
//             star.classList.toggle('selected', starValue <= currentRating);
//         });
//     }

    
//     static displayReview(review, commentList) {
//         const commentElement = document.createElement('div');
//         commentElement.classList.add('review-comment');
//         commentElement.setAttribute('data-id', review.id);

//         const ratingStars = document.createElement('div');
//         ratingStars.classList.add('review-rating');
//         for (let i = 1; i <= 5; i++) {
//             const starSpan = document.createElement('span');
//             starSpan.innerHTML = '&#9733;';
//             starSpan.classList.add('star');
//             if (i <= review.rating) starSpan.classList.add('selected');
//             ratingStars.appendChild(starSpan);
//         }

//         const commentTextElement = document.createElement('p');
//         commentTextElement.textContent = review.comment;

//         const deleteIcon = document.createElement('span');
//         deleteIcon.innerHTML = '&#128465;';
//         deleteIcon.classList.add('delete-icon');
//         deleteIcon.title = 'Delete Comment';
//         deleteIcon.addEventListener('click', () => {
//             Review.deleteReview(review.id);
//             commentElement.remove();
//         });

//         commentElement.appendChild(ratingStars);
//         commentElement.appendChild(commentTextElement);
//         commentElement.appendChild(deleteIcon);

//         commentList.appendChild(commentElement);
//     }

    
//     static saveReviewToLocalStorage(review) {
//         const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
//         reviews.push(review);
//         localStorage.setItem('reviews', JSON.stringify(reviews));
//     }

    
//     static loadReviewsFromLocalStorage() {
//         const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
//         const commentList = document.querySelector('#comments-list');
//         reviews.forEach(review => Review.displayReview(review, commentList));
//     }

    
//     static deleteReview(id) {
//         let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
//         reviews = reviews.filter(review => review.id !== id);
//         localStorage.setItem('reviews', JSON.stringify(reviews));
//     }

   
    
// }


// document.addEventListener('DOMContentLoaded', () => new Review());















