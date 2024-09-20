import React, { useState, useEffect } from 'react';
import './App.css';
import { Mistral } from '@mistralai/mistralai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const apiKey = process.env.MISTRAL_API_KEY || 'Q9wYLD8kvpWmXkYdpeDYGjpwfEbvAxOV';

const client = new Mistral({ apiKey: apiKey });


function App() {
  const [response, setResponse] = useState(""); // State for chat response
  const [userInput, setUserInput] = useState("woof"); // State for user input

  //////////////////////////
    useEffect(() => {
      async function fishUseEffect() {
        const SOCInfoChunks = await splitDocument();
        //console.log(SOCInfoChunks);
        if (SOCInfoChunks) {
          await createEmbeddings(SOCInfoChunks);
        }
      }
      fishUseEffect();
    }, []);
  
    async function splitDocument() {

      try {

        const response = await fetch('/SOCinfo.txt');
        const text = await response.text();

        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 250,
          chunkOverlap: 40,
        });
        
        const output = await splitter.createDocuments([text])

        const textArr = output.map(chunk => chunk.pageContent);
        //console.log(textArr);
        
        return textArr;

      } catch (err) {
        console.error('Something fishy going on when splitting document:', err);
      }
    }
  
  async function createEmbeddings(chunks) {

   try {

    const embeddings = await client.embeddings.create({
      model: 'mistral-embed',
      inputs: chunks, 

    });
    
    console.log(embeddings.data[0].embedding);

    const data = chunks.map((chunk, i) => {
      return {
          content: chunk,
          embedding: embeddings.data[i].embedding
      }
  });
  
  return data;

    } catch (error) {
      console.error('Something fishy going on when creating embeddings:', error);
    }
  }

  
    //////////////////////////

  // Handles user input changes
  function handleChange(event) { 
    setUserInput(event.target.value);
  }

  // Handles form submission and fetches chatbot response
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents page reload on form submit

    try {
      // Call the chat API with the user's input
      const chatResponse = await client.chat.complete({
        model: 'mistral-tiny',
        messages: [
          { role: 'system', content: `From now on, you are a very natural and kind person who has just completed the bootcamp at School of Code. You will kindly ask the user how they are doing in the bootcamp, which week they are in, and if there is anything they are finding difficult. If you see that they are interested in a particular topic, you will delve deeper into it. If they have any doubts, you will explain them perfectly, using examples, tables, step-by-step guides, and emojis. As an expert in all topics, you will respond naturally but technically to all the questions they ask, and be as accurate as possible about the content included in each week:
Please do not use exact wording from this syllabus, repharase each answer.` },
          { role: 'user', content: `${userInput}` }
        ],
        temperature: 0.7
      });

      // Set the chat response state to display it in the UI
      setResponse(chatResponse.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setResponse("Sorry, something went wrong.");
    }
  };

  return (
    <div className="container">
      <div className="logo-row">
        <h1>SOC DIGITAL BUDDY</h1>
        <h2>Learn from someone who has already walked the path.</h2>
      </div>

      <div className="response-box">
        <span>{response}</span> {/* Display chat response */}
      </div>

      <form onSubmit={handleSubmit}>
        <input 
          value={userInput}
          name="query"
          onChange={handleChange}
          placeholder="Ask a question..." 
          className="user-input" 
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default App;
