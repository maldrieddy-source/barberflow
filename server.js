require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.post('/gerar-codigo', async (req, res) => {
  // Suporta dois formatos de requisição:
  // { prompt: "..." }  — compatibilidade retroativa
  // { messages: [{role:'user'|'assistant'|'system', content:'...'}, ...] }
  const { prompt, messages } = req.body;
  let userText = '';

  if (Array.isArray(messages) && messages.length > 0) {
    // pegar último conteúdo do usuário
    const lastUser = [...messages].reverse().find(m => m.role === 'user');
    userText = lastUser ? lastUser.content : '';
  } else if (typeof prompt === 'string') {
    userText = prompt;
  }

  if (!userText || !userText.trim()) {
    return res.status(400).json({ erro: 'Digite algo para gerar.' });
  }

  // Se não houver chave, usamos um fallback local e seguro (apenas respostas alto-nível ou exemplos já presentes no projeto)
  if (!GROQ_API_KEY) {
    try {
      const lower = userText.toLowerCase();
      // exemplo: devolver bola quicando em HTML quando solicitado
      if (lower.includes('bola') || lower.includes('quic')) {
        const exemplo = require('fs').readFileSync(path.join(__dirname, 'fallbacks', 'bouncing_ball.html'), 'utf8');
        return res.json({ codigo: exemplo });
      }

      // se mencionar 'cannabis' ou termos acadêmicos, devolvemos um resumo seguro e alto-nível
      if (lower.includes('cannabis') || lower.includes('cânhamo') || lower.includes('canabis')) {
        const texto = `Resumo (alto-nível): Cannabis é um género de plantas com variações em composição química, incluindo canabinoides como THC e CBD. Estudos abordam fisiologia, metabolismo, efeitos medicinais potenciais e considerações legais. Fornecemos referências acadêmicas mediante solicitação. Não fornecemos instruções práticas de cultivo.`;
        return res.json({ message: texto });
      }

      // fallback genérico: ecoar pergunta com resposta neutra
      return res.json({ message: `Recebi sua mensagem: "${userText}". (Modo offline: sem chave de API).` });
    } catch (err) {
      console.error('Erro no fallback local:', err);
      return res.status(500).json({ erro: 'Erro no fallback local.', detalhes: err.message });
    }
  }

  // Quando há chave, encaminha para a API Groq/OpenAI
  try {
    const payloadMessages = Array.isArray(messages) && messages.length > 0
      ? [
          { role: 'system', content: 'Você é um assistente especialista em HTML, CSS, JavaScript e conhecimento científico — responda conforme solicitado, e evite instruções práticas ilegais.' },
          ...messages
        ]
      : [
          { role: 'system', content: 'Você é um assistente especialista em HTML, CSS e JavaScript. Responda apenas com código, sem explicações extras.' },
          { role: 'user', content: userText }
        ];

    const resposta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        temperature: 0.7,
        max_completion_tokens: 400,
        messages: payloadMessages
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      console.error('Erro da API Groq:', dados);
      return res.status(500).json({ erro: 'Erro ao comunicar com a IA.', detalhes: dados });
    }

    const codigo = dados?.choices?.[0]?.message?.content || 'Nenhuma resposta recebida.';
    return res.json({ codigo });
  } catch (erro) {
    console.error('Erro no backend:', erro);
    return res.status(500).json({ erro: 'Falha ao gerar código.', detalhes: erro.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
