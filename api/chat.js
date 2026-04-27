// api/chat.js — Vercel Serverless Function
// SECURITY: MISTRAL_API_KEY is read from environment variables only, never exposed to the client.

export default async function handler(req, res) {
  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' })
  }

  const apiKey = process.env.MISTRAL_API_KEY

  // Fallback mode if no API key configured
  if (!apiKey) {
    return res.status(200).json({
      reply:
        "Je suis en mode démo (clé API non configurée). Nos trois destinations phares sont : l'Égypte Ancienne (8 900€, 7 jours, risque modéré), l'Empire Romain (7 500€, 5 jours, risque élevé) et le Japon Féodal (9 200€, 8 jours, risque faible). Configurez MISTRAL_API_KEY pour activer le chatbot IA complet.",
    })
  }

  const systemPrompt = `Tu es l'assistant virtuel de TimeTravel Agency, une agence premium de voyage temporel fictif.
Tu conseilles les visiteurs avec un ton professionnel, chaleureux, immersif et crédible.

Tu connais parfaitement trois destinations :
1. Égypte Ancienne — 8 900€, 7 jours, risque modéré. Pyramides, temples, Nil. Tenue : tunique en lin blanc.
2. Empire Romain — 7 500€, 5 jours, risque élevé. Colisée, Forum, Sénat. Tenue : toge blanche ou tunique.
3. Japon Féodal — 9 200€, 8 jours, risque faible. Sanctuaires, samouraïs, Mont Fuji. Tenue : kimono.

Règles importantes :
- Tu restes dans le cadre fictif du projet sans jamais affirmer que le voyage temporel existe réellement.
- Tu réponds uniquement en français.
- Tu aides à choisir la destination selon les préférences de l'utilisateur.
- Tes réponses sont concises (max 150 mots), chaleureuses et immersives.
- Si on te demande la réservation, oriente vers le formulaire en bas de page.`

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 400,
        temperature: 0.75,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Mistral API error:', response.status, errorData)
      return res.status(502).json({ error: 'Erreur API Mistral', details: errorData })
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content

    if (!reply) {
      return res.status(502).json({ error: 'Réponse invalide de Mistral' })
    }

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Chat handler error:', error)
    return res.status(500).json({ error: 'Erreur interne du serveur' })
  }
}
