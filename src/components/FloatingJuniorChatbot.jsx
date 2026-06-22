import { useEffect, useRef, useState } from 'react';
import { CloseIcon, SearchIcon, SparklesIcon } from './icons';
import { AI_FAQ_SUGGESTIONS, findBestFaqAnswer } from '../utils/aiFaqKnowledge';

const welcomeMessage = {
  id: 'junior-welcome',
  role: 'assistant',
  title: 'Junior',
  body: 'Hi, I’m Junior, the Creativity Natural Foods helper. I can answer questions about ordering, delivery, payment, products, storage, tracking, and WhatsApp checkout. How may I help you today?',
  confidence: null,
  actions: [
    { label: 'Start WhatsApp order', page: 'checkout', variant: 'primary' },
    { label: 'Browse products', page: 'shop', variant: 'outline' },
  ],
  matchedKeywords: [],
};

function makeAssistantMessage(result) {
  return {
    id: `junior-assistant-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role: 'assistant',
    title: result.title || 'Junior',
    body: result.answer,
    confidence: result.confidence,
    actions: result.actions || [],
    matchedKeywords: result.matchedKeywords || [],
  };
}

function makeUserMessage(text) {
  return {
    id: `junior-user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role: 'user',
    body: text,
  };
}

export function FloatingJuniorChatbot({ setPage, mode = 'dark' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([welcomeMessage]);
  const conversationRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !conversationRef.current) return;
    conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }, [isOpen, messages]);

  function askJunior(customQuestion) {
    const text = (customQuestion || question).trim();
    if (!text) return;

    const result = findBestFaqAnswer(text);
    setMessages((current) => [
      ...current,
      makeUserMessage(text),
      makeAssistantMessage(result),
    ].slice(-12));
    setQuestion('');
  }

  function submitQuestion(event) {
    event.preventDefault();
    askJunior();
  }

  function handleAction(action) {
    if (action?.page) {
      setPage?.(action.page);
      setIsOpen(false);
    }
  }

  return (
    <div className={`junior-chatbot ${isOpen ? 'is-open' : ''}`} aria-live="polite" data-mode={mode}>
      {isOpen && (
        <section className="junior-chat-panel" aria-label="Junior customer help chatbot">
          <header className="junior-chat-header">
            <span className="junior-chat-avatar"><SparklesIcon /></span>
            <div>
              <p>Junior</p>
              <small>Customer helper · FAQ assistant</small>
            </div>
            <button type="button" className="junior-chat-close" onClick={() => setIsOpen(false)} aria-label="Close Junior chat">
              <CloseIcon />
            </button>
          </header>

          <div className="junior-chat-messages" ref={conversationRef}>
            {messages.map((message) => (
              <article key={message.id} className={`junior-message junior-message-${message.role}`}>
                {message.role === 'assistant' && <span className="junior-message-avatar"><SparklesIcon /></span>}
                <div className="junior-message-bubble">
                  {message.title && <strong>{message.title}</strong>}
                  <p>{message.body}</p>

                  {message.confidence !== null && message.confidence !== undefined && (
                    <div className="junior-confidence">
                      <span>Match</span>
                      <strong>{message.confidence}%</strong>
                    </div>
                  )}

                  {message.actions?.length > 0 && (
                    <div className="junior-chat-actions">
                      {message.actions.map((action) => (
                        <button
                          key={`${message.id}-${action.label}`}
                          type="button"
                          className={`btn ${action.variant === 'outline' ? 'btn-outline' : ''}`}
                          onClick={() => handleAction(action)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="junior-quick-questions" aria-label="Quick questions for Junior">
            {AI_FAQ_SUGGESTIONS.slice(0, 4).map((item) => (
              <button key={item} type="button" onClick={() => askJunior(item)}>
                {item}
              </button>
            ))}
          </div>

          <form className="junior-chat-form" onSubmit={submitQuestion}>
            <label htmlFor="juniorQuestion" className="sr-only">Ask Junior a question</label>
            <div className="junior-chat-input-wrap">
              <SearchIcon />
              <input
                id="juniorQuestion"
                type="search"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask Junior a question..."
              />
            </div>
            <button type="submit" className="junior-send-button">Ask</button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="junior-chat-trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Close Junior chat' : 'Open Junior chat'}
        aria-expanded={isOpen}
      >
        <span className="junior-trigger-icon"><SparklesIcon /></span>
        <span className="junior-trigger-copy">
          <strong>Junior</strong>
          <small>Ask a question</small>
        </span>
      </button>
    </div>
  );
}
