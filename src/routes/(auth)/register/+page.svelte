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

        if(handle.length < 3){
            handleError = true;
            isValid = false;
        } else {
            handleError = false;
        }

        return isValid;
    }

</script>

<h1>Register</h1>

<form action="?/register" method="POST" use:enhance={({ cancel }) => {
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
        <p>Already have an account? <a on:click|preventDefault={toggle}>Login Here</a></p>
    </div>
</form>

<style>
    h1 {
        font-size: 3rem;
        font-weight: 900;
        padding: 1.5rem 1rem;
    }

    h2 {
        font-size: 2rem;
        font-weight: 900;
        padding: 1.5rem 1rem;
    }

    div {
        width: 100%;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
    }

    input {
        width: 100%;
        padding: 1.2rem;
        margin: .5rem 0;
        border: none;
        border-radius: 5px;
        color: rgba(21, 21, 21, 1)
    }

    ::placeholder {
        font-size: 1rem;
    }

    button {
        width: 100%;
        padding: 1.2rem;
        margin: 1rem 0;
        border: none;
        border-radius: 5px;
        color: rgba(255, 255, 255, .8);
        background: #2f2830;
        font-weight: 900;
        font-size: 1.2rem;
    }

    p {
        font-size: 1.1rem;
        font-weight: 900;
        padding: 1rem 0;
    }

    a {
        color:  rgba(179, 224, 220, 1);
        font-weight: 900;
        text-decoration: none;
        cursor: pointer;
    }

    a:hover {
        color: rgba(129, 205, 198, 1)
    }
</style>