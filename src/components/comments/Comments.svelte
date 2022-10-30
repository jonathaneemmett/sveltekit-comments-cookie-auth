<script>
    // TODO: implement user integration
    
    import { comments } from '../../stores.js'
    import Comment from "./Comment.svelte";
    import CommentForm from "./CommentForm.svelte";

    import {addComment, deleteComment, updateComment} from '../../utilities/CommentFuncs.js';

    let activeComment = null;
    let rootComments = [];

    // Comments changes, rerun rootComments
    $: $comments, rootComments = $comments.filter(comment => comment.parentId === null);

    // Get replies to rootcomment
    function getReplies(id) {
        return $comments.filter(cmt => cmt.parentId !== null && cmt.parentId === id);
    }

</script>

<div class="comments">
    <h3 class="comments-title">Comments</h3>
    <div class="comment-form-title">Leave a comment</div>
    <CommentForm on:add={addComment} parentId={null}/>
    <div class="comments-container">
        {#each rootComments as comment}
            <Comment 
                comment={comment} 
                replies={getReplies(comment.id)}
                on:add={addComment}
                on:delete={deleteComment}
                on:update={updateComment}
                activeComment={activeComment}
                parentId={null}
            />
        {/each}
    </div>
</div>

<style>
    .comments {
        margin: 2rem auto;
        max-width: 800px;
        padding: 0 1rem;
    }
</style>