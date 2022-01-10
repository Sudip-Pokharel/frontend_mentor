const datas = {
  currentUser: {
    image: {
      png: './images/avatars/image-juliusomo.png',
      webp: './images/avatars/image-juliusomo.webp',
    },
    username: 'juliusomo',
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: '1 month ago',
      score: 12,
      user: {
        image: {
          png: './images/avatars/image-amyrobson.png',
          webp: './images/avatars/image-amyrobson.webp',
        },
        username: 'amyrobson',
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: '2 weeks ago',
      score: 5,
      user: {
        image: {
          png: './images/avatars/image-maxblagun.png',
          webp: './images/avatars/image-maxblagun.webp',
        },
        username: 'maxblagun',
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: '1 week ago',
          score: 4,
          replyingTo: 'maxblagun',
          user: {
            image: {
              png: './images/avatars/image-ramsesmiron.png',
              webp: './images/avatars/image-ramsesmiron.webp',
            },
            username: 'ramsesmiron',
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: '2 days ago',
          score: 2,
          replyingTo: 'ramsesmiron',
          user: {
            image: {
              png: './images/avatars/image-juliusomo.png',
              webp: './images/avatars/image-juliusomo.webp',
            },
            username: 'juliusomo',
          },
        },
      ],
    },
  ],
};

/* MAIN */
const Main = () => {
  const [data, setData] = React.useState(
    JSON.parse(localStorage.getItem('INTERACTIVE_COMMENT_DATA')) || datas
  );
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentUser = data.currentUser;

  const addNewComment = (payload) => {
    if (!payload.commentContent) return;
    const tempData = { ...data, comments: [...data.comments] };

    const newComment = {
      score: 0,
      replies: [],
      id: new Date().getTime(),
      createdAt: `${new Date().getDate()} ${months[new Date().getMonth()]}`,
      user: { ...currentUser },
      content: payload.commentContent,
    };
    tempData.comments.push(newComment);
    setData(tempData);
  };

  const addReplyToComment = (payload) => {
    if (!payload.commentContent) return;
    const tempComment = [...data.comments];
    const commentId = payload.isComment ? payload.id : payload.commentId;
    const commentIndex = getCommentIndex(commentId);
    const targetComment = {
      ...tempComment.find((each) => each.id === commentId),
    };
    const tempTargetCommentReplies = [...targetComment.replies];
    let replyingTo = targetComment.user.username;
    if (!payload.isComment) {
      const targetReply = {
        ...targetComment.replies.find((each) => each.id === payload.id),
      };
      replyingTo = targetReply.user.username;
    }
    const newReply = {
      id: new Date().getTime(),
      content: payload.commentContent,
      createdAt: `${new Date().getDate()} ${months[new Date().getMonth()]}`,
      score: 0,
      replyingTo,
      user: { ...currentUser },
    };
    tempTargetCommentReplies.push({ ...newReply });
    targetComment.replies = tempTargetCommentReplies;
    tempComment[commentIndex] = targetComment;
    setData({ ...data, comments: tempComment });
  };

  const updateCommentScore = (payload) => {
    const tempComments = [...data.comments];
    const targetCommentIndex = getCommentIndex(
      payload.isComment ? payload.id : payload.commentId
    );
    if (payload.isComment) {
      const targetComment = tempComments[targetCommentIndex];
      targetComment.score =
        payload.action === 'plus'
          ? targetComment.score + 1
          : targetComment.score - 1;
      setData({ ...data, comments: [...tempComments] });
    } else {
      const targetReplyIndex = getReplyIndex(targetCommentIndex, payload.id);
      const targetReply = {
        ...tempComments[targetCommentIndex].replies[targetReplyIndex],
      };
      targetReply.score =
        payload.action === 'plus'
          ? targetReply.score + 1
          : targetReply.score - 1;
      tempComments[targetCommentIndex].replies[targetReplyIndex] = targetReply;
      setData({ ...data, comments: [...tempComments] });
    }
  };

  const updateCommentContent = (payload) => {
    if (!payload.commentContent) return;
    const tempComment = [...data.comments];
    const commentId = payload.isComment ? payload.id : payload.commentId;
    const commentIndex = getCommentIndex(commentId);
    const targetComment = {
      ...tempComment.find((each) => each.id === commentId),
    };
    if (!payload.isComment) {
      const tempTargetCommentReplies = [...targetComment.replies];
      const replyIndex = getReplyIndex(commentIndex, payload.id);
      const targetReply = {
        ...targetComment.replies.find((each) => each.id === payload.id),
      };
      targetReply.content = payload.commentContent;
      tempTargetCommentReplies[replyIndex] = targetReply;
      targetComment.replies = tempTargetCommentReplies;
      tempComment[commentIndex] = targetComment;
      setData({ ...data, comments: tempComment });
    } else {
      targetComment.content = payload.commentContent;
      tempComment[commentIndex] = targetComment;
      setData({ ...data, comments: tempComment });
    }
  };

  const getCommentIndex = (id) => {
    return data.comments.findIndex((each) => each.id === id);
  };

  const getReplyIndex = (commentIndex, id) => {
    return data.comments[commentIndex].replies.findIndex(
      (each) => each.id === id
    );
  };

  const onHandleCommentAction = (payload) => {
    console.log(payload);
    switch (payload.type) {
      case 'score':
        updateCommentScore(payload);
        break;
      case 'comment':
        if (payload.action === 'add') {
          addNewComment(payload);
        } else if (payload.action === 'reply') {
          addReplyToComment(payload);
        } else if (payload.action === 'update') {
          updateCommentContent(payload);
        }
        break;
      default:
        return;
    }
  };

  const comments = data.comments.map((comment) => (
    <CommentBox
      isComment
      {...comment}
      key={comment.id}
      currentUser={currentUser}
      handleCommentAction={(payload) => onHandleCommentAction(payload)}
    />
  ));

  return (
    <main className="main">
      <ul className="comment-list">{comments}</ul>
      <AddComment
        currentUser={currentUser}
        onHandleCommentAction={onHandleCommentAction}
      />
    </main>
  );
};

/* COMMENT BOX */
const CommentBox = ({
  id,
  user,
  score,
  content,
  replies,
  isComment,
  createdAt,
  currentUser,
  handleCommentAction,
}) => {
  const commentReplies = replies.map((reply) => (
    <Reply
      {...reply}
      commentId={id}
      isComment={false}
      key={reply.id}
      currentUser={currentUser}
      handleCommentAction={handleCommentAction}
    />
  ));
  return (
    <li>
      <Comment
        id={id}
        user={user}
        score={score}
        content={content}
        replies={replies}
        isComment={isComment}
        createdAt={createdAt}
        currentUser={currentUser}
        handleCommentAction={handleCommentAction}
      />
      {replies.length ? (
        <div className="comment__replies-list">{commentReplies}</div>
      ) : (
        ''
      )}
    </li>
  );
};

/* REPLIES */
const Reply = ({
  id,
  user,
  score,
  content,
  commentId,
  isComment,
  createdAt,
  replyingTo,
  currentUser,
  handleCommentAction,
}) => {
  return (
    <Comment
      id={id}
      user={user}
      score={score}
      content={content}
      commentId={commentId}
      isComment={isComment}
      createdAt={createdAt}
      replyingTo={replyingTo}
      currentUser={currentUser}
      handleCommentAction={handleCommentAction}
    />
  );
};

/* SCORE */
const Score = ({ id, score, commentId, isComment, handleCommentAction }) => {
  return (
    <div className="comment__score score">
      <svg
        width="11"
        height="11"
        xmlns="http://www.w3.org/2000/svg"
        className="score__plus"
        onClick={() =>
          handleCommentAction({
            id,
            isComment,
            commentId,
            type: 'score',
            action: 'plus',
          })
        }
      >
        <path
          d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
          fill="#C5C6EF"
        />
      </svg>
      <span className="score__point">{score}</span>
      <svg
        width="11"
        height="3"
        xmlns="http://www.w3.org/2000/svg"
        className="score__minus"
        onClick={() =>
          handleCommentAction({
            id,
            isComment,
            commentId,
            type: 'score',
            action: 'minus',
          })
        }
      >
        <path
          d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
          fill="#C5C6EF"
        />
      </svg>
    </div>
  );
};

/* COMMENT */
const Comment = ({
  id,
  user,
  score,
  content,
  commentId,
  isComment,
  createdAt,
  replyingTo,
  currentUser,
  handleCommentAction,
}) => {
  const [showCommentBox, setShowCommentBox] = React.useState(false);
  return (
    <div className="md-mar-bt">
      <article className={`comment${isComment ? '' : ' comment--reply'}`}>
        <Score
          id={id}
          score={score}
          commentId={commentId}
          isComment={isComment}
          handleCommentAction={handleCommentAction}
        />
        <div className="comment__main">
          <div className="comment__header">
            <div className="comment__info">
              <img src={user.image.webp} className="comment__user-image" />
              <span className="comment__user-name">{user.username}</span>
              {currentUser.username === user.username && (
                <span className="comment__self">you</span>
              )}
              <span className="comment__created_at">{createdAt}</span>
            </div>
            <div className="comment__action">
              {currentUser.username === user.username ? (
                <>
                  <input
                    type="button"
                    value="delete"
                    className="button button--delete"
                    onClick={() =>
                      handleCommentAction({
                        id,
                        isComment,
                        commentId,
                        type: 'comment',
                        action: 'delete',
                      })
                    }
                  />
                  <input
                    type="button"
                    value="edit"
                    className="button button--edit"
                    onClick={() => setShowCommentBox(!showCommentBox)}
                  />
                </>
              ) : (
                <input
                  type="button"
                  value="reply"
                  className="button button--reply"
                  onClick={() => setShowCommentBox(!showCommentBox)}
                />
              )}
            </div>
          </div>
          <div className="comment__content">
            {showCommentBox && currentUser.username === user.username ? (
              ''
            ) : (
              <p>
                {replyingTo ? (
                  <span className="comment__replying-to">
                    @{replyingTo}&nbsp;
                  </span>
                ) : (
                  ''
                )}
                {content}
              </p>
            )}
            {showCommentBox && currentUser.username === user.username ? (
              <AddComment
                id={id}
                commentId={commentId}
                isComment={isComment}
                editContent={content}
                currentUser={currentUser}
                setShowCommentBox={setShowCommentBox}
                onHandleCommentAction={handleCommentAction}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </article>
      {showCommentBox && currentUser.username !== user.username ? (
        <AddComment
          id={id}
          commentId={commentId}
          isComment={isComment}
          currentUser={currentUser}
          setShowCommentBox={setShowCommentBox}
          onHandleCommentAction={handleCommentAction}
          editContent={currentUser.username === user.username ? content : ''}
        />
      ) : (
        ''
      )}
    </div>
  );
};

/* ADD COMMENT */
const AddComment = ({
  id,
  commentId,
  isComment,
  currentUser,
  editContent,
  setShowCommentBox,
  onHandleCommentAction,
}) => {
  const [commentContent, setCommentContent] = React.useState(editContent || '');
  return (
    <div className={`comment-add${editContent ? ' comment-add--edit' : ''}`}>
      {!editContent && (
        <img src={currentUser.image.png} className="comment-add__user-image" />
      )}
      <textarea
        value={commentContent}
        placeholder="Add a comment..."
        className="textarea comment-add__textarea"
        onChange={(event) => setCommentContent(event.target.value)}
      ></textarea>
      <input
        type="button"
        className="button button--primary"
        value={editContent ? 'update' : 'send'}
        disabled={!commentContent}
        onClick={() => {
          onHandleCommentAction({
            id,
            commentId,
            isComment,
            commentContent,
            type: 'comment',
            action: editContent ? 'update' : id ? 'reply' : 'add',
          });
          setCommentContent('');
          if (setShowCommentBox) {
            setShowCommentBox(false);
          }
        }}
      />
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
