<script>
    import { page } from '$app/stores';
    import { comments } from '../../stores.js'
    import Comment from "./Comment.svelte";
	import CommentForm from "./CommentForm.svelte";
    import { addComment, deleteComment, updateComment, timeSincePost } from '../../utilities/CommentFuncs.js';

    export let comment;
    export let activeComment = null;
    export let replies = [];
    export let parentId;
    
    // Helper Functions
    const fiveMinutesAgo = 300000; // 5 minutes in milliseconds
    const timePassed = new Date().getTime() - new Date(comment.createdAt).getTime() > fiveMinutesAgo;
    
    const canReply = Boolean($page?.data?.user?.email);
    const canEdit = $page?.data?.user?.email === comment.username && !timePassed;    
    const canDelete = $page?.data?.user?.email === comment.username && !timePassed;
    
    let isEditing = activeComment && activeComment.type === 'editing' ? activeComment.id === comment.id : false;
    let isReplying = activeComment && activeComment.type === 'replying' ? activeComment.id === comment.id : false;
    let replyId = parentId ? parentId : comment.id;

    $: activeComment, isEditing = activeComment && activeComment.type === 'editing' ? activeComment.id === comment.id : false;
    $: activeComment, isReplying = activeComment && activeComment.type === 'replying' ? activeComment.id === comment.id : false;
    $: parentId, replyId = parentId ? parentId : comment.id;

    function handleClose() {
        activeComment = null;
        isReplying = false;
    }

</script>

<div class="comment">
    <div class="comment-image-container">
        <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="User image" class="comment-image" />
    </div>
    <div class="comment-right-part">
        <div class="comment-header">
            <span class="comment-author">{comment.username || 'Anonymous'}</span>
            <span class="comment-time">{timeSincePost(comment.createdAt)}</span>
        </div>
        {#if !isEditing}
            <div class='comment-text'>{comment.body}</div>
        {:else}
            <CommentForm on:add={addComment} on:update={updateComment} parentId={parentId} comment={comment} text={comment.body} hasCancelButton={true} on:close={handleClose}/>
        {/if}
        <div class="comment-actions">
            {#if canReply}
                <button type="button" on:click={() => {
                    activeComment = {id: comment.id, type: "replying"};
                }}>Reply</button>
            {/if}
            {#if canEdit}
                <button type="button" on:click={() => {
                    activeComment = {id: comment.id, type: "editing"};
                }}>Edit</button>
            {/if}
            {#if canDelete}
                <button type="button" on:click={() => deleteComment(comment.id)}>Delete</button>
            {/if} 
        </div>
        {#if isReplying}
            <CommentForm on:add={addComment} parentId={replyId} hasCancelButton={true} on:close={handleClose} />
        {/if}
        <div class="replies">
            {#each replies as reply}
                <Comment 
                    comment={reply} 
                    replies={[]} 
                    on:add={addComment} 
                    on:delete={deleteComment} 
                    on:update={updateComment} 
                    activeComment={activeComment} 
                    parentId={replyId} 
                />
            {/each}
        </div>
    </div>
</div>

<style>
    .comment {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 28px;
    }

    .comment-image-container {
        margin-right: 12px;
        width: 10vh
    }

    .comment-image-container img {
        width: 100%;
        max-width: 75px;
        height: auto;
        border-radius: 50%;
    }

    .comment-right-part {
        width: 100%;
        max-width: 85vw;
    }

    .comment-header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 8px;
        gap: 1rem;
    }

    .comment-author {
        font-size: 20px;
        font-weight: 600;
        color: rgb(59, 130, 246);
    }

    .comment-time {
        font-size: 14px;
        color: rgba(97, 96, 97, 0.6);
    }

    .comment-text {
        width: 100%;
        max-width: 50vw;
        font-size: 18px;
        word-wrap: break-word;
        padding: .5rem 1rem 0 0;
    }

    .comment-actions {
        display: flex;
        flex-direction: row;
        margin-top: 8px;
        gap: 1rem
    }

    button {
        background: none;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 1rem 0;
        font-size: 1rem;
        cursor: pointer;
    }

    button:hover {
        color: rgba(0, 0, 0, 0.5);
    }
</style>