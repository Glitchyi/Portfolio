export default {
  // KV namespace binding
  async scheduled(event, env, ctx) {
    try {
      const response = await fetch('https://api.monkeytype.com/results/last', {
        method: 'GET',
        headers: {
          'Authorization': `ApeKey ${env.MONKEYTYPE_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }

      const data = await response.json();
      // Store in KV with 24h expiration
      await env.MONKEY_KV.put('latest_wpm', JSON.stringify(data), {
        expirationTtl: 86400
      });
    } catch (error) {
      console.error('Failed to update cache:', error);
    }
  },

  async fetch(request, env, ctx) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    try {
      // Get cached data
      const cached = await env.MONKEY_KV.get('latest_wpm');
      if (!cached) {
        return new Response('No data available', { 
          status: 404,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          }
        });
      }

      return new Response(cached, { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Internal error' }), { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        }
      });
    }
  }
};