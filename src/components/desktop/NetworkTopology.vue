<template>
  <section class="network-section hidden md:block w-full py-20 px-6 lg:px-16 bg-gradient-to-b from-[#04001D] to-[#2C0057]" aria-label="Infrastructure network visualization">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl lg:text-6xl font-bold mb-4 font-gsans text-white">Infrastructure Network</h2>
      <p class="text-gray-400 mb-12 text-lg">Interactive visualization of my homelab and infrastructure setup</p>
      <div 
        ref="networkContainer" 
        class="network-container bg-[#0a0a0a] rounded-lg border border-gray-700 shadow-2xl overflow-hidden"
        style="height: 700px; position: relative;"
        role="img"
        :aria-label="selectedNode ? `Network topology showing ${selectedNode.name}` : 'Interactive network topology visualization'"
        tabindex="0"
      >
        <svg ref="svgRef" class="w-full h-full" aria-hidden="true"></svg>
        <div 
          v-if="selectedNode"
          class="absolute top-4 right-4 bg-[#161b22] border border-gray-700 rounded-lg p-4 max-w-sm text-white text-sm shadow-xl z-50"
          role="dialog"
          aria-label="Node information"
        >
          <h3 class="font-bold text-lg mb-2">{{ selectedNode.name }}</h3>
          <p class="text-gray-300 mb-2">{{ selectedNode.description }}</p>
          <div v-if="selectedNode.details" class="mt-2">
            <p class="text-gray-400 text-xs">{{ selectedNode.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as d3 from 'd3'
import { useDebounce } from '../../composables/useDebounce'

const networkContainer = ref(null)
const svgRef = ref(null)
const selectedNode = ref(null)

// Expanded nodes with Obsidian-style categories
const nodes = [
  // Core Infrastructure
  {
    id: 'raspberry-pi',
    name: 'Raspberry Pi',
    type: 'server',
    category: 'hardware',
    description: 'Homelab server running Debian',
    details: 'Self-hosted services, cluster setup',
    color: '#C70039', // Raspberry Pi red
    x: 0,
    y: 0
  },
  {
    id: 'debian',
    name: 'Debian',
    type: 'os',
    category: 'software',
    description: 'Linux distribution',
    details: 'Raspberry Pi OS Lite',
    color: '#A81D33',
    x: 0,
    y: 0
  },
  {
    id: 'nix',
    name: 'Nix',
    type: 'os',
    category: 'software',
    description: 'Nix WSL',
    details: 'Reproducible builds',
    color: '#5277C3',
    x: 0,
    y: 0
  },
  
  // Networking & Security
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    type: 'cloud',
    category: 'networking',
    description: 'DNS & Tunnels',
    details: 'Domain management, secure tunnels',
    color: '#F38020',
    x: 0,
    y: 0
  },
  {
    id: 'dns',
    name: 'DNS',
    type: 'service',
    category: 'networking',
    description: 'Domain Name System',
    details: 'Cloudflare DNS management',
    color: '#8B5CF6',
    x: 0,
    y: 0
  },
  
  // Self-Hosted Services
  {
    id: 'selfhosted',
    name: 'Self-Hosted',
    type: 'service',
    category: 'services',
    description: 'Various self-hosted apps',
    details: 'Personal infrastructure',
    color: '#10B981',
    x: 0,
    y: 0
  },
  {
    id: 'homelab',
    name: 'Homelab',
    type: 'infrastructure',
    category: 'infrastructure',
    description: 'Home infrastructure',
    details: 'Raspberry Pi cluster',
    color: '#EC4899',
    x: 0,
    y: 0
  },
  
  // Cloud Platforms
  {
    id: 'gcp',
    name: 'Google Cloud',
    type: 'cloud',
    category: 'cloud',
    description: 'GCP Platform',
    details: 'Cloud deployments',
    color: '#4285F4',
    x: 0,
    y: 0
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    type: 'cloud',
    category: 'cloud',
    description: 'Azure Platform',
    details: 'Certified: Azure Fundamentals',
    color: '#0078D4',
    x: 0,
    y: 0
  },
  
  // Containerization & Orchestration
  {
    id: 'docker',
    name: 'Docker',
    type: 'tool',
    category: 'devops',
    description: 'Containerization',
    details: 'Container management',
    color: '#2496ED',
    x: 0,
    y: 0
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    type: 'tool',
    category: 'devops',
    description: 'Orchestration',
    details: 'Learning Kubernetes',
    color: '#326CE5',
    x: 0,
    y: 0
  },
  {
    id: 'argo-cd',
    name: 'Argo CD',
    type: 'tool',
    category: 'devops',
    description: 'GitOps',
    details: 'Currently learning',
    color: '#EF7B4D',
    x: 0,
    y: 0
  },
  
  // Development Tools
  {
    id: 'cursor',
    name: 'Cursor',
    type: 'tool',
    category: 'devtools',
    description: 'AI-powered editor',
    details: 'Primary code editor',
    color: '#6366F1',
    x: 0,
    y: 0
  },
  {
    id: 'vscode',
    name: 'VSCode',
    type: 'tool',
    category: 'devtools',
    description: 'Code editor',
    details: 'Secondary editor',
    color: '#007ACC',
    x: 0,
    y: 0
  },
  {
    id: 'vim',
    name: 'Vim',
    type: 'tool',
    category: 'devtools',
    description: 'Text editor',
    details: 'Terminal editing',
    color: '#019733',
    x: 0,
    y: 0
  },
  {
    id: 'zsh',
    name: 'Zsh',
    type: 'tool',
    category: 'devtools',
    description: 'Shell',
    details: 'p10k + ohmyzsh',
    color: '#1A2C34',
    x: 0,
    y: 0
  },
  {
    id: 'zoxide',
    name: 'Zoxide',
    type: 'tool',
    category: 'devtools',
    description: 'Smart cd',
    details: 'Directory navigation',
    color: '#F59E0B',
    x: 0,
    y: 0
  },
  {
    id: 'ghostty',
    name: 'Ghostty',
    type: 'tool',
    category: 'devtools',
    description: 'Terminal',
    details: 'Modern terminal emulator',
    color: '#8B5CF6',
    x: 0,
    y: 0
  },
  
  // Languages
  {
    id: 'python',
    name: 'Python',
    type: 'language',
    category: 'language',
    description: 'Programming language',
    details: 'Advanced level',
    color: '#3776AB',
    x: 0,
    y: 0
  },
  {
    id: 'go',
    name: 'Go',
    type: 'language',
    category: 'language',
    description: 'Programming language',
    details: 'Intermediate level',
    color: '#00ADD8',
    x: 0,
    y: 0
  },
  {
    id: 'rust',
    name: 'Rust',
    type: 'language',
    category: 'language',
    description: 'Programming language',
    details: 'Intermediate level',
    color: '#000000',
    x: 0,
    y: 0
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    type: 'language',
    category: 'language',
    description: 'Programming language',
    details: 'Intermediate level',
    color: '#F7DF1E',
    x: 0,
    y: 0
  },
  
  // Monitoring & Observability
  {
    id: 'telemetry',
    name: 'Telemetry',
    type: 'tool',
    category: 'monitoring',
    description: 'Observability',
    details: 'Currently learning',
    color: '#9333EA',
    x: 0,
    y: 0
  },
  
  // Hardware & Electronics
  {
    id: 'esp',
    name: 'ESP',
    type: 'hardware',
    category: 'hardware',
    description: 'ESP microcontrollers',
    details: 'Edge computing',
    color: '#E7352B',
    x: 0,
    y: 0
  },
  
  // Design Tools
  {
    id: 'fusion360',
    name: 'Fusion 360',
    type: 'tool',
    category: 'design',
    description: 'CAD software',
    details: '3D modeling',
    color: '#00A4E4',
    x: 0,
    y: 0
  },
  {
    id: 'blender',
    name: 'Blender',
    type: 'tool',
    category: 'design',
    description: '3D software',
    details: '3D modeling',
    color: '#F5792A',
    x: 0,
    y: 0
  }
]

// Expanded links creating a web-like structure
const links = [
  // Core infrastructure connections
  { source: 'raspberry-pi', target: 'debian', type: 'runs' },
  { source: 'raspberry-pi', target: 'homelab', type: 'powers' },
  { source: 'raspberry-pi', target: 'selfhosted', type: 'hosts' },
  { source: 'raspberry-pi', target: 'docker', type: 'runs' },
  
  // Networking connections
  { source: 'cloudflare', target: 'dns', type: 'manages' },
  { source: 'cloudflare', target: 'selfhosted', type: 'routes' },
  { source: 'raspberry-pi', target: 'cloudflare', type: 'tunnel' },
  
  // Containerization chain
  { source: 'docker', target: 'kubernetes', type: 'orchestrates' },
  { source: 'kubernetes', target: 'argo-cd', type: 'deploys' },
  { source: 'argo-cd', target: 'selfhosted', type: 'manages' },
  
  // Cloud connections
  { source: 'gcp', target: 'docker', type: 'supports' },
  { source: 'azure', target: 'docker', type: 'supports' },
  { source: 'gcp', target: 'kubernetes', type: 'hosts' },
  { source: 'azure', target: 'kubernetes', type: 'hosts' },
  
  // Development tools connections
  { source: 'cursor', target: 'python', type: 'edits' },
  { source: 'cursor', target: 'go', type: 'edits' },
  { source: 'cursor', target: 'rust', type: 'edits' },
  { source: 'cursor', target: 'javascript', type: 'edits' },
  { source: 'vscode', target: 'python', type: 'edits' },
  { source: 'vim', target: 'python', type: 'edits' },
  { source: 'zsh', target: 'zoxide', type: 'uses' },
  { source: 'ghostty', target: 'zsh', type: 'runs' },
  
  // Language connections
  { source: 'python', target: 'docker', type: 'containerizes' },
  { source: 'go', target: 'docker', type: 'containerizes' },
  { source: 'rust', target: 'docker', type: 'containerizes' },
  { source: 'javascript', target: 'docker', type: 'containerizes' },
  
  // Monitoring connections
  { source: 'telemetry', target: 'kubernetes', type: 'monitors' },
  { source: 'telemetry', target: 'selfhosted', type: 'monitors' },
  { source: 'telemetry', target: 'raspberry-pi', type: 'monitors' },
  
  // Hardware connections
  { source: 'esp', target: 'raspberry-pi', type: 'connects' },
  { source: 'esp', target: 'python', type: 'programmed' },
  
  // Design tool connections
  { source: 'fusion360', target: 'raspberry-pi', type: 'designs' },
  { source: 'blender', target: 'raspberry-pi', type: 'designs' },
  
  // Cross-category connections
  { source: 'nix', target: 'docker', type: 'builds' },
  { source: 'nix', target: 'homelab', type: 'configures' }
]

let simulation = null
let svg = null
let g = null

const getNodeColor = (node) => {
  return node.color || '#4dfdef'
}

const getNodeSize = (node) => {
  if (node.type === 'server' || node.type === 'infrastructure') return 12
  if (node.type === 'cloud') return 10
  if (node.type === 'service') return 9
  if (node.type === 'language') return 8
  if (node.type === 'tool') return 7
  return 6
}

const initNetwork = () => {
  try {
    if (!svgRef.value || !networkContainer.value) {
      console.warn('Network topology: SVG or container not available')
      return
    }

    const width = networkContainer.value.clientWidth
    const height = 700

    if (width <= 0 || height <= 0) {
      console.warn('Network topology: Invalid dimensions')
      return
    }

    svg = d3.select(svgRef.value)
      .attr('width', width)
      .attr('height', height)

  svg.selectAll('*').remove()

  g = svg.append('g')

  // Create zoom behavior (Obsidian-style smooth zoom)
  const zoom = d3.zoom()
    .scaleExtent([0.3, 4])
    .on('zoom', (event) => {
      g.attr('transform', event.transform)
    })

  svg.call(zoom)

  // Obsidian-style force simulation with more natural movement
  simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(d => {
      // Vary link distance based on relationship type
      return 80 + Math.random() * 40
    }))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => getNodeSize(d) + 5))
    .force('x', d3.forceX(width / 2).strength(0.05))
    .force('y', d3.forceY(height / 2).strength(0.05))

  // Create links with Obsidian-style thin, semi-transparent lines
  const link = g.append('g')
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', d => {
      // Color based on source node
      const sourceNode = nodes.find(n => n.id === d.source.id || n.id === d.source)
      return sourceNode ? getNodeColor(sourceNode) : '#4dfdef'
    })
    .attr('stroke-opacity', 0.3)
    .attr('stroke-width', 1)

  // Create nodes with Obsidian-style appearance
  const node = g.append('g')
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', d => getNodeSize(d))
    .attr('fill', d => getNodeColor(d))
    .attr('stroke', d => getNodeColor(d))
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.8)
    .style('cursor', 'pointer')
    .style('filter', 'drop-shadow(0 0 3px rgba(77, 253, 239, 0.3))')
    .on('click', (event, d) => {
      selectedNode.value = d
      // Highlight connected nodes
      highlightConnections(d.id)
    })
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended))

  // Add subtle glow to nodes
  const defs = svg.append('defs')
  const filter = defs.append('filter')
    .attr('id', 'node-glow')
  filter.append('feGaussianBlur')
    .attr('stdDeviation', '2')
    .attr('result', 'coloredBlur')
  const feMerge = filter.append('feMerge')
  feMerge.append('feMergeNode')
    .attr('in', 'coloredBlur')
  feMerge.append('feMergeNode')
    .attr('in', 'SourceGraphic')

  // Create node labels (Obsidian-style small, subtle text)
  const nodeLabels = g.append('g')
    .selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .attr('class', 'node-label')
    .attr('fill', '#e0e0e0')
    .attr('font-size', '11px')
    .attr('font-family', 'system-ui, -apple-system, sans-serif')
    .attr('text-anchor', 'middle')
    .attr('dy', d => getNodeSize(d) + 15)
    .text(d => d.name)
    .style('opacity', 0.8)
    .style('pointer-events', 'none')

  // Obsidian-style hover effects
  node.on('mouseover', function(event, d) {
    d3.select(this)
      .transition()
      .duration(200)
      .attr('r', getNodeSize(d) + 3)
      .style('filter', 'drop-shadow(0 0 8px ' + getNodeColor(d) + ')')
    
    // Highlight connected links
    link.style('stroke-opacity', l => {
      const sourceId = typeof l.source === 'object' ? l.source.id : l.source
      const targetId = typeof l.target === 'object' ? l.target.id : l.target
      return (sourceId === d.id || targetId === d.id) ? 0.8 : 0.1
    })
  })
  .on('mouseout', function(event, d) {
    d3.select(this)
      .transition()
      .duration(200)
      .attr('r', getNodeSize(d))
      .style('filter', 'drop-shadow(0 0 3px rgba(77, 253, 239, 0.3))')
    
    link.style('stroke-opacity', 0.3)
  })

  // Update positions on tick
  simulation.on('tick', () => {
    link
      .attr('x1', d => {
        const source = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source)
        return source ? source.x : 0
      })
      .attr('y1', d => {
        const source = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source)
        return source ? source.y : 0
      })
      .attr('x2', d => {
        const target = typeof d.target === 'object' ? d.target : nodes.find(n => n.id === d.target)
        return target ? target.x : 0
      })
      .attr('y2', d => {
        const target = typeof d.target === 'object' ? d.target : nodes.find(n => n.id === d.target)
        return target ? target.y : 0
      })

    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)

    nodeLabels
      .attr('x', d => d.x)
      .attr('y', d => d.y)
  })

  // Subtle pulsing animation for links (Obsidian-style)
  animateLinks(link)
  } catch (error) {
    console.error('Error initializing network topology:', error)
  }
}

const highlightConnections = (nodeId) => {
  // Reset all nodes
  g.selectAll('circle').style('opacity', 0.3)
  g.selectAll('line').style('stroke-opacity', 0.1)
  
  // Highlight selected node
  g.selectAll('circle')
    .filter(d => d.id === nodeId)
    .style('opacity', 1)
  
  // Highlight connected nodes and links
  links.forEach(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source
    const targetId = typeof link.target === 'object' ? link.target.id : link.target
    
    if (sourceId === nodeId || targetId === nodeId) {
      g.selectAll('circle')
        .filter(d => d.id === (sourceId === nodeId ? targetId : sourceId))
        .style('opacity', 0.8)
      
      g.selectAll('line')
        .filter(d => {
          const sId = typeof d.source === 'object' ? d.source.id : d.source
          const tId = typeof d.target === 'object' ? d.target.id : d.target
          return (sId === sourceId && tId === targetId) || (sId === targetId && tId === sourceId)
        })
        .style('stroke-opacity', 0.6)
    }
  })
  
  // Reset after 3 seconds
  setTimeout(() => {
    g.selectAll('circle').style('opacity', 1)
    g.selectAll('line').style('stroke-opacity', 0.3)
  }, 3000)
}

const animateLinks = (linkSelection) => {
  // Subtle pulsing effect on links
  linkSelection.each(function() {
    const link = d3.select(this)
    const originalOpacity = link.attr('stroke-opacity')
    
    link.transition()
      .duration(2000 + Math.random() * 1000)
      .attr('stroke-opacity', parseFloat(originalOpacity) * 1.5)
      .transition()
      .duration(2000 + Math.random() * 1000)
      .attr('stroke-opacity', originalOpacity)
      .on('end', function repeat() {
        d3.select(this)
          .transition()
          .duration(2000 + Math.random() * 1000)
          .attr('stroke-opacity', parseFloat(originalOpacity) * 1.5)
          .transition()
          .duration(2000 + Math.random() * 1000)
          .attr('stroke-opacity', originalOpacity)
          .on('end', repeat)
      })
  })
}

const dragstarted = (event) => {
  if (!event.active) simulation.alphaTarget(0.3).restart()
  event.subject.fx = event.subject.x
  event.subject.fy = event.subject.y
}

const dragged = (event) => {
  event.subject.fx = event.x
  event.subject.fy = event.y
}

const dragended = (event) => {
  if (!event.active) simulation.alphaTarget(0)
  event.subject.fx = null
  event.subject.fy = null
}

const handleResize = () => {
  if (networkContainer.value && svgRef.value && simulation) {
    try {
      const width = networkContainer.value.clientWidth
      svg.attr('width', width)
      simulation.force('center', d3.forceCenter(width / 2, 350))
      simulation.alpha(1).restart()
    } catch (error) {
      console.warn('Error resizing network visualization:', error)
    }
  }
}

// Debounce resize handler for better performance
const debouncedResize = useDebounce(handleResize, 250)

onMounted(() => {
  try {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      setTimeout(() => {
        initNetwork()
      }, 100)
    })
    window.addEventListener('resize', debouncedResize, { passive: true })
  } catch (error) {
    console.error('Error initializing network visualization:', error)
  }
})

onUnmounted(() => {
  if (simulation) {
    simulation.stop()
  }
  window.removeEventListener('resize', debouncedResize)
})
</script>

<style scoped>
.network-container {
  background: radial-gradient(circle at center, #0a0a0a 0%, #000000 100%);
}

.node-label {
  pointer-events: none;
  user-select: none;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
}

.link-label {
  pointer-events: none;
  user-select: none;
}
</style>
