<script lang="ts">
	import { currentUser, pb } from "./pocketbase";

  let username: string;
  let password: string;

  async function login() {
    await pb.collection("users").authWithPassword(
      username,
      password
    );
  }

  async function signUp() {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
        createdAt: new Date()
      };
      const createdUser = await pb.collection("users").create(data);
      await login();
    } catch (error) {
      console.log(error);
    }
  }

  function signOut() {
    pb.authStore.clear();
  }

</script>

{#if $currentUser}

  <p>
    Signed in as {$currentUser.username}
  </p>

{:else}

  <form on:submit|preventDefault class="max-w-2xl mx-auto h-[600px] rounded-md bg-gray-200 ">
    <label for="username">Username</label>
    <input type="text" id="username" bind:value={username} />

    <label for="password">Password</label>
    <input type="password" id="password" bind:value={password} />

    <button type="submit" on:click={login}>Sign in</button>
    <button type="button" on:click={signUp}>Sign up</button>
  </form>

{/if}