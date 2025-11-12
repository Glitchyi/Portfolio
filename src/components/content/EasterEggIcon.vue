<template>
    <span 
        :data-icon-type="iconType"
        class="easter-egg-icon inline-flex items-center mx-1 relative group cursor-pointer"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @click="handleClick"
    >
        <component 
            v-if="iconType !== 'monitor'"
            :is="iconComponent" 
            :size="28" 
            class="text-white transition-all duration-300"
            :ref="el => iconElement = el"
        />
        <template v-else>
            <component 
                :is="iconComponent" 
                :size="26" 
                class="text-white transition-all duration-300 mr-0.5"
                :ref="el => iconElement = el"
            />
            <component 
                :is="iconComponent" 
                :size="26" 
                class="text-white transition-all duration-300"
            />
        </template>
        <span 
            v-if="isHovered && tooltip"
            class="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-[100] pointer-events-none"
        >
            {{ tooltip }}
            <span class="tooltip-arrow absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></span>
        </span>
    </span>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
    iconComponent: [Object, Function],
    tooltip: String,
    iconType: String
})

const isHovered = ref(false)
let iconElement = null
let soundPlaying = false

const handleMouseEnter = () => {
    isHovered.value = true
    
    // Skip icon animation for monitor type - just show bezels
    if (iconElement && props.iconType !== 'monitor') {
        gsap.to(iconElement, {
            scale: 1.3,
            duration: 0.5,
            ease: 'back.out(1.7)'
        })
    }
    
    // Trigger unique effects based on icon type
    triggerEffect(props.iconType)
}

const handleMouseLeave = () => {
    isHovered.value = false
    // Skip icon animation reset for monitor type
    if (iconElement && props.iconType !== 'monitor') {
        gsap.to(iconElement, {
            scale: 1,
            duration: 0.3
        })
    }
    
    // Clean up effects
    cleanupEffect(props.iconType)
}

const handleClick = () => {
    if (props.iconType === 'music') {
        window.open('https://music.apple.com', '_blank')
    }
}

const triggerEffect = (type) => {
    switch(type) {
        case 'linux':
            showMatrixOverlay()
            break
        case 'music':
            // Will redirect on click, just show visual feedback
            break
        case 'raspberry':
            showRaspberryPiEffect()
            break
        case 'monitor':
            showMonitorGlow()
            break
        case 'telemetry':
            showActivityPulse()
            logTelemetryData()
            break
        case 'gitops':
            showDockerWhale()
            break
        case 'electronics':
            showZapEffect()
            break
        case 'server':
            showServerPulse()
            break
        case 'speakers':
            playSound()
            break
    }
}

const cleanupEffect = (type) => {
    switch(type) {
        case 'linux':
            removeMatrixOverlay()
            break
        case 'monitor':
            removeMonitorGlow()
            break
        case 'telemetry':
            removeActivityPulse()
            break
        case 'gitops':
            removeDockerWhale()
            break
        case 'electronics':
            removeZapEffect()
            break
        case 'raspberry':
            removeRaspberryPiEffect()
            break
        case 'server':
            removeServerPulse()
            break
        case 'speakers':
            // No cleanup needed
            break
    }
}

const logTelemetryData = async () => {
    // Generate random telemetry data
    const cpuUsage = (Math.random() * 30 + 10).toFixed(1) + '%'
    const memoryUsage = (Math.random() * 40 + 30).toFixed(1) + '%'
    const networkLatency = Math.floor(Math.random() * 50 + 10) + 'ms'
    const activeConnections = Math.floor(Math.random() * 100 + 50)
    const requestsPerSecond = (Math.random() * 200 + 50).toFixed(1)
    const errorRate = (Math.random() * 0.5).toFixed(2) + '%'
    
    // Fetch typing speed
    let typingSpeed = 'N/A'
    try {
        const response = await fetch('https://wpm.glitchy.systems/')
        if (response.ok) {
            const data = await response.json()
            typingSpeed = data.wpm || 'N/A'
        }
    } catch (error) {
        // Silently fail if typing speed can't be fetched
    }
    
    console.log('%c📊 Telemetry Data', 'color: #4dfdef; font-size: 14px; font-weight: bold;')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`CPU Usage:        ${cpuUsage}`)
    console.log(`Memory Usage:     ${memoryUsage}`)
    console.log(`Network Latency:   ${networkLatency}`)
    console.log(`Active Connections: ${activeConnections}`)
    console.log(`Requests/sec:     ${requestsPerSecond}`)
    console.log(`Error Rate:       ${errorRate}`)
    console.log(`Typing Speed:     ${typingSpeed} WPM`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('System monitoring active | Observability metrics collected')
}

const playSound = () => {
    // Prevent overlapping sounds
    if (soundPlaying) return
    
    soundPlaying = true
    
    try {
        // Create audio context for sound generation
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        // Create a pleasant sound wave (sine wave with frequency sweep)
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
        
        // Reset flag after sound completes
        setTimeout(() => {
            soundPlaying = false
        }, 300)
    } catch (error) {
        // If audio context fails, reset flag anyway
        soundPlaying = false
        console.warn('Audio playback failed:', error)
    }
}

const showMatrixOverlay = () => {
    const overlay = document.createElement('div')
    overlay.id = 'matrix-overlay'
    overlay.className = 'fixed inset-0 pointer-events-none z-40 opacity-80'
    overlay.style.background = 'linear-gradient(transparent 50%, rgba(0, 255, 0, 0.03) 50%), linear-gradient(90deg, transparent 50%, rgba(0, 255, 0, 0.03) 50%)'
    overlay.style.backgroundSize = '50px 50px'
    overlay.style.fontFamily = 'monospace'
    overlay.style.color = '#00ff00'
    overlay.style.fontSize = '12px'
    
    // Add matrix-style characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const columns = Math.floor(window.innerWidth / 20)
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div')
        column.style.position = 'absolute'
        column.style.left = `${i * 20}px`
        column.style.top = '0'
        column.style.width = '20px'
        column.style.height = '100%'
        column.style.animation = `matrix-fall ${2 + Math.random() * 3}s linear infinite`
        column.style.animationDelay = `${Math.random() * 2}s`
        
        let text = ''
        for (let j = 0; j < 50; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '<br>'
        }
        column.innerHTML = text
        overlay.appendChild(column)
    }
    
    document.body.appendChild(overlay)
    
    // Add CSS animation
    if (!document.getElementById('matrix-styles')) {
        const style = document.createElement('style')
        style.id = 'matrix-styles'
        style.textContent = `
            @keyframes matrix-fall {
                0% { transform: translateY(-100vh); }
                100% { transform: translateY(100vh); }
            }
        `
        document.head.appendChild(style)
    }
}

const removeMatrixOverlay = () => {
    setTimeout(() => {
        const overlay = document.getElementById('matrix-overlay')
        if (overlay) {
            overlay.style.opacity = '0'
            overlay.style.transition = 'opacity 0.5s'
            setTimeout(() => overlay.remove(), 500)
        }
    }, 2000)
}

const showRaspberryPiEffect = () => {
    const effect = document.createElement('div')
    effect.id = 'raspberry-effect'
    effect.className = 'fixed inset-0 pointer-events-none z-40'
    effect.style.background = 'radial-gradient(circle, rgba(199, 0, 57, 0.1) 0%, transparent 70%)'
    document.body.appendChild(effect)
}

const removeRaspberryPiEffect = () => {
    const effect = document.getElementById('raspberry-effect')
    if (effect) {
        effect.style.opacity = '0'
        effect.style.transition = 'opacity 0.3s'
        setTimeout(() => effect.remove(), 300)
    }
}

const showMonitorGlow = () => {
    const bezel = document.createElement('div')
    bezel.id = 'monitor-bezel'
    bezel.className = 'fixed inset-0 pointer-events-none z-50'
    bezel.style.background = 'transparent'
    
    // Create bezel structure - top bezel
    const topBezel = document.createElement('div')
    topBezel.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; height: 20px; background: #000000; border-bottom: 2px solid #1a1a1a; z-index: 9999; opacity: 0; transition: opacity 0.4s ease-in-out;'
    
    // Bottom bezel with Acer logo
    const bottomBezel = document.createElement('div')
    bottomBezel.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; height: 60px; background: #000000; border-top: 2px solid #1a1a1a; display: flex; align-items: center; justify-content: center; z-index: 9999; opacity: 0; transition: opacity 0.4s ease-in-out;'
    bottomBezel.innerHTML = '<img src="https://www.realgamers.asia/image/she2me/image/data/brand/acer.png" alt="Acer" style="height: 40px; filter: brightness(0) invert(1);" />'
    
    // Blue power indicator light on bottom bezel (right side)
    const powerLight = document.createElement('div')
    powerLight.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; box-shadow: 0 0 8px rgba(59, 130, 246, 0.8); z-index: 10000; opacity: 0; transition: opacity 0.4s ease-in-out;'
    powerLight.id = 'monitor-power-light'
    
    // Left bezel
    const leftBezel = document.createElement('div')
    leftBezel.style.cssText = 'position: fixed; top: 20px; left: 0; width: 20px; bottom: 60px; background: #000000; border-right: 2px solid #1a1a1a; z-index: 9999; opacity: 0; transition: opacity 0.4s ease-in-out;'
    
    // Right bezel
    const rightBezel = document.createElement('div')
    rightBezel.style.cssText = 'position: fixed; top: 20px; right: 0; width: 20px; bottom: 60px; background: #000000; border-left: 2px solid #1a1a1a; z-index: 9999; opacity: 0; transition: opacity 0.4s ease-in-out;'
    
    document.body.appendChild(topBezel)
    document.body.appendChild(bottomBezel)
    document.body.appendChild(leftBezel)
    document.body.appendChild(rightBezel)
    document.body.appendChild(powerLight)
    
    // Animate in
    setTimeout(() => {
        topBezel.style.opacity = '1'
        bottomBezel.style.opacity = '1'
        leftBezel.style.opacity = '1'
        rightBezel.style.opacity = '1'
        powerLight.style.opacity = '1'
    }, 10)
    
    // Store references for cleanup
    bezel.dataset.topBezel = 'monitor-bezel-top'
    bezel.dataset.bottomBezel = 'monitor-bezel-bottom'
    bezel.dataset.leftBezel = 'monitor-bezel-left'
    bezel.dataset.rightBezel = 'monitor-bezel-right'
    topBezel.id = 'monitor-bezel-top'
    bottomBezel.id = 'monitor-bezel-bottom'
    leftBezel.id = 'monitor-bezel-left'
    rightBezel.id = 'monitor-bezel-right'
}

const removeMonitorGlow = () => {
    const topBezel = document.getElementById('monitor-bezel-top')
    const bottomBezel = document.getElementById('monitor-bezel-bottom')
    const leftBezel = document.getElementById('monitor-bezel-left')
    const rightBezel = document.getElementById('monitor-bezel-right')
    const powerLight = document.getElementById('monitor-power-light')
    
    const removeElement = (el) => {
        if (el) {
            el.style.opacity = '0'
            setTimeout(() => el.remove(), 400)
        }
    }
    
    removeElement(topBezel)
    removeElement(bottomBezel)
    removeElement(leftBezel)
    removeElement(rightBezel)
    removeElement(powerLight)
}

const showActivityPulse = () => {
    const pulse = document.createElement('div')
    pulse.id = 'activity-pulse'
    pulse.className = 'fixed inset-0 pointer-events-none z-40'
    pulse.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
    pulse.style.animation = 'pulse 2s ease-in-out infinite'
    document.body.appendChild(pulse)
}

const removeActivityPulse = () => {
    const pulse = document.getElementById('activity-pulse')
    if (pulse) {
        pulse.style.opacity = '0'
        pulse.style.transition = 'opacity 0.3s'
        setTimeout(() => pulse.remove(), 300)
    }
}

const showDockerWhale = () => {
    const whale = document.createElement('div')
    whale.id = 'docker-whale'
    whale.className = 'fixed pointer-events-none z-50'
    whale.style.cssText = 'bottom: 20px; right: -160px; width: 200px; height: 200px; transition: right 0.4s ease-out; z-index: 10000;'
    whale.innerHTML = '<img src="https://freddysblog.com/wp-content/uploads/2017/10/6f438-docker.png" alt="Docker" style="width: 100%; height: 100%; object-fit: contain;" />'
    
    document.body.appendChild(whale)
    
    // Animate in subtly - show more of the face
    setTimeout(() => {
        whale.style.right = '-100px'
    }, 10)
}

const removeDockerWhale = () => {
    const whale = document.getElementById('docker-whale')
    if (whale) {
        whale.style.right = '-160px'
        setTimeout(() => whale.remove(), 400)
    }
}


const showZapEffect = () => {
    const zap = document.createElement('div')
    zap.id = 'zap-effect'
    zap.className = 'fixed inset-0 pointer-events-none z-40'
    zap.style.background = 'linear-gradient(45deg, rgba(234, 179, 8, 0.1) 25%, transparent 25%, transparent 75%, rgba(234, 179, 8, 0.1) 75%), linear-gradient(45deg, rgba(234, 179, 8, 0.1) 25%, transparent 25%, transparent 75%, rgba(234, 179, 8, 0.1) 75%)'
    zap.style.backgroundSize = '20px 20px'
    zap.style.backgroundPosition = '0 0, 10px 10px'
    document.body.appendChild(zap)
}

const removeZapEffect = () => {
    const zap = document.getElementById('zap-effect')
    if (zap) {
        zap.style.opacity = '0'
        zap.style.transition = 'opacity 0.3s'
        setTimeout(() => zap.remove(), 300)
    }
}

const showServerPulse = () => {
    const pulse = document.createElement('div')
    pulse.id = 'server-pulse'
    pulse.className = 'fixed inset-0 pointer-events-none z-40'
    pulse.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
    pulse.style.animation = 'pulse 1.5s ease-in-out infinite'
    document.body.appendChild(pulse)
}

const removeServerPulse = () => {
    const pulse = document.getElementById('server-pulse')
    if (pulse) {
        pulse.style.opacity = '0'
        pulse.style.transition = 'opacity 0.3s'
        setTimeout(() => pulse.remove(), 300)
    }
}

onMounted(() => {
    // Add pulse animation if not exists
    if (!document.getElementById('pulse-styles')) {
        const style = document.createElement('style')
        style.id = 'pulse-styles'
        style.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 0.1; }
                50% { opacity: 0.3; }
            }
        `
        document.head.appendChild(style)
    }
})
</script>

<style scoped>
.easter-egg-icon {
    display: inline-flex;
    vertical-align: middle;
    position: relative;
    z-index: 10;
}

.easter-egg-icon:hover {
    filter: drop-shadow(0 0 8px rgba(77, 253, 239, 0.6));
}

.tooltip {
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, -10px);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}
</style>
