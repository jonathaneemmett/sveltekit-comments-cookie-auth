<script>
    import { enhance } from '$app/forms';
    export let form;
    export let data;

    let name = '';
    let email = '';
    let password = '';
    let password2 = '';

    let nameError = false; 
    let emailError = false;
    let passwordError = false;
    let password2Error = false;


    function validate() {
        let isValid = true;

        if(name.length < 3){
            nameError = true;
            isValid = false;
        } else {
            nameError = false;
        }

        if(email.length < 3){
            emailError = true;
            isValid = false;
        } else {
            emailError = false;
        }

        if(password.length < 8){
            passwordError = true;
            isValid = false;
        } else {
            passwordError = false;
        }

        if(password2 !== password){
            password2Error = true;
            isValid = false;
        } else {
            password2Error = false;
        }


        return isValid;
    }

</script>

<h1>Register</h1>

<form class="authContainer" action="?/register" method="POST" use:enhance={({ cancel }) => {
    if(!validate()) cancel();
}}>
    <div>
        <input type="text" name="name" placeholder="Name" bind:value={name}>
        {#if nameError}
            <div class="error">Name is required.</div>
        {/if}
    </div>
    <div>
        <input type="email" name="email" placeholder="Email" required bind:value={email}/>
        {#if emailError}
            <div class="error">Email is required.</div>
        {/if}
    </div>
    <div>
        <input type="password" name="password" placeholder="Password" required  bind:value={password}/>
        {#if passwordError}
            <div class="error">Password must be over 8 characters.</div>
        {/if}
    </div>
    <div>
        <input type="password" name="password2" placeholder="Confirm Password" required bind:value={password2}/>
        {#if password2Error}
            <div class="error">Passwords must match.</div>
        {/if}
    </div>

    {#if form?.user}
        <div class="error">Email is already in use.</div>
    {/if}
    <div>
        <button type="submit">Register</button>
    </div>
    <div>
        <p>Already have an account? <a href="/login">Login Here</a></p>
    </div>
</form>

<style>
    
</style>