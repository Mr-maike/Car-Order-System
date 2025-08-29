import axios from 'axios';
import { Logger } from '@/lib/logger';

const FIPE_BASE_URL = process.env.FIPE_API_URL || 'https://parallelum.com.br/fipe/api/v1';
const CACHE_DURATION = parseInt(process.env.FIPE_CACHE_DURATION || '300000');
const FIPE_TIMEOUT = parseInt(process.env.FIPE_TIMEOUT || '8000');

export class FipeClient {
  private cache = new Map<string, { data: any; timestamp: number; expiresAt: number }>();

  private async fetchWithTimeout(url: string, timeout = FIPE_TIMEOUT) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const startTime = Date.now();
    
    try {
      Logger.info('Iniciando requisição FIPE', { 
        component: 'FipeClient', 
        url // ✅ AGORA URL É UMA PROPRIEDADE VÁLIDA
      });

      const response = await axios.get(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'CarOrderSystem/1.0',
          'Accept': 'application/json',
        },
      });

      const duration = Date.now() - startTime;
      Logger.info('Requisição FIPE concluída', { 
        component: 'FipeClient', 
        url, // ✅ AGORA URL É UMA PROPRIEDADE VÁLIDA
        duration,
        status: response.status
      });

      return response.data;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      if (axios.isAxiosError(error)) {
        Logger.error(error as Error, { 
          component: 'FipeClient', 
          url, // ✅ AGORA URL É UMA PROPRIEDADE VÁLIDA
          duration,
          status: error.response?.status
        });
      } else {
        Logger.error(error as Error, { 
          component: 'FipeClient', 
          url, // ✅ AGORA URL É UMA PROPRIEDADE VÁLIDA
          duration 
        });
      }
      
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private getFromCache(url: string) {
    const cached = this.cache.get(url);
    if (cached && Date.now() < cached.expiresAt) {
      Logger.info('Cache hit', { 
        component: 'FipeClient', 
        url // ✅ AGORA URL É UMA PROPRIEDADE VÁLIDA
      });
      return cached.data;
    }
    
    if (cached) {
      Logger.info('Cache expired', { 
        component: 'FipeClient', 
        url // ✅ AGORA URL É UMA PROPRIEDADE VÁLIDA
      });
      this.cache.delete(url);
    }
    
    return null;
  }

  private setCache(url: string, data: any) {
    this.cache.set(url, {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + CACHE_DURATION,
    });
    
    Logger.info('Dados salvos em cache', { 
      component: 'FipeClient', 
      url // ✅ AGORA URL É UMA PROPRIEDADE VÁLIDA
    });
  }

  async getBrands() {
    const url = `${FIPE_BASE_URL}/carros/marcas`;
    const cacheKey = `brands:${url}`;

    try {
      // Tentar pegar do cache primeiro
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) return cachedData;

      // Se não tem cache, fazer requisição
      Logger.info('Fetching brands from API', { 
        component: 'FipeClient',
        operation: 'getBrands'
      });
      
      const data = await this.fetchWithTimeout(url);
      
      // Salvar no cache
      this.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      Logger.error(error as Error, { 
        component: 'FipeClient', 
        operation: 'getBrands' 
      });
      throw new Error('Falha ao carregar marcas. Tente novamente.');
    }
  }

  async getModels(brandId: string) {
    const url = `${FIPE_BASE_URL}/carros/marcas/${brandId}/modelos`;
    const cacheKey = `models:${brandId}:${url}`;

    try {
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) return cachedData;

      Logger.info('Fetching models from API', { 
        component: 'FipeClient',
        operation: 'getModels',
        metadata: { brandId }
      });
      
      const data = await this.fetchWithTimeout(url);
      this.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      Logger.error(error as Error, { 
        component: 'FipeClient', 
        operation: 'getModels',
        metadata: { brandId }
      });
      throw new Error('Falha ao carregar modelos. Tente novamente.');
    }
  }

  async getYears(brandId: string, modelId: string) {
    const url = `${FIPE_BASE_URL}/carros/marcas/${brandId}/modelos/${modelId}/anos`;
    const cacheKey = `years:${brandId}:${modelId}:${url}`;

    try {
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) return cachedData;

      Logger.info('Fetching years from API', { 
        component: 'FipeClient',
        operation: 'getYears',
        metadata: { brandId, modelId }
      });
      
      const data = await this.fetchWithTimeout(url);
      this.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      Logger.error(error as Error, { 
        component: 'FipeClient', 
        operation: 'getYears',
        metadata: { brandId, modelId }
      });
      throw new Error('Falha ao carregar anos. Tente novamente.');
    }
  }

  async getVehicleDetails(brandId: string, modelId: string, yearId: string) {
    const url = `${FIPE_BASE_URL}/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`;
    const cacheKey = `vehicle:${brandId}:${modelId}:${yearId}:${url}`;

    try {
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) return cachedData;

      Logger.info('Fetching vehicle details from API', { 
        component: 'FipeClient',
        operation: 'getVehicleDetails',
        metadata: { brandId, modelId, yearId }
      });
      
      const data = await this.fetchWithTimeout(url);
      this.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      Logger.error(error as Error, { 
        component: 'FipeClient', 
        operation: 'getVehicleDetails',
        metadata: { brandId, modelId, yearId }
      });
      throw new Error('Falha ao carregar detalhes do veículo. Tente novamente.');
    }
  }
}

export const fipeClient = new FipeClient();