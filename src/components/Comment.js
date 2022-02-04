import React, { useState } from 'react';
import CommentForm from './CommentForm';

function Comment({
    comment,
    replies,
    childClass = "",
    currentUserID,
    deleteComment,
    activeComment,
    updateComment,
    parentID = null,
    addComment,
    setActiveComment }) {
    const canReply = currentUserID !== comment.userID;
    const canEditDelete = currentUserID === comment.userID;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const isReplying = activeComment && activeComment.id == comment.id && activeComment.type == 'replying'
    const isEditing = activeComment && activeComment.id == comment.id && activeComment.type == 'editing'
    const replyID = parentID ? parentID : comment.id
    const [commentScore,setCommentScore] = useState(comment.score);
    return (
        <div>
            {!isEditing && <div className={`comments ${childClass}`}>
                <div className="vote">
                    <span className="material-icons-outlined score" onClick={()=>setCommentScore((prevCommentScore)=>prevCommentScore+1)}>add</span>
                    <span>{commentScore}</span>
                    <span className="material-icons-outlined score" onClick={()=>setCommentScore((prevCommentScore)=>prevCommentScore-1)}>remove</span>
                </div>
                <div className="comment">
                    <div className="comment-header">
                        <img src={comment.user.image.png} alt="" className="comment-user-pic" />
                        <p className="comment-username">{comment.username}</p>
                        <p className="comment-created-at">{createdAt}</p>
                        {canReply && (
                            <div className="reply-section" onClick={() => setActiveComment({
                                id: comment.id,
                                type: "replying"
                            })}>
                                <span className="material-icons-outlined">reply</span>
                                <p>Reply</p>
                            </div>
                        )}
                        {canEditDelete && (
                            <div className="edit-delete-section">
                                <div className="delete" onClick={() => deleteComment(comment.id)}>
                                    <span className="material-icons">delete</span>
                                    <p>Delete</p>
                                </div>
                                <div className="edit" onClick={() => setActiveComment({
                                    id: comment.id,
                                    type: "editing"
                                })}>
                                    <span className="material-icons">edit</span>
                                    <p>Edit</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="comment-body">
                        <p>{comment.content}</p>
                    </div>
                </div>
            </div>}
            {isReplying && (
                <CommentForm
                    submitLabel="Reply"
                    handleSubmit={(text) => addComment(text, replyID)}
                    replyClass='reply-comment'
                />
            )}
            {isEditing && (
                <CommentForm
                    submitLabel="Update"
                    handleSubmit={(text) => updateComment(text, comment.id)}
                    replyClass='reply-comment'
                    handleCancelButton={true}
                    handleCancel={() => setActiveComment(null)}
                    initialText={comment.content}
                />
            )}
            {replies.length > 0 && replies.map(reply => (
                <Comment
                    key={reply.id}
                    comment={reply}
                    replies={[]}
                    childClass="comments-child"
                    currentUserID={currentUserID}
                    deleteComment={deleteComment}
                    activeComment={activeComment}
                    parentID={comment.id}
                    addComment={addComment}
                    updateComment={updateComment}
                    setActiveComment={setActiveComment}
                />
            ))}
        </div>
    );
}

export default Comment;