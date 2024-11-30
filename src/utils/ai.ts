// AI Tools Utility Functions
export async function initializeAIModels() {
  try {
    // Initialize models based on available resources
    const availableMemory = navigator.deviceMemory || 4;
    const hasGPU = await checkGPUAvailability();
    
    return {
      canRunLocalModels: availableMemory >= 8 && hasGPU,
      recommendedService: availableMemory >= 8 ? 'local' : 'api',
      capabilities: {
        imageGeneration: availableMemory >= 4,
        videoProcessing: availableMemory >= 8 && hasGPU,
        audioProcessing: availableMemory >= 4,
        textGeneration: availableMemory >= 8
      }
    };
  } catch (error) {
    console.error('Error initializing AI models:', error);
    return {
      canRunLocalModels: false,
      recommendedService: 'api',
      capabilities: {
        imageGeneration: false,
        videoProcessing: false,
        audioProcessing: false,
        textGeneration: false
      }
    };
  }
}

async function checkGPUAvailability(): Promise<boolean> {
  if ('gpu' in navigator) {
    try {
      const adapter = await (navigator as any).gpu.requestAdapter();
      return !!adapter;
    } catch {
      return false;
    }
  }
  return false;
}

export async function getModelRequirements(modelType: string) {
  const requirements = {
    'stable-diffusion': {
      vram: 4096,
      ram: 8192,
      storage: 4096,
      gpu: true
    },
    'llama': {
      vram: 8192,
      ram: 16384,
      storage: 8192,
      gpu: true
    },
    'audiocraft': {
      vram: 2048,
      ram: 4096,
      storage: 2048,
      gpu: false
    }
  };
  
  return requirements[modelType as keyof typeof requirements] || null;
}