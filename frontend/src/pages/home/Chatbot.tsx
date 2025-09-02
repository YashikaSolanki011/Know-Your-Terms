import React, { useState, useEffect, useRef } from 'react';
import hammer from "../../assets/hammer-Photoroom.png"
import { geminiKey } from '../../utils/baseApi';

// Define the shape of a message object
interface Message {
    text: string;
    sender: 'user' | 'bot';
    isTyping?: boolean;
    citations?: { uri: string; title: string }[];
}

const Chatbot: React.FC = () => {
    // State to control chatbot visibility
    const [isOpen, setIsOpen] = useState(false);
    
    // State to hold the conversation messages
    const [messages, setMessages] = useState<Message[]>([
        {
            text: 'Hello! I am a chatbot specialized in Indian legal inquiries. How can I help you?',
            sender: 'bot',
        },
    ]);
    const [input, setInput] = useState(''); // State for the user's input field
    const chatContainerRef = useRef<HTMLDivElement>(null); // Ref to the chat container for scrolling

    // Effect to scroll to the bottom whenever a new message is added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Function to handle sending a message
    const sendMessage = async () => {
        const userMessageText = input.trim();
        if (!userMessageText) return;

        // 1. Dynamically add the user's message
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: userMessageText, sender: 'user' },
        ]);
        setInput(''); // Clear the input field

        // 2. Show a "typing" indicator for the bot
        const typingMessage: Message = { text: '', sender: 'bot', isTyping: true };
        setMessages((prevMessages) => [...prevMessages, typingMessage]);

        try {
            // Get API key from environment variables
            if (!geminiKey) {
                console.error('Gemini API key is not set. Please check your .env file.');
                throw new Error('API key is not configured');
            }
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiKey}`;

            const systemPrompt = "Act as an expert in Indian legal topics, with a focus on providing detailed and comprehensive answers. If a query is unrelated to Indian law, start by reading whether the user is a student, a startup owner, or a citizen, and respond accordingly to their further questions. Politely inform the user that you can only assist with legal topics and recommend that they consult another resource for their specific question. If necessary, remind the user that you are not a lawyer and cannot provide legal advice. Provide answers in approximately 75 words.";

            const payload = {
                contents: [{ parts: [{ text: userMessageText }] }],
                tools: [{ "google_search": {} }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            const candidate = result.candidates?.[0];
            const botResponseText = candidate?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t generate a response. Please try again.';

            // 3. Add citations if available
            const groundingMetadata = candidate?.groundingMetadata;
            let sources: { uri: string; title: string }[] = [];
            if (groundingMetadata && groundingMetadata.groundingAttributions) {
                sources = groundingMetadata.groundingAttributions
                    .map((attribution: any) => ({
                        uri: attribution.web?.uri,
                        title: attribution.web?.title,
                    }))
                    .filter(
                        (source: { uri: any; title: any }) =>
                            source.uri && source.title
                    );
            }

            // Remove the typing message and add the actual bot response with citations
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                newMessages.pop(); // Remove the typing indicator
                newMessages.push({
                    text: botResponseText,
                    sender: 'bot',
                    citations: sources,
                });
                return newMessages;
            });
        } catch (error) {
            console.error('API Error:', error);
            // In case of an error, remove typing and show an error message
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                newMessages.pop();
                newMessages.push({
                    text: 'An error occurred. Please try again.',
                    sender: 'bot',
                });
                return newMessages;
            });
        }
    };

    // Handle Enter key press
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating chat button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#e5e7eb] via-[#f3f4f6] to-[#f9fafb] hover:from-[#e0e7ef] hover:via-[#f3f4f6] hover:to-[#f9fafb] rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-50 p-2 overflow-hidden border border-[#b1b4b6]"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <img 
                        src={hammer} 
                        alt="Legal Chat"
                        className="w-full h-full object-cover"
                    />
                )}
            </button>

            {/* Chat window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[85vw] h-[70vh] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] xl:w-[30vw] max-w-lg min-w-[280px] min-h-[400px] max-h-[600px] z-50">
                    <div className="bg-white rounded-2xl shadow-xl flex flex-col h-full">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#e5e7eb] via-[#f3f4f6] to-[#f9fafb] text-gray-800 p-3 rounded-t-2xl shadow-md flex items-center justify-between border-b border-[#e0e3ef]">
                            <div className="flex items-center">
                                <img 
                                    src={hammer} 
                                    alt="KYT Logo"
                                    className="h-8 w-8 mr-2 object-contain"
                                />
                                <h1 className="text-lg font-bold text-green-800">KYT</h1>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-green-600 hover:text-green-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Disclaimer */}
                        <div className="p-2 bg-[#e8eaf6] text-gray-700 rounded-lg text-xs m-2 border border-[#c5cae9]">
                            <p className="font-bold text-[#1a7e38]">Disclaimer:</p>
                            <p>
                                The information provided is for general knowledge only and should not
                                be considered legal advice. 
                            </p>
                        </div>

                        {/* Chat Messages */}
                        <div
                            ref={chatContainerRef}
                            className="flex-grow p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 overflow-y-auto scroll-smooth"
                        >
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={`message-bubble max-w-[80%] p-2 text-sm rounded-2xl relative ${
                                            msg.sender === 'user'
                                                ? 'bg-gradient-to-r from-[#e5e7eb] via-[#f3f4f6] to-[#f9fafb] text-gray-800 rounded-br-sm border border-[#e0e3ef]'
                                                : 'bg-[#f5f7fa] text-gray-800 rounded-bl-sm border border-[#e0e3ef]'
                                        }`}
                                    >
                                        {msg.isTyping ? (
                                            <span className="typing-indicator-container">
                                                <span className="dot-flashing bg-gray-600"></span>
                                            </span>
                                        ) : (
                                            <>
                                                <p className="whitespace-pre-line">
                                                    {msg.text.split('**').map((part, index) => {
                                                        // If it's an even index, it's regular text
                                                        // If it's an odd index, it's bold text
                                                        return index % 2 === 0 ? (
                                                            // Regular text: remove extra spaces
                                                            part.replace(/\s+/g, ' ')
                                                        ) : (
                                                            // Bold text: wrap in strong tag and remove extra spaces
                                                            <strong key={index} className="font-bold">
                                                                {part.replace(/\s+/g, ' ')}
                                                            </strong>
                                                        );
                                                    })}
                                                </p>
                                                {msg.citations && msg.citations.length > 0 && (
                                                    <div className="mt-2 text-xs text-gray-500">
                                                        Sources:{" "}
                                                        {msg.citations.map((source, idx) => (
                                                            <a
                                                                key={idx}
                                                                href={source.uri}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="underline hover:no-underline"
                                                            >
                                                                [{idx + 1}]
                                                                {new URL(source.uri).hostname}{" "}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-2 bg-[#f5f7fa] rounded-b-2xl border-t border-[#e0e3ef]">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-grow p-2 text-sm rounded-full border-2 border-[#c5cae9] focus:outline-none focus:ring-2 focus:ring-[#1a237e] transition-all bg-white"
                                    placeholder="Ask a question about Indian law..."
                                />
                                <button
                                    onClick={sendMessage}
                                    className="p-2 bg-[#1a7e38] hover:bg-[#1a7e38] text-white rounded-full shadow-lg transition-all"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;