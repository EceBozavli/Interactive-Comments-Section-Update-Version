const userComments = {
  "currentUser": {
    "image": { 
      "png": "./assets/img/Avatar.png",
      "webp": "./images/avatars/image-juliusomo.webp"
    },
    "username": "eceBozavli"
  },
  "comments": [
    {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "1 month ago",
      "score": 12,
      "user": {
        "image": { 
          "png": "./assets/img/Amy.png",
          "webp": "./images/avatars/image-amyrobson.webp"
        },
        "username": "amyrobson"
      },
      "replies": []
    },
    {
      "id": 2,
      "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      "createdAt": "2 weeks ago",
      "score": 5,
      "user": {
        "image": { 
          "png": "./assets/img/Max.png",
          "webp": "./images/avatars/image-maxblagun.webp"
        },
        "username": "maxblagun"
      },
      "replies": [
        {
          "id": 3,
          "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          "createdAt": "1 week ago",
          "score": 4,
          "replyingTo": "maxblagun",
          "user": {
            "image": { 
              "png": "./assets/img/Ramses.png",
              "webp": "./images/avatars/image-ramsesmiron.webp"
            },
            "username": "ramsesmiron"
          }
        },
        {
          "id": 4,
          "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          "createdAt": "2 days ago",
          "score": 2,
          "replyingTo": "ramsesmiron",
          "user": {
            "image": { 
              "png": "./assets/img/Julius.png",
              "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
          }
        }
      ]
    }
  ]
};

const commentsText = document.querySelector('.commentsText');
const addCommentText = document.querySelector('.addCommentText'); 
const sendBtn = document.querySelector('.sendBtn');

function renderComments() {
  const comments = userComments.comments;
  commentsText.innerHTML = comments.map(comment => {
    const isCurrentUser = comment.user.username === userComments.currentUser.username;
    const replies = comment.replies.map(reply => {
      const isCurrentUserReply = reply.user.username === userComments.currentUser.username;
      return `
        <div class="reply" data-reply-id="${reply.id}">
          <div class="replyInner">
            <div class="userDatas">
              <img src="${reply.user.image.png}" alt="${reply.user.username}" class="avatar" />
              <span class="username">${reply.user.username}</span>
              <span class="createdAt">${reply.createdAt}</span>
            </div>
            <div class="replyPart">
              ${isCurrentUserReply ? `
                <a href="#" class="deleteBtn" data-reply-id="${reply.id}"><img src="assets/img/delete-btn.png" class="icon">Delete</a>
                <a href="#" class="editBtn" data-reply-id="${reply.id}"><img src="assets/img/edit-btn.png" class="icon">Edit</a>
              ` : `
                <img src="assets/img/Reply.png" class="replyImg">
                <a href="#" class="replyBtn" data-reply-id="${reply.id}" data-comment-id="${comment.id}">Reply</a>
              `}
            </div>
          </div>
          <div class="content">
            <p>${reply.content}</p>
          </div>
        </div>
      `;
    }).join(''); 

    return `
      <div class="comment" data-comment-id="${comment.id}">
        <div class="commentInner">
          <div class="commentDatas">
            <img src="${comment.user.image.png}" alt="${comment.user.username}" class="avatar" />
            <span class="username">${comment.user.username}</span>
            <span class="createdAt">${comment.createdAt}</span>
          </div>
          <div class="replyPart">
            ${isCurrentUser ? `
              <a href="#" class="deleteBtn" data-comment-id="${comment.id}"><img src="assets/img/delete-btn.png" class="icon">Delete</a>
              <a href="#" class="editBtn" data-comment-id="${comment.id}"><img src="assets/img/edit-btn.png" class="icon">Edit</a>
            ` : `
              <img src="assets/img/Reply.png" class="replyImg">
              <a href="#" class="replyBtn" data-comment-id="${comment.id}">Reply</a>
            `}
          </div>
        </div>
        <div class="content">
          <p>${comment.content}</p>
        </div>
        <div class="replyForm" id="replyForm-${comment.id}" style="display: none;">
          <img src="assets/img/Avatar.png" class="avatarMe">
          <div>
              <input type="text" class="replyText" placeholder="Write your reply...">
              <button class="sendReplyBtn" data-comment-id="${comment.id}">Reply</button>
          </div>
        </div>
        ${replies ? `<div class="replies-container">${replies}</div>` : ''}  
      </div>
    `;
  }).join('');
}

commentsText.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('replyBtn')) {
    const commentId = e.target.getAttribute('data-comment-id');
    const replyForm = document.getElementById(`replyForm-${commentId}`);
    replyForm.style.display = replyForm.style.display === 'none' ? 'flex' : 'none';
  }
});

commentsText.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('sendReplyBtn')) {
    const replyTextArea = e.target.previousElementSibling;
    const commentId = e.target.getAttribute('data-comment-id');
    const replyContent = replyTextArea.value.trim();
    if (replyContent) {
      const newReply = {
        id: commentId + '-' + (userComments.comments[commentId - 1].replies.length + 1),
        content: replyContent,
        createdAt: "Just now", 
        score: 0,
        user: userComments.currentUser,
        replyingTo: userComments.comments[commentId - 1].user.username
      };

      userComments.comments[commentId - 1].replies.push(newReply);

      replyTextArea.value = '';
      renderComments();
    }
  }
});

sendBtn.addEventListener('click', function() {
  const newCommentContent = addCommentText.value.trim();
  if (newCommentContent) {
    const newComment = {
      id: userComments.comments.length + 1,
      content: newCommentContent,
      createdAt: "Just now", 
      score: 0,
      user: userComments.currentUser,
      replies: [] 
    };

    userComments.comments.push(newComment);

    addCommentText.value = '';
    renderComments();
  }
});

function showModal() {
  const modal = document.getElementById('deleteModal');
  modal.style.display = 'flex';
}

function hideModal() {
  const modal = document.getElementById('deleteModal');
  modal.style.display = 'none';
}

commentsText.addEventListener('click', function(e) {
  e.preventDefault();

  if (e.target && e.target.classList.contains('editBtn')) {
    const commentId = e.target.getAttribute('data-comment-id');
    const replyId = e.target.getAttribute('data-reply-id');
    const itemDiv = commentId ? document.querySelector(`.comment[data-comment-id="${commentId}"]`) : 
                                document.querySelector(`.reply[data-reply-id="${replyId}"]`);
    const contentDiv = itemDiv.querySelector('.content');
    
    const currentContent = contentDiv.querySelector('p').textContent.trim();
    contentDiv.innerHTML = `
      <textarea>${currentContent}</textarea>
      <button class="updateBtn" ${commentId ? `data-comment-id="${commentId}"` : `data-reply-id="${replyId}"`}>Update</button>
    `;
  }

  if (e.target && e.target.classList.contains('updateBtn')) {
    const commentId = e.target.getAttribute('data-comment-id');
    const replyId = e.target.getAttribute('data-reply-id');
    const itemDiv = commentId ? document.querySelector(`.comment[data-comment-id="${commentId}"]`) : 
                                document.querySelector(`.reply[data-reply-id="${replyId}"]`);
    const textarea = itemDiv.querySelector('textarea');
    const updatedContent = textarea.value.trim();

    if (updatedContent) {
      if (commentId) {
        const comment = userComments.comments.find(c => c.id == commentId);
        comment.content = updatedContent;
      } else if (replyId) {
        const reply = userComments.comments.flatMap(c => c.replies).find(r => r.id == replyId);
        reply.content = updatedContent;
      }
      renderComments();
    }
  }
});

commentsText.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('deleteBtn')) {
    const commentId = e.target.getAttribute('data-comment-id');
    const replyId = e.target.getAttribute('data-reply-id');
    showModal();

    const modalDeleteBtn = document.querySelector('.modalDeleteBtn');
    modalDeleteBtn.onclick = function() {
      if (commentId) {
        userComments.comments = userComments.comments.filter(c => c.id != commentId);
      } else if (replyId) {
        userComments.comments.forEach(comment => {
          comment.replies = comment.replies.filter(reply => reply.id != replyId);
        });
      }
      hideModal();
      renderComments();
    };
  }
});

const modalCancelBtn = document.querySelector('.modalCancelBtn');
modalCancelBtn.onclick = hideModal;

renderComments();