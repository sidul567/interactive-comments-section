import React, { useState } from 'react';

function CommentForm({
  handleSubmit,
  submitLabel,
  replyClass="",
  handleCancelButton=false,
  initialText="",
  handleCancel
}) {

    const [text,setText] = useState(initialText);
    function onSubmit(e){
        e.preventDefault();
        handleSubmit(text);
        setText("")
    }

  return (<form action="#" onSubmit={onSubmit} className={replyClass}>
    <div className="form">
      <img src="../images/avatars/image-juliusomo.png" alt="" />
      <textarea name="textarea" id="" cols="30" rows="5" value={text} placeholder="Add a comment..." onChange={(e)=>setText(e.target.value)}></textarea>
      <input type="submit" value={submitLabel} disabled={text==""} />
      {handleCancelButton && <input type="button" onClick={handleCancel} value="Cancel" />}
    </div>
  </form>
  );
}

export default CommentForm;
