<script>
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
	import { dataset_dev } from 'svelte/internal';
    console.log($page);
</script>

<nav>
    <ul>
        {#if $page?.data?.user}
            <li>
                <form action="/logout" method="post">
                    <button type="submit" class="logoutButton">
                        Logout 
                    </button>
                </form> 
            </li>
        {/if}
        {#if !$page?.data?.user}
            <li><a href="/login">Login</a></li>
        {/if}
    </ul>
</nav>

<style>
    nav {
        color: #fff;
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
    }

    ul {
        list-style: none;
        display: flex;
        align-items: center;
    }

    li {
        margin-left: 1rem;
    }

    a {
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        font-weight: 600;
        letter-spacing: 1px;
        font-size: 2rem;
        margin: 0 1.5rem 0 0 ;
        width: 2rem;
    }

    a:hover {
        color: rgba(129, 205, 198, 1);
    }

    .logoutButton {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        font: inherit;
        padding: 0;
        font-weight: 600;
        letter-spacing: 1px;
        font-size: 1.1rem
    }

    .logoutButton:hover {
        color: rgba(129, 205, 198, 1);
    }
</style>