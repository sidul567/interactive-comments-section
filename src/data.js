export async function getComments() {
  return [
    {
      id: "1",
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "2021-08-16T23:00:33.010+02:00",
      "score": 12,
      "user": {
        "image": {
          "png": "../images/avatars/image-amyrobson.png",
          "webp": "../images/avatars/image-amyrobson.webp"
        },
        "username": "amyrobson"
      },
      userID: "1",
      parentID: null
    },
    {
      id: "2",
      "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      "createdAt": "2021-08-16T23:00:33.010+02:00",
      "score": 5,
      "user": {
        "image": {
          "png": "../images/avatars/image-maxblagun.png",
          "webp": "../images/avatars/image-maxblagun.webp"
        },
        "username": "maxblagun"
      },
      userID: "2",
      parentID: null
    },
    {
      id: "3",
      "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      "createdAt": "2021-08-16T23:00:33.010+02:00",
      "score": 4,
      "replyingTo": "maxblagun",
      "user": {
        "image": {
          "png": "../images/avatars/image-ramsesmiron.png",
          "webp": "../images/avatars/image-ramsesmiron.webp"
        },
        "username": "ramsesmiron"
      },
      userID: "3",
      parentID: "2"
    },
    {
      id: "4",
      "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      "createdAt": "2021-08-16T23:00:33.010+02:00",
      "score": 2,
      "replyingTo": "ramsesmiron",
      "user": {
        "image": {
          "png": "../images/avatars/image-juliusomo.png",
          "webp": "../images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo",
      },
      userID: "4",
      parentID: "2"
    }
  ]
}

export async function createComment(text, parentID = null) {
  return {
    "id": Math.random().toString(36).substring(2,9),
    "content": text,
    "createdAt": new Date().toISOString(),
    "score": Number(Math.random().toString(10).substring(2,3)),
    "replyingTo": "ramsesmiron",
    "user": {
      "image": {
        "png": "../images/avatars/image-juliusomo.png",
        "webp": "../images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo",
    },
    "userID": "4",
    parentID
  }
}

export async function updateComment(text){
  return {text}
}

export async function deleteComment(){
  return {}
}