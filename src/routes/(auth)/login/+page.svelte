<script>
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';

    export let form;
    export let data;

    let email = '';
    let password = '';

    // Error Handling
    let emailError = false;
    let passwordError = false;

    function validate() {
        let isValid = true;

        if (email === '') {
            emailError = true;
            isValid = false;
        } else {
            emailError = false;
        }

        if (password === '') {
            passwordError = true;
            isValid = false;
        } else {
            passwordError = false;
        }

        return isValid;
    }

</script>

<h1>Login</h1>

<form class="authContainer" action="?/login" method="POST" use:enhance={({ cancel}) => {
    if(!validate()) {
        cancel();
    }

    return async ({ result }) => {
        invalidateAll();

        await applyAction(result);
    };
}}>
    <div>
        <input type="email" name="email" placeholder="Email" required bind:value={email}>
        {#if emailError}
            <div class="error">Email is required</div>
        {/if}
    </div>
    <div>
        <input type="password" name="password" placeholder="password" required bind:value={password}>
        {#if passwordError}
            <div class="error">Password is required</div>
        {/if}
    </div>
    {#if form?.invalid}
        <div class="error">Invalid username or password</div>
    {/if}
    <div>
        <button type="submit">Login</button>
    </div>
    <div>
        <p>Don't have an account? <a href="/register">Register Here</a></p>
    </div>
</form>

<style></style>