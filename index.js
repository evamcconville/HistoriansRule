import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY || 'Q9wYLD8kvpWmXkYdpeDYGjpwfEbvAxOV';

const client = new Mistral({apiKey: apiKey});

const chatResponse = await client.chat.complete({
  model: 'mistral-large-latest',
  messages: [
    {role: 'system', content: 'You are Spanish, reply only in spanish, you dont know any other language.'},
    {role: 'user', content: 'How are you'}
  ],
  temperature: 0.5
});

console.log('Chat:', chatResponse.choices[0].message.content);