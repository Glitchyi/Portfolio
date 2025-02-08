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
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };

    try {
      // Get cached data
      const cached = await env.MONKEY_KV.get('latest_wpm');
      if (!cached) {
        return new Response('No data available', { 
          status: 404,
          headers 
        });
      }

      return new Response(cached, { headers });
    } catch (error) {
      return new Response('Internal error', { 
        status: 500,
        headers 
      });
    }
  }
};