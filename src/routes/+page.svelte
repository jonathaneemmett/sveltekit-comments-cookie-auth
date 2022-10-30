<script>
    import Comments from "../components/comments/Comments.svelte";
	import Navbar from "../components/layout/Navbar.svelte";
</script>

<div class="content">
    <Navbar />
    <Comments />
</div>

<style>
    .content {
        max-width: 800px;
        margin: 0 auto;
    }
</style>
