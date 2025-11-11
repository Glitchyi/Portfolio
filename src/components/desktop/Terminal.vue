<template>
  <section class="terminal-section hidden md:block w-full py-20 px-6 lg:px-16" aria-label="Interactive terminal">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl lg:text-6xl font-bold mb-8 font-gsans text-white">Explore via Terminal</h2>
      <div class="terminal-container bg-[#0d1117] rounded-lg border border-gray-700 shadow-2xl overflow-hidden" role="application" aria-label="Terminal emulator">
        <div class="terminal-header bg-[#161b22] px-4 py-2 flex items-center gap-2" role="toolbar">
          <div class="flex gap-2" aria-hidden="true">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span class="text-gray-400 text-sm ml-4" aria-label="Terminal prompt">glitchy@portfolio:~</span>
        </div>
        <div 
          ref="terminalRef" 
          class="terminal-body p-4 font-mono text-sm text-green-400 h-[500px] overflow-y-auto"
          @click="focusTerminal"
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
          tabindex="0"
        >
          <div 
            v-for="(line, index) in outputLines" 
            :key="index" 
            class="mb-1"
            v-html="formatLine(line)"
          ></div>
          <div class="flex items-center gap-2">
            <span class="text-green-400" aria-hidden="true">glitchy@portfolio:~$</span>
            <input
              ref="inputRef"
              v-model="currentInput"
              @keydown.enter="executeCommand"
              @keydown.up="navigateHistory(-1)"
              @keydown.down="navigateHistory(1)"
              @keydown.tab.prevent="handleTabCompletion"
              class="flex-1 bg-transparent text-green-400 outline-none caret-green-400"
              type="text"
              aria-label="Terminal command input"
              autocomplete="off"
              spellcheck="false"
            />
          </div>
        </div>
      </div>
      <div class="mt-4 text-gray-400 text-sm">
        <p>Try commands like: <code class="bg-gray-800 px-2 py-1 rounded">help</code>, <code class="bg-gray-800 px-2 py-1 rounded">ls projects</code>, <code class="bg-gray-800 px-2 py-1 rounded">cat skills.txt</code>, <code class="bg-gray-800 px-2 py-1 rounded">bat skills.txt</code></p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import projectsData from '../../data/projects.json'

const terminalRef = ref(null)
const inputRef = ref(null)
const currentInput = ref('')
const outputLines = ref([
  { type: 'output', text: 'Welcome to my portfolio terminal!' },
  { type: 'output', text: 'Type "help" to see available commands.' },
  { type: 'output', text: '' }
])
const commandHistory = ref([])
const historyIndex = ref(-1)

const availableFiles = ['skills.txt', 'bio.txt', 'achievements.txt']
const availableDirs = ['projects']
const availableCommands = ['help', 'ls', 'cat', 'bat', 'whoami', 'pwd', 'cd', 'git', 'clear', 'z', 'zi', 'google', 'g']

const commands = {
  help: () => [
    { type: 'output', text: 'Available commands:' },
    { type: 'output', text: '  help              - Show this help message' },
    { type: 'output', text: '  ls [dir]          - List projects or files' },
    { type: 'output', text: '  cat [file]        - Display file contents' },
    { type: 'output', text: '  bat [file]        - Display file with syntax highlighting' },
    { type: 'output', text: '  whoami            - Show who I am' },
    { type: 'output', text: '  pwd               - Print working directory' },
    { type: 'output', text: '  cd [dir]          - Change directory' },
    { type: 'output', text: '  git log --achievements - Show achievements' },
    { type: 'output', text: '  z [query]         - Smart directory jump (powered by zoxide)' },
    { type: 'output', text: '  zi [query]        - Interactive directory selection (zoxide)' },
    { type: 'output', text: '  clear             - Clear terminal' },
    { type: 'output', text: '' },
    { type: 'output', text: '💡 Tip: Use TAB for command/file/directory completion' },
    { type: 'output', text: '📦 zoxide: A smarter cd command - https://github.com/ajeetdsouza/zoxide' },
    { type: 'output', text: '' }
  ],
  z: (args) => {
    const query = args[0] || ''
    // Simulate zoxide's smart directory jumping
    const matches = availableDirs.filter(dir => dir.includes(query.toLowerCase()))
    if (matches.length === 1) {
      return [
        { type: 'output', text: `Jumping to ${matches[0]}/...` },
        { type: 'output', text: `Changed directory to ${matches[0]}/` },
        { type: 'output', text: '' }
      ]
    }
    if (matches.length > 1) {
      return [
        { type: 'output', text: `Multiple matches found:` },
        ...matches.map(m => ({ type: 'output', text: `  ${m}/` })),
        { type: 'output', text: 'Use "zi" for interactive selection' },
        { type: 'output', text: '' }
      ]
    }
    return [
      { type: 'output', text: `z: No match found for "${query}"` },
      { type: 'output', text: 'Available directories: projects/' },
      { type: 'output', text: '' }
    ]
  },
  zi: () => [
    { type: 'output', text: 'Interactive directory selection (zoxide):' },
    { type: 'output', text: '  [1] projects/' },
    { type: 'output', text: 'Select: 1' },
    { type: 'output', text: 'Changed directory to projects/' },
    { type: 'output', text: '' }
  ],
  ls: (args) => {
    if (args[0] === 'projects') {
      return [
        { type: 'output', text: 'Projects:' },
        ...projectsData.map(p => ({ 
          type: 'output', 
          text: `  ${p.name.padEnd(20)} - ${p.description.substring(0, 50)}...` 
        })),
        { type: 'output', text: '' }
      ]
    }
    return [
      { type: 'output', text: 'projects  skills.txt  bio.txt  achievements.txt' },
      { type: 'output', text: '' }
    ]
  },
  cat: (args) => {
    const file = args[0]
    if (file === 'skills.txt') {
      return [
        { type: 'output', text: 'Skills & Technologies:' },
        { type: 'output', text: '' },
        { type: 'output', text: 'Languages:' },
        { type: 'output', text: '  Python (Advanced)' },
        { type: 'output', text: '  Go (Intermediate)' },
        { type: 'output', text: '  Rust (Intermediate)' },
        { type: 'output', text: '  JavaScript (Intermediate)' },
        { type: 'output', text: '  Markdown (Expert)' },
        { type: 'output', text: '' },
        { type: 'output', text: 'Tools:' },
        { type: 'output', text: '  Cursor, VSCode, Vim, Zsh, Ghostty' },
        { type: 'output', text: '  Docker, Kubernetes, Cloudflare' },
        { type: 'output', text: '  Fusion 360, Blender' },
        { type: 'output', text: '' }
      ]
    }
    if (file === 'bio.txt') {
      return [
        { type: 'output', text: 'About Me:' },
        { type: 'output', text: '' },
        { type: 'output', text: 'I\'m a curious person who loves working with networking' },
        { type: 'output', text: 'servers, Linux systems, and Raspberry Pi clusters.' },
        { type: 'output', text: 'Deeply interested in electronics and hardware tinkering.' },
        { type: 'output', text: 'Passionate about technology and pushing hardware limits.' },
        { type: 'output', text: '' }
      ]
    }
    if (file === 'achievements.txt') {
      return [
        { type: 'output', text: 'Achievements:' },
        { type: 'output', text: '' },
        { type: 'output', text: '🏆 First Prize - Asia\'s first DeAI hackathon (ELNA Ai)' },
        { type: 'output', text: '📜 Microsoft Certified: Azure Fundamentals' },
        { type: 'output', text: '📜 Learning Kubernetes (LinkedIn)' },
        { type: 'output', text: '🎤 Speaker at FOSSMeet 24 (NIT Calicut)' },
        { type: 'output', text: '🎤 Lightning talk at IndiaFOSS 4.0' },
        { type: 'output', text: '👨‍💼 Software Developer at IBM' },
        { type: 'output', text: '' }
      ]
    }
    if (file && file.startsWith('projects/')) {
      const projectName = file.replace('projects/', '').replace('.md', '')
      const project = projectsData.find(p => p.name.toLowerCase() === projectName.toLowerCase())
      if (project) {
        return [
          { type: 'output', text: `${project.name}:` },
          { type: 'output', text: '' },
          { type: 'output', text: `Description: ${project.description}` },
          { type: 'output', text: `Technologies: ${project.technologies.join(', ')}` },
          { type: 'output', text: `GitHub: ${project.github}` },
          { type: 'output', text: '' },
          { type: 'output', text: 'Features:' },
          ...project.features.map(f => ({ type: 'output', text: `  - ${f}` })),
          { type: 'output', text: '' }
        ]
      }
    }
    return [
      { type: 'output', text: `cat: ${file}: No such file or directory` },
      { type: 'output', text: '' }
    ]
  },
  bat: (args) => {
    const file = args[0]
    if (!file) {
      return [
        { type: 'output', text: 'bat: Please specify a file to display' },
        { type: 'output', text: 'Usage: bat <file>' },
        { type: 'output', text: '' }
      ]
    }
    
    if (file === 'skills.txt') {
      return [
        { type: 'output', text: '───────┬─────────────────────────────────────────────────────────' },
        { type: 'output', text: '       │ File: skills.txt' },
        { type: 'output', text: '───────┼─────────────────────────────────────────────────────────' },
        { type: 'output', text: '   1  │ Skills & Technologies:' },
        { type: 'output', text: '   2  │ ' },
        { type: 'output', text: '   3  │ Languages:' },
        { type: 'output', text: '   4  │   Python (Advanced)' },
        { type: 'output', text: '   5  │   Go (Intermediate)' },
        { type: 'output', text: '   6  │   Rust (Intermediate)' },
        { type: 'output', text: '   7  │   JavaScript (Intermediate)' },
        { type: 'output', text: '   8  │   Markdown (Expert)' },
        { type: 'output', text: '   9  │ ' },
        { type: 'output', text: '  10  │ Tools:' },
        { type: 'output', text: '  11  │   Cursor, VSCode, Vim, Zsh, Ghostty' },
        { type: 'output', text: '  12  │   Docker, Kubernetes, Cloudflare' },
        { type: 'output', text: '  13  │   Fusion 360, Blender' },
        { type: 'output', text: '───────┴─────────────────────────────────────────────────────────' },
        { type: 'output', text: '' }
      ]
    }
    
    if (file === 'bio.txt') {
      return [
        { type: 'output', text: '───────┬─────────────────────────────────────────────────────────' },
        { type: 'output', text: '       │ File: bio.txt' },
        { type: 'output', text: '───────┼─────────────────────────────────────────────────────────' },
        { type: 'output', text: '   1  │ About Me:' },
        { type: 'output', text: '   2  │ ' },
        { type: 'output', text: '   3  │ I\'m a curious person who loves working with networking' },
        { type: 'output', text: '   4  │ servers, Linux systems, and Raspberry Pi clusters.' },
        { type: 'output', text: '   5  │ Deeply interested in electronics and hardware tinkering.' },
        { type: 'output', text: '   6  │ Passionate about technology and pushing hardware limits.' },
        { type: 'output', text: '───────┴─────────────────────────────────────────────────────────' },
        { type: 'output', text: '' }
      ]
    }
    
    if (file === 'achievements.txt') {
      return [
        { type: 'output', text: '───────┬─────────────────────────────────────────────────────────' },
        { type: 'output', text: '       │ File: achievements.txt' },
        { type: 'output', text: '───────┼─────────────────────────────────────────────────────────' },
        { type: 'output', text: '   1  │ Achievements:' },
        { type: 'output', text: '   2  │ ' },
        { type: 'output', text: '   3  │ 🏆 First Prize - Asia\'s first DeAI hackathon (ELNA Ai)' },
        { type: 'output', text: '   4  │ 📜 Microsoft Certified: Azure Fundamentals' },
        { type: 'output', text: '   5  │ 📜 Learning Kubernetes (LinkedIn)' },
        { type: 'output', text: '   6  │ 🎤 Speaker at FOSSMeet 24 (NIT Calicut)' },
        { type: 'output', text: '   7  │ 🎤 Lightning talk at IndiaFOSS 4.0' },
        { type: 'output', text: '   8  │ 👨‍💼 Software Developer at IBM' },
        { type: 'output', text: '───────┴─────────────────────────────────────────────────────────' },
        { type: 'output', text: '' }
      ]
    }
    
    if (file && file.startsWith('projects/')) {
      const projectName = file.replace('projects/', '').replace('.md', '')
      const project = projectsData.find(p => p.name.toLowerCase() === projectName.toLowerCase())
      if (project) {
        const lines = [
          `${project.name}:`,
          '',
          `Description: ${project.description}`,
          `Technologies: ${project.technologies.join(', ')}`,
          `GitHub: ${project.github}`,
          '',
          'Features:',
          ...project.features.map(f => `  - ${f}`)
        ]
        
        return [
          { type: 'output', text: '───────┬─────────────────────────────────────────────────────────' },
          { type: 'output', text: `       │ File: projects/${project.name}.md` },
          { type: 'output', text: '───────┼─────────────────────────────────────────────────────────' },
          ...lines.map((line, idx) => ({
            type: 'output',
            text: `${String(idx + 1).padStart(4)} │ ${line}`
          })),
          { type: 'output', text: '───────┴─────────────────────────────────────────────────────────' },
          { type: 'output', text: '' }
        ]
      }
    }
    
    return [
      { type: 'output', text: `bat: ${file}: No such file or directory` },
      { type: 'output', text: '' }
    ]
  },
  whoami: () => [
    { type: 'output', text: 'Advaith Narayanan (Glitchy)' },
    { type: 'output', text: 'Software Developer at IBM Kochi' },
    { type: 'output', text: 'Computer Enthusiast | Homelab Enthusiast' },
    { type: 'output', text: '' }
  ],
  pwd: () => [
    { type: 'output', text: '/home/glitchy/portfolio' },
    { type: 'output', text: '' }
  ],
  cd: (args) => {
    const dir = args[0]
    if (dir === 'projects') {
      return [
        { type: 'output', text: 'Changed directory to projects/' },
        { type: 'output', text: 'Use "ls" to see available project files' },
        { type: 'output', text: '' }
      ]
    }
    return [
      { type: 'output', text: `cd: ${dir}: No such file or directory` },
      { type: 'output', text: '' }
    ]
  },
  'git log --achievements': () => [
    { type: 'output', text: 'commit abc123f - First Prize Winner at DeAI Hackathon' },
    { type: 'output', text: 'commit def456g - Speaker at FOSSMeet 24' },
    { type: 'output', text: 'commit ghi789h - Lightning talk at IndiaFOSS 4.0' },
    { type: 'output', text: 'commit jkl012i - Microsoft Azure Certified' },
    { type: 'output', text: 'commit mno345j - Kubernetes Learning Certificate' },
    { type: 'output', text: '' }
  ],
  clear: () => {
    outputLines.value = []
    return []
  },
  google: () => [
    { type: 'output', text: '' },
    { type: 'output', text: '    ___       ___       ___       ___       ___ ' },
    { type: 'output', text: '   /\\  \\     /\\  \\     /\\  \\     /\\  \\     /\\  \\' },
    { type: 'output', text: '  /::\\  \\   /::\\  \\   /::\\  \\   /::\\  \\   /::\\  \\' },
    { type: 'output', text: ' /:/\\:\\__\\ /:/\\:\\__\\ /:/\\:\\__\\ /:/\\:\\__\\ /:/\\:\\__\\' },
    { type: 'output', text: ' \\:\\ \\/__/ \\:\\/:/  / \\:\\/:/  / \\:\\/:/  / \\:\\/:/  /' },
    { type: 'output', text: '  \\:\\__\\    \\::/  /   \\::/  /   \\::/  /   \\::/  /' },
    { type: 'output', text: '   \\/__/     \\/__/     \\/__/     \\/__/     \\/__/' },
    { type: 'output', text: '' },
    { type: 'output', text: '🎉 Easter Egg Found! 🎉' },
    { type: 'output', text: '' },
    { type: 'output', text: 'You discovered my Google fanboy status!' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Favorite Google Products:' },
    { type: 'output', text: '  • Google Cloud Platform (GCP)' },
    { type: 'output', text: '  • Chrome & Chromium' },
    { type: 'output', text: '  • Android' },
    { type: 'output', text: '  • Google Search' },
    { type: 'output', text: '  • Material Design' },
    { type: 'output', text: '  • Go Programming Language' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Try: "g" for a shorter command' },
    { type: 'output', text: '' }
  ],
  g: () => [
    { type: 'output', text: '' },
    { type: 'output', text: '🔍 Google Fanboy Mode Activated! 🔍' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Did you know?' },
    { type: 'output', text: '  • I use GCP for cloud deployments' },
    { type: 'output', text: '  • Chrome is my primary browser' },
    { type: 'output', text: '  • I love Go (created by Google)' },
    { type: 'output', text: '  • Material Design is beautiful' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Google colors: 🔴 Red, 🟡 Yellow, 🔵 Blue, 🟢 Green' },
    { type: 'output', text: '' }
  ]
}

const executeCommand = () => {
  const input = currentInput.value.trim()
  if (!input) {
    outputLines.value.push({ type: 'output', text: '' })
    scrollToBottom()
    return
  }

  // Add command to output
  outputLines.value.push({ type: 'command', text: `glitchy@portfolio:~$ ${input}` })
  
  // Add to history
  commandHistory.value.push(input)
  historyIndex.value = commandHistory.value.length

  // Parse command
  const parts = input.split(' ')
  const cmd = parts[0]
  const args = parts.slice(1)

  // Execute command
  if (commands[cmd]) {
    const result = commands[cmd](args)
    outputLines.value.push(...result)
  } else {
    outputLines.value.push({ 
      type: 'error', 
      text: `Command not found: ${cmd}. Type "help" for available commands.` 
    })
    outputLines.value.push({ type: 'output', text: '' })
  }

  currentInput.value = ''
  scrollToBottom()
}

const navigateHistory = (direction) => {
  if (commandHistory.value.length === 0) return
  
  historyIndex.value += direction
  if (historyIndex.value < 0) historyIndex.value = 0
  if (historyIndex.value >= commandHistory.value.length) {
    historyIndex.value = commandHistory.value.length
    currentInput.value = ''
    return
  }
  
  currentInput.value = commandHistory.value[historyIndex.value]
}

const formatLine = (line) => {
  if (line.type === 'command') {
    return `<span class="text-blue-400">${line.text}</span>`
  }
  if (line.type === 'error') {
    return `<span class="text-red-400">${line.text}</span>`
  }
  return line.text
}

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalRef.value) {
      terminalRef.value.scrollTop = terminalRef.value.scrollHeight
    }
  })
}

const focusTerminal = () => {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  })
}

const handleTabCompletion = () => {
  const input = currentInput.value.trim()
  if (!input) return

  const parts = input.split(' ')
  const cmd = parts[0]
  const arg = parts[1] || ''

  // Command completion
  if (parts.length === 1) {
    const matches = availableCommands.filter(c => c.startsWith(cmd.toLowerCase()))
    if (matches.length === 1) {
      currentInput.value = matches[0] + ' '
    } else if (matches.length > 1) {
      // Show all matches
      outputLines.value.push({ type: 'output', text: '' })
      outputLines.value.push({ type: 'output', text: 'Possible completions:' })
      matches.forEach(m => {
        outputLines.value.push({ type: 'output', text: `  ${m}` })
      })
      outputLines.value.push({ type: 'output', text: '' })
      scrollToBottom()
    }
    return
  }

  // File/directory completion for cat and bat
  if (cmd === 'cat' || cmd === 'bat') {
    const matches = availableFiles.filter(f => f.startsWith(arg))
    if (matches.length === 1) {
      currentInput.value = `${cmd} ${matches[0]}`
    } else if (matches.length > 1) {
      outputLines.value.push({ type: 'output', text: '' })
      outputLines.value.push({ type: 'output', text: 'Possible completions:' })
      matches.forEach(m => {
        outputLines.value.push({ type: 'output', text: `  ${m}` })
      })
      outputLines.value.push({ type: 'output', text: '' })
      scrollToBottom()
    }
    return
  }

  // Directory completion for cd, ls, z
  if (cmd === 'cd' || cmd === 'ls' || cmd === 'z') {
    const matches = availableDirs.filter(d => d.startsWith(arg))
    if (matches.length === 1) {
      if (cmd === 'ls') {
        currentInput.value = `ls ${matches[0]}`
      } else {
        currentInput.value = `${cmd} ${matches[0]}`
      }
    } else if (matches.length > 1) {
      outputLines.value.push({ type: 'output', text: '' })
      outputLines.value.push({ type: 'output', text: 'Possible completions:' })
      matches.forEach(m => {
        outputLines.value.push({ type: 'output', text: `  ${m}/` })
      })
      outputLines.value.push({ type: 'output', text: '' })
      scrollToBottom()
    }
    return
  }

  // Project file completion for cat and bat projects/
  if ((cmd === 'cat' || cmd === 'bat') && arg.startsWith('projects/')) {
    const projectName = arg.replace('projects/', '')
    const matches = projectsData
      .map(p => p.name.toLowerCase())
      .filter(name => name.startsWith(projectName.toLowerCase()))
    
    if (matches.length === 1) {
      currentInput.value = `${cmd} projects/${matches[0]}.md`
    } else if (matches.length > 1) {
      outputLines.value.push({ type: 'output', text: '' })
      outputLines.value.push({ type: 'output', text: 'Possible completions:' })
      matches.forEach(m => {
        outputLines.value.push({ type: 'output', text: `  projects/${m}.md` })
      })
      outputLines.value.push({ type: 'output', text: '' })
      scrollToBottom()
    }
    return
  }
}

onMounted(() => {
  // Don't auto-focus on mount to prevent scrolling
})
</script>

<style scoped>
.terminal-body {
  scrollbar-width: thin;
  scrollbar-color: #333 #0d1117;
}

.terminal-body::-webkit-scrollbar {
  width: 8px;
}

.terminal-body::-webkit-scrollbar-track {
  background: #0d1117;
}

.terminal-body::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

.terminal-body::-webkit-scrollbar-thumb:hover {
  background: #444;
}

code {
  font-family: 'Courier New', monospace;
}
</style>

