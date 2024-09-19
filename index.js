import MistralClient from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY || 'Q9wYLD8kvpWmXkYdpeDYGjpwfEbvAxOV';
const client = new MistralClient(apiKey);

console.log('Mistral Client:', client);