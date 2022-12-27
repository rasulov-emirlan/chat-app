<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { currentUser, pb } from "./pocketbase";

  let newMessage: string;
  let messages: any[] = [];
  let unsubscribe: () => void;

  onMount(async () => {
    const resultList = await pb.collection("messages").getList(1, 50, {
      sort: "created",
      expand: "user",
    });
    messages = resultList.items;

    unsubscribe = await pb.collection('messages').subscribe('*', async ({action, record}) => {
      if (action === 'create') {
        const user = await pb.collection('users').getOne(record.user);
        record.expand = { user };
        messages = [record, ...messages];
      }
      if (action === 'delete') {
        messages = messages.filter(m => m.id !== record.id);
      }
    })
  });

  onDestroy(() => {
    unsubscribe?.();
  });

  async function sendMessage() {
    const data = {
      text: newMessage,
      user: $currentUser?.id,
    };
    const createdMessage = await pb.collection("messages").create(data);
  }
</script>

<div class="h-screen p-12 flex flex-col">
  <div class="flex-1 flex flex-col gap-2">
    {#each messages as message}
    <div class="border border-[#edbb91] rounded-md overflow-hidden p-2">
      <img 
      src={`https://avatars.dicebear.com/api/identicon/${message.expand?.user?.username}.svg`} 
      alt="user avatar"
      class="w-10 h-10 rounded-full"
      />
      <div>
        Sent by 
        <span class="text-blue-500 underline">
          @{message.expand?.user?.username}
        </span>
      </div>
      <p>
        {message.text}
      </p>
    </div>
    {/each}
  </div>
    
  <form on:submit|preventDefault class="w-full h-12 flex justify-between rounded-md overflow-hidden border border-[#edbb91]">
    <input type="text" placeholder="type message here..." bind:value={newMessage} class="w-full p-2"/>
    <button on:click={sendMessage} class="w-1/3 bg-[#edbb91] hover:bg-[#b05977] text-[#b05977] hover:text-white font-extrabold">Send</button>
  </form>
</div>