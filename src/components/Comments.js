import React, { useEffect, useState } from 'react';
import {
    getComments as getCommentData,
    createComment as createCommentApi,
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi
} from '../data';
import Comment from './Comment';
import CommentForm from './CommentForm';

function Comments({currentUserID}) {
    const [backendComments, setBackendComments] = useState([]);
    const rootComments = backendComments.filter(backendComment=>backendComment.parentID===null);
    const [activeComment, setActiveComment] = useState({
        id: "",
        type: ""
    });
    function getReplies(commentID){
        return backendComments.filter(backendComment=>backendComment.parentID===commentID);
    }
    function addComment(text,parentID){
        console.log("Add comment: "+text+" "+parentID);
        createCommentApi(text,parentID).then((comment)=>{
            setBackendComments([comment,...backendComments]);
            setActiveComment(null)
        })
    }
    function updateComment(text,commentID){
        updateCommentApi(text,commentID).then(()=>{
            const updateComments = backendComments.map(backendComment=>{
                if(backendComment.id===commentID){
                    return {...backendComment,content: text}
                }
                return backendComment
            })
            setBackendComments(updateComments);
            setActiveComment(null);
        })
    }
    function deleteComment(commentID){
        if(window.confirm("Are you want to sure delete this comment?")){
            deleteCommentApi(commentID).then(()=>{
                const updateBackendComments = backendComments.filter(backendComment=>backendComment.id!=commentID);
                setBackendComments(updateBackendComments)
            })
        }
    }
    useEffect(()=>{
        getCommentData().then((data)=>{
            setBackendComments(data);
        })
    },[])
  return (
  <>
    <div className='container'>
        {
            rootComments.map((rootComment)=>(
                <Comment
                    key = {rootComment.id}
                    comment = {rootComment}
                    replies = {getReplies(rootComment.id)}
                    currentUserID = {currentUserID}
                    deleteComment = {deleteComment}
                    activeComment = {activeComment}
                    parentID={rootComment.id}
                    addComment={addComment}
                    updateComment={updateComment}
                    setActiveComment = {setActiveComment}
                />
            ))
        }
    </div>
    <CommentForm handleSubmit={addComment} submitLabel="Send" />
  </>);
}

export default Comments;
